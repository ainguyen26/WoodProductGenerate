import { Router } from "express";
import { getAllOptions } from "../repositories/optionsRepository.js";

export const optionsRoutes = Router();

optionsRoutes.get("/", async (_req, res, next) => {
  try {
    const options = await getAllOptions();
    res.json(options);
  } catch (error) {
    next(error);
  }
});
