import pg from "pg";
import { config } from "./config";

const { Pool } = pg;

export const portfolioPool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.name,
  password: config.database.password,
  port: Number(config.database.port),
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 15_000,
});
