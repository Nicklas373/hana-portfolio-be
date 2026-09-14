import * as z from "zod";

export const charWithDigitSchema = (digits: number) =>
  z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(digits, `Input must not exceed ${digits} characters`);
