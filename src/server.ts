import dotenv from "dotenv";
import packageJson from "../package.json";

// Initialize environment
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

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
