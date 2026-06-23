import { pool } from "../db/pool.js";

export type OptionRow = {
  code: string;
  name: string;
  description: string | null;
};

const optionTables = {
  aa: "aa_mold_types",
  bbb: "bbb_board_cores",
  cc: "cc_formaldehyde_standards",
  d: "d_surface_materials",
  eeee: "eeee_supplier_papers",
  ff: "ff_backer_materials",
  gg: "gg_sizes",
  hh: "hh_glues"
} as const;

export type OptionKey = keyof typeof optionTables;

export async function getAllOptions() {
  const entries = await Promise.all(
    Object.entries(optionTables).map(async ([key, table]) => {
      const result = await pool.query<OptionRow>(
        `select code, name, description from ${table} where is_active = true order by code`
      );

      return [key, result.rows] as const;
    })
  );

  return Object.fromEntries(entries) as Record<OptionKey, OptionRow[]>;
}
