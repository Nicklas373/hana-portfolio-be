import { Router } from "express";
import { getContact, insertContact } from "../lib/model/portfolio";
import { middleware } from "../middleware/middleware";
import { emailFormatter, errorFormatter } from "../lib/helper";

const router = Router();

router.get("/", middleware, async (req, res) => {
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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {
        contact: null,
      },
      error: errorFormatter(error),
    });
  }
});

router.post("/", middleware, async (req, res) => {
  const body = req.body || [];
  const { fullname, email, message, turnstileToken } = body;

  // Validate request body parameter
  if (!fullname || !email || !message || !turnstileToken) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      data: {
        contact: null,
      },
      error: "Missing some of body parameters",
    });
  }

  // Validate email format
  if (!emailFormatter(email)) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      data: {
        contact: null,
      },
      error: "Invalid email",
    });
  }

  // Validate maximum message characters
  if (message.length > 500) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      data: {
        contact: null,
      },
      error: "Message too long",
    });
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
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      data: {
        contact: null,
      },
      error: "Invalid token",
    });
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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {
        contact: null,
      },
      error: errorFormatter(error),
    });
  }
});

export default router;
