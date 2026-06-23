import { z } from "zod";

const segmentSchemas = {
  aa: z.string().trim().min(1).max(2).regex(/^[A-Z0-9]+$/i),
  bbb: z.string().trim().length(3).regex(/^[A-Z][0-9]{2}$/i),
  cc: z.enum(["E0", "E1", "E2"]),
  d: z.enum(["M", "L", "A"]),
  eeee: z.string().trim().min(1).max(4).regex(/^[A-Z0-9]+$/i),
  ff: z.string().trim().length(2).regex(/^[A-Z0-9]{2}$/i),
  gg: z.string().trim().length(2).regex(/^[A-Z0-9]{2}$/i),
  hh: z.string().trim().length(2).regex(/^[A-Z0-9]{2}$/i)
};

export const generateProductCodeSchema = z.object(segmentSchemas);

export type GenerateProductCodeInput = z.infer<typeof generateProductCodeSchema>;

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
