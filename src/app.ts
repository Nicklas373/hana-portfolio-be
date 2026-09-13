import cors from "cors";
import crypto from "crypto";
import express, { NextFunction, Request, Response } from "express";
import contact from "./routes/contact";
import experience from "./routes/experience";
import list from "./routes/experience";
import projects from "./routes/project";
import {
  crudRateLimiter,
  globalRequestRateLimiter,
} from "./middleware/rateLimiter";
import pino from "pino";
import pinoHttp from "pino-http";
import { logger } from "./lib/pino/config";
import { nvErrorWrapper } from "./lib/wrapper/errorWrapper";
import { errorFormatter } from "./lib/helper";
import { config } from "./lib/config";
import {
  APP_REQUEST_ERROR,
  APP_REQUEST_NOT_FOUND,
  APP_UNEXPECTED_ERROR,
} from "./constant/app";

// Init express JS
const app = express();
const baseUrl = config.app.baseUrl;

// Disable some headers
app.disable("x-powered-by");

// Init app configuration
app.set("trust proxy", 1);
app.use(
  cors({
    origin: config.app.corsOrigins?.split(",") || [],
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  pinoHttp({
    autoLogging: {
      ignore: (req) => req.url === `${baseUrl}/api/v1/health`,
    },
    customLogLevel: (_req, res) => {
      if (res.statusCode >= 500) {
        return "error";
      }
      if (res.statusCode >= 400) {
        return "warn";
      }
      return "silent";
    },
    genReqId: (req) => req.headers["x-request-id"] ?? crypto.randomUUID(),
    logger,
    serializers: {
      req: pino.stdSerializers.wrapRequestSerializer((req) => ({
        id: req.raw.id,
        url: req.raw.url,
        method: req.raw.method,
        param: req.params,
        query: req.query,
      })),
      res: pino.stdSerializers.wrapResponseSerializer((res) => ({
        status: res.raw?.statusCode ?? 0,
      })),
      err: pino.stdSerializers.err,
    },
  }),
);

// Init app route
app.use(`${baseUrl}/api/v1/contact`, crudRateLimiter, contact);
app.use(`${baseUrl}/api/v1/experience`, globalRequestRateLimiter, experience);
app.use(`${baseUrl}/api/v1/experience/list`, globalRequestRateLimiter, list);
app.use(`${baseUrl}/api/v1/project`, globalRequestRateLimiter, projects);
app.get(`${baseUrl}/api/v1/health`, (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Healthy upstream",
    data: [],
    error: null,
  });
});
app.use((req: Request, res: Response) => {
  req.log.error(
    {
      nvErrorWrapper: {
        success: false,
        status: 404,
        message: APP_UNEXPECTED_ERROR,
        data: [],
        error: APP_REQUEST_NOT_FOUND,
      },
    },
    APP_REQUEST_ERROR,
  );
  return res.status(404).json({
    success: false,
    status: 404,
    message: "Route not found",
    data: [],
    error: null,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof nvErrorWrapper) {
    req.log.warn(
      {
        nvErrorWrapper: {
          success: false,
          status: error.status,
          message: errorFormatter(error.message),
          data: [],
          error: errorFormatter(error.error),
        },
      },
      APP_REQUEST_ERROR,
    );
    return res.status(error.status).json({
      success: false,
      status: error.status,
      message: errorFormatter(error.message),
      data: [],
      error: errorFormatter(error.error),
    });
  }
  req.log.error(
    {
      nvErrorWrapper: {
        success: false,
        status: 500,
        message: APP_UNEXPECTED_ERROR,
        data: [],
        error: errorFormatter(error),
      },
    },
    APP_REQUEST_ERROR,
  );
  return res.status(500).json(errorFormatter(error));
});

export default app;
