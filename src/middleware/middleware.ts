import { NextFunction, Request, Response } from "express";
import { nvErrorWrapper } from "../lib/wrapper/errorWrapper";
import {
  APP_INVALID_AUTHORIZATION_NVAK,
  APP_INVALID_AUTHORIZATION_NVAT,
  APP_INVALID_AUTHORIZATION_NVMK,
  APP_INVALID_HEADERS,
  APP_UNEXPECTED_ERROR,
  APP_UNEXPECTED_HEADER,
  APP_VALIDATION_AUTHORIZATION,
} from "../constant/app";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      new nvErrorWrapper(
        false,
        401,
        APP_VALIDATION_AUTHORIZATION,
        [],
        APP_INVALID_HEADERS,
      ),
    );
  }

  const requestAuthParse = authHeader.split(" ");

  if (requestAuthParse.length !== 2) {
    return next(
      new nvErrorWrapper(
        false,
        401,
        APP_VALIDATION_AUTHORIZATION,
        [],
        APP_UNEXPECTED_HEADER,
      ),
    );
  }

  const [type, token] = requestAuthParse;

  if (type !== "x-hana-key") {
    return next(
      new nvErrorWrapper(
        false,
        401,
        APP_VALIDATION_AUTHORIZATION,
        [],
        APP_INVALID_AUTHORIZATION_NVAT,
      ),
    );
  }

  const secret = process.env.API_KEY;

  if (token !== secret) {
    return next(
      new nvErrorWrapper(
        false,
        401,
        APP_VALIDATION_AUTHORIZATION,
        [],
        APP_INVALID_AUTHORIZATION_NVAK,
      ),
    );
  }

  if (!secret) {
    return next(
      new nvErrorWrapper(
        false,
        401,
        APP_UNEXPECTED_ERROR,
        [],
        APP_INVALID_AUTHORIZATION_NVMK,
      ),
    );
  }

  next();
}
