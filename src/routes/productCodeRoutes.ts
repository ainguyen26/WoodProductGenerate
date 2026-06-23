import { Router } from "express";
import { ZodError } from "zod";
import { generateProductCode, generateProductCodeSchema, normalizeProductCodeInput } from "../domain/productCode.js";

export const productCodeRoutes = Router();

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
