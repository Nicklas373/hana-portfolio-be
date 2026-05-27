import cors from "cors";
import crypto from "crypto";
import express from "express";
import contact from "./routes/contact";
import experience from "./routes/experience";
import experienceList from "./routes/experienceList";
import projects from "./routes/project";
import {
  crudRateLimiter,
  globalRequestRateLimiter,
} from "./middleware/rateLimiter";
import pinoHttp from "pino-http";
import { logger } from "./lib/pino/config";

// Init express JS
const app = express();

// Init app configuration
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(",") || [],
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);
app.use(express.json());
app.use(
  pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => req.url === "/api/v1/health",
    },
    genReqId: (req) => req.headers["x-request-id"] || crypto.randomUUID(),
  }),
);

// Init app route
app.use("/api/v1/contact", crudRateLimiter, contact);
app.use("/api/v1/experience", globalRequestRateLimiter, experience);
app.use("/api/v1/experienceList", globalRequestRateLimiter, experienceList);
app.use("/api/v1/project", globalRequestRateLimiter, projects);
app.get("/api/v1/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Healthy upstream",
    data: [],
    error: null,
  });
});

export default app;
