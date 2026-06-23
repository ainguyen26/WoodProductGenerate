import { Router } from "express";
import { ZodError } from "zod";
import {
  generateProductCode,
  generateProductCodeSchema,
  normalizeProductCodeInput,
  normalizeSegmentCode,
  searchProductCodeSchema,
  type GenerateProductCodeInput,
  type SearchProductCodeInput
} from "../domain/productCode.js";
import { getAllOptions, type OptionKey, type OptionRow } from "../repositories/optionsRepository.js";

export const productCodeRoutes = Router();

const optionKeys: OptionKey[] = ["aa", "bbb", "cc", "d", "eeee", "ff", "gg", "hh"];
const imageBaseUrl = "https://cdn.ritavo.com/cdn/products/wood/thumbnail/";

productCodeRoutes.post("/generate", (req, res, next) => {
  try {
    const input = generateProductCodeSchema.parse(req.body);
    res.json({
      code: generateProductCode(input),
      segments: normalizeProductCodeInput(input)
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Du lieu dau vao khong hop le.",
        issues: error.issues
      });
      return;
    }

    next(error);
  }
});

productCodeRoutes.post("/search", async (req, res, next) => {
  try {
    const input = searchProductCodeSchema.parse(req.body);
    const options = await getAllOptions();
    const selectedGroups = optionKeys.map((key) => resolveOptions(key, input, options[key]));

    if (selectedGroups.some((group) => group.length === 0)) {
      res.json({ items: [] });
      return;
    }

    const page = input.page;
    const pageSize = input.pageSize;
    const offset = (page - 1) * pageSize;
    const endExclusive = offset + pageSize;
    const dEeeePairs = selectedGroups[3].flatMap((d) =>
      selectedGroups[4]
        .filter((eeee) => !eeee.materialCode || eeee.materialCode === d.code)
        .map((eeee) => ({ d, eeee }))
    );
    const dimensions = [
      selectedGroups[0],
      selectedGroups[1],
      selectedGroups[2],
      dEeeePairs,
      selectedGroups[5],
      selectedGroups[6],
      selectedGroups[7]
    ] as const;
    const total = dimensions.reduce((value, group) => value * group.length, 1);
    const items = buildPagedItems(dimensions, offset, Math.min(endExclusive, total));

    res.json({
      items,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Du lieu tim kiem khong hop le.",
        issues: error.issues
      });
      return;
    }

    next(error);
  }
});

function resolveOptions(
  key: OptionKey,
  input: SearchProductCodeInput,
  options: OptionRow[]
) {
  const value = input[key];

  if (!value) {
    return options;
  }

  const code = normalizeSegmentCode(key, value);
  const found = options.find((option) => option.code === code);

  return [
    found ?? {
      code,
      name: code,
      description: null
    }
  ];
}

function buildProductName(selected: OptionRow[]) {
  const mold = selected[0].name;
  const boardCore = selected[1].name;
  const emission = selected[2].code === "E2" ? "STD" : selected[2].code;
  const surfaceMaterial = selected[3].name;
  const supplierPaper = selected[4].name;
  const backer = selected[5].code;
  const size = selected[6].name.replace(/\s*x\s*/gi, "x");
  const coreType = boardCore.split("-")[0] || boardCore;
  const moistureResistance = boardCore.match(/\b(LR|MR|HR)/i)?.[1].toUpperCase() ?? "";

  return [
    `Ván Rita Võ/ Rita Võ Wood phủ ${surfaceMaterial}`,
    coreType,
    moistureResistance,
    emission,
    `${size}mm`,
    mold,
    `${supplierPaper}/`,
    `Backer: ${backer}`
  ]
    .filter(Boolean)
    .join(" ");
}

type DAndEeeePair = {
  d: OptionRow;
  eeee: OptionRow;
};

function buildPagedItems(
  dimensions: readonly [
    OptionRow[],
    OptionRow[],
    OptionRow[],
    DAndEeeePair[],
    OptionRow[],
    OptionRow[],
    OptionRow[]
  ],
  startIndex: number,
  endIndex: number
) {
  const suffixProducts = dimensions.map((_, index) =>
    dimensions.slice(index + 1).reduce((value, group) => value * group.length, 1)
  );
  const items: Array<{
    index: number;
    code: string;
    name: string;
    imageUrl: string;
  }> = [];

  for (let position = startIndex; position < endIndex; position += 1) {
    const aa = dimensions[0][Math.floor(position / suffixProducts[0]) % dimensions[0].length];
    const bbb = dimensions[1][Math.floor(position / suffixProducts[1]) % dimensions[1].length];
    const cc = dimensions[2][Math.floor(position / suffixProducts[2]) % dimensions[2].length];
    const pair = dimensions[3][Math.floor(position / suffixProducts[3]) % dimensions[3].length];
    const ff = dimensions[4][Math.floor(position / suffixProducts[4]) % dimensions[4].length];
    const gg = dimensions[5][Math.floor(position / suffixProducts[5]) % dimensions[5].length];
    const hh = dimensions[6][Math.floor(position / suffixProducts[6]) % dimensions[6].length];
    const selected = [aa, bbb, cc, pair.d, pair.eeee, ff, gg, hh];
    const segments = {
      aa: aa.code,
      bbb: bbb.code,
      cc: cc.code,
      d: pair.d.code,
      eeee: pair.eeee.code,
      ff: ff.code,
      gg: gg.code,
      hh: hh.code
    } as GenerateProductCodeInput;

    items.push({
      index: position + 1,
      code: generateProductCode(segments),
      name: buildProductName(selected),
      imageUrl: `${imageBaseUrl}${encodeURIComponent(pair.eeee.name)}.jpg`
    });
  }

  return items;
}
