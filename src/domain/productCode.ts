import { z } from "zod";

const segmentSchemas = {
  aa: z.string().trim().min(1).max(2).regex(/^[A-Z0-9]+$/i),
  bbb: z.string().trim().length(3).regex(/^[A-Z0-9]+$/i),
  cc: z.enum(["E0", "E1", "E2"]),
  d: z.enum(["M", "L", "A"]),
  eeee: z.string().trim().min(1).max(4).regex(/^[A-Z0-9]+$/i),
  ff: z.string().trim().length(2).regex(/^[A-Z0-9]{2}$/i),
  gg: z.string().trim().length(2).regex(/^[A-Z0-9]{2}$/i),
  hh: z.string().trim().length(2).regex(/^[A-Z0-9]{2}$/i)
};

export const generateProductCodeSchema = z.object(segmentSchemas);

export type GenerateProductCodeInput = z.infer<typeof generateProductCodeSchema>;

export const searchProductCodeSchema = z.object({
  aa: z.union([z.literal(""), segmentSchemas.aa]).default(""),
  bbb: z.union([z.literal(""), segmentSchemas.bbb]).default(""),
  cc: z.union([z.literal(""), segmentSchemas.cc]).default(""),
  d: z.union([z.literal(""), segmentSchemas.d]).default(""),
  eeee: z.union([z.literal(""), segmentSchemas.eeee]).default(""),
  ff: z.union([z.literal(""), segmentSchemas.ff]).default(""),
  gg: z.union([z.literal(""), segmentSchemas.gg]).default(""),
  hh: z.union([z.literal(""), segmentSchemas.hh]).default(""),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(50)
});

export type SearchProductCodeInput = z.infer<typeof searchProductCodeSchema>;

export function normalizeProductCodeInput(input: GenerateProductCodeInput) {
  return {
    aa: input.aa.toUpperCase().padStart(2, "0"),
    bbb: input.bbb.toUpperCase(),
    cc: input.cc,
    d: input.d,
    eeee: input.eeee.toUpperCase().padStart(4, "0"),
    ff: input.ff.toUpperCase(),
    gg: input.gg.toUpperCase(),
    hh: input.hh.toUpperCase()
  };
}

export function generateProductCode(input: GenerateProductCodeInput) {
  const value = normalizeProductCodeInput(input);
  return `R${value.aa}${value.bbb}${value.cc}${value.d}${value.eeee}${value.ff}${value.gg}${value.hh}`;
}

export function normalizeSegmentCode(key: keyof GenerateProductCodeInput, value: string) {
  const normalized = value.toUpperCase();

  if (key === "aa") {
    return normalized.padStart(2, "0");
  }

  if (key === "eeee") {
    return normalized.padStart(4, "0");
  }

  return normalized;
}
