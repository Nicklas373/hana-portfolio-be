import { Router } from "express";
import { getContact, insertContact } from "../lib/model/portfolio";
import { middleware } from "../middleware/middleware";
import * as z from "zod";
import { charWithDigitSchema } from "../lib/zod/schema";
import { nvErrorWrapper } from "../lib/wrapper/errorWrapper";
import {
  APP_INVALID_EMAIL,
  APP_INVALID_FULLNAME,
  APP_INVALID_TOKEN,
  APP_VALIDATION_BUSINESS,
  APP_VALIDATION_MISSING,
  APP_VAR_MESSAGE_TOO_LONG,
} from "../constant/app";

const router = Router();

router.get("/", middleware, async (req, res, next) => {
  try {
    const contactData = await getContact();

    return res.status(200).json({
      success: true,
      message: "OK",
      data: {
        contact: contactData,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", middleware, async (req, res, next) => {
  const body = req.body || [];
  const { fullname, email, message, turnstileToken } = body;

  // Validate request body parameter
  if (!fullname || !email || !message || !turnstileToken) {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_VALIDATION_MISSING,
      ),
    );
  }

  // Validate fullname
  if (charWithDigitSchema(50).safeParse(fullname).success === false) {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_INVALID_FULLNAME,
      ),
    );
  }

  // Validate email format
  if (z.email().safeParse(email).success === false) {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_INVALID_EMAIL,
      ),
    );
  }

  // Validate maximum message characters
  if (charWithDigitSchema(500).safeParse(message).success === false) {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_VAR_MESSAGE_TOO_LONG,
      ),
    );
  }

  // Validate cloudflare token
  const verifyResponse = await fetch(`${process.env.TURNSTILE_VERIFY_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: turnstileToken,
    }),
  });

  const verifyData = await verifyResponse.json();
  if (!verifyData.success) {
    return next(
      new nvErrorWrapper(
        false,
        400,
        APP_VALIDATION_BUSINESS,
        [],
        APP_INVALID_TOKEN,
      ),
    );
  }

  try {
    const contactData = await insertContact(fullname, email, message);

    return res.status(201).json({
      success: true,
      message: "OK",
      data: {
        contact: contactData,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
