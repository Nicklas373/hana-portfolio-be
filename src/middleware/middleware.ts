import { NextFunction, Request, Response } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Failed to authorize",
      data: [],
      error: "Invalid request headers",
    });
  }

  const requestAuthParse = authHeader.split(" ");

  if (requestAuthParse.length !== 2) {
    return res.status(401).json({
      success: false,
      message: "Failed to authorize",
      data: [],
      error: "Malformed authorization header",
    });
  }

  const [type, token] = requestAuthParse;

  if (type !== "x-hana-key") {
    return res.status(401).json({
      success: false,
      message: "Failed to authorize",
      data: [],
      error: "Invalid authorization type",
    });
  }

  const secret = process.env.API_KEY;

  if (token !== secret) {
    return res.status(401).json({
      success: false,
      message: "Failed to authorize",
      data: [],
      error: "Invalid authorization key",
    });
  }

  if (!secret) {
    return res.status(500).json({
      success: false,
      message: "Server configuration error",
      data: [],
      error: "Missing credentials key",
    });
  }

  next();
}
