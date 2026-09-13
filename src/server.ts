import app from "./app";
import packageJson from "../package.json";
import { config } from "./lib/config";

app.listen(config.app.port, () => {
  console.log(
    `${packageJson.name} v${packageJson.version} running on port ${config.app.port}`,
  );
});
