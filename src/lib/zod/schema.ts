import * as z from "zod";

export const charWithDigitSchema = (digits: number) =>
  z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Input must contain only alphanumeric characters")
    .max(digits, `Input must not exceed ${digits} characters`);
