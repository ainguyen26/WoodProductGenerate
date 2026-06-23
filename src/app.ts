import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { healthRoutes } from "./routes/healthRoutes.js";
import { optionsRoutes } from "./routes/optionsRoutes.js";
import { productCodeRoutes } from "./routes/productCodeRoutes.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/options", optionsRoutes);
app.use("/api/product-codes", productCodeRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Loi he thong." });
});
