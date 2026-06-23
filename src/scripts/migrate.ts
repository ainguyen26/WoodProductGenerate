import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pool } from "../db/pool.js";

const migrationsDir = resolve("migrations");

try {
  const migrationFiles = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of migrationFiles) {
    const migrationPath = resolve(migrationsDir, file);
    const sql = await readFile(migrationPath, "utf8");
    await pool.query(sql);
    console.log(`Applied migration: ${migrationPath}`);
  }
} finally {
  await pool.end();
}
