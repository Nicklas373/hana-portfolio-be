import dotenv from "dotenv";

const isProd = process.env.NODE_ENV === "production";

dotenv.config({
  path: ".env",
  override: true,
});

export { isProd };
