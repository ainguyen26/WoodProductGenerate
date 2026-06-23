import { readFile } from "node:fs/promises";
import { pool } from "../db/pool.js";

type EeeeRow = {
  code: string;
  name: string;
  surfaceMaterialCode: "M" | "L" | "A";
};

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: npm run db:import-eeee -- <path-to-csv-or-tsv>");
  process.exit(1);
}

const raw = await readFile(inputPath, "utf8");
const rows = parseDelimited(raw).map(toEeeeRow).filter(Boolean) as EeeeRow[];

if (rows.length === 0) {
  console.error("No valid EEEE rows found.");
  process.exit(1);
}

const client = await pool.connect();

try {
  await client.query("begin");

  for (const row of rows) {
    await client.query(
      `
        insert into eeee_supplier_papers (code, name, surface_material_code)
        values ($1, $2, $3)
        on conflict (code) do update set
          name = excluded.name,
          surface_material_code = excluded.surface_material_code,
          is_active = true
      `,
      [row.code, row.name, row.surfaceMaterialCode]
    );
  }

  await client.query("commit");
  console.log(`Imported ${rows.length} EEEE rows from ${inputPath}`);
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  client.release();
  await pool.end();
}

function parseDelimited(content: string) {
  const lines = content
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  return lines.map((line) => splitDelimitedLine(line, delimiter));
}

function splitDelimitedLine(line: string, delimiter: string) {
  if (delimiter === "\t") {
    return line.split("\t").map((value) => value.trim());
  }

  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (const char of line) {
    if (char === "\"") {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function toEeeeRow(values: string[]): EeeeRow | null {
  const [rawCode, rawName, rawD] = values;
  const firstCell = rawCode?.trim() ?? "";

  if (!firstCell || values.join(" ").toUpperCase().includes("EEEE")) {
    return null;
  }

  const code = rawCode?.trim().padStart(4, "0");
  const name = rawName?.trim();
  const surfaceMaterialCode = rawD?.trim().toUpperCase();

  if (!code || !name) {
    return null;
  }

  if (!/^[0-9A-Z]{4}$/.test(code)) {
    throw new Error(`Invalid EEEE code: ${rawCode}`);
  }

  if (surfaceMaterialCode !== "M" && surfaceMaterialCode !== "L" && surfaceMaterialCode !== "A") {
    throw new Error(`Invalid D value for EEEE ${code}: ${rawD}`);
  }

  return {
    code,
    name,
    surfaceMaterialCode
  };
}
