import fs from "node:fs";
import { isProd } from "./environment";

const readSecret = (secretName: string): string | undefined => {
  if (!isProd) {
    return undefined;
  }

  const secretPath = `/run/secrets/${secretName}`;

  if (!fs.existsSync(secretPath)) {
    return undefined;
  }

  const value = fs.readFileSync(secretPath, "utf8").trim();

  return value || undefined;
};

export const config = {
  app: {
    url: process.env.APP_URL,
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    apiKey: readSecret("hana_portfolio_api_key") ?? process.env.API_KEY,
    baseUrl: process.env.BASE_URL,
    corsOrigins: process.env.CORS_ORIGINS,
  },

  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password:
      readSecret("hana_portfolio_db_password") ?? process.env.DB_PASSWORD,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password:
      readSecret("hana_portfolio_redis_password") ?? process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB,
  },

  turnstile: {
    secretKey:
      readSecret("hana_portfolio_turnstile_secret") ??
      process.env.TURNSTILE_SECRET_KEY,
    verifyUrl: process.env.TURNSTILE_VERIFY_URL,
  },
};
