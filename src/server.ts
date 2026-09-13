import dotenv from "dotenv";
import path from "path";
import packageJson from "../package.json";

const isProd = process.env.NODE_ENV == "production";
const envPath = isProd
  ? [path.resolve(process.cwd(), ".env.prod")]
  : [path.resolve(process.cwd(), ".env.sit")];

// Initialize environment
dotenv.config();
dotenv.config({
  path: envPath,
  override: true,
});

// Import all route
import app from "./app";

// Define app port
const appPort = process.env.APP_PORT;

// Start Express JS
app.listen(appPort, () => {
  console.log(
    `${packageJson.name} v${packageJson.version} running on port ${appPort}`,
  );
});
