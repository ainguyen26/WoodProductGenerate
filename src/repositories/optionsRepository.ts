import { pool } from "../db/pool.js";
import { defaultOptions } from "../data/defaultOptions.js";

export type OptionRow = {
  code: string;
  name: string;
  description: string | null;
  materialCode?: string;
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

const optionQueries: Record<OptionKey, string> = {
  aa: "select code, name, description from aa_mold_types where is_active = true order by code",
  bbb: "select code, name, description from bbb_board_cores where is_active = true order by code",
  cc: "select code, name, description from cc_formaldehyde_standards where is_active = true order by code",
  d: "select code, name, description from d_surface_materials where is_active = true order by code",
  eeee: `
    select e.code, e.name, d.name as description, e.surface_material_code as "materialCode"
    from eeee_supplier_papers e
    join d_surface_materials d on d.code = e.surface_material_code
    where e.is_active = true
    order by e.code
  `,
  ff: "select code, name, description from ff_backer_materials where is_active = true order by code",
  gg: "select code, name, description from gg_sizes where is_active = true order by code",
  hh: "select code, name, description from hh_glues where is_active = true order by code"
};

export async function getAllOptions() {
  try {
    const entries = await Promise.all(
      Object.keys(optionTables).map(async (key) => {
        const optionKey = key as OptionKey;
        const result = await pool.query<OptionRow>(optionQueries[optionKey]);

        return [optionKey, result.rows] as const;
      })
    );

    return Object.fromEntries(entries) as Record<OptionKey, OptionRow[]>;
  } catch (error) {
    console.warn("Cannot load options from PostgreSQL. Using default in-memory options.", error);
    return defaultOptions;
  }
}
