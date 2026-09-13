import Redis from "ioredis";
import { config } from "../config";

let redisInstance: Redis | null = null;

const initRedis = (): Redis => {
  if (redisInstance) return redisInstance;

  const port = Number(config.redis.port);
  if (isNaN(port)) {
    console.error("hana-portfolio-redis is invalid");
    process.exit(1);
  }

  redisInstance = new Redis({
    host: config.redis.host,
    port: port,
    password: config.redis.password,
    db: Number(config.redis.db),

    retryStrategy: (times: number) => {
      const delay = Math.min(times * 200, 4000);
      if (times > 10) {
        console.error(
          `hana-portfolio-redis connection attempt ${times} failed. Retrying in ${delay}ms...`,
        );
      }
      return delay;
    },
  });

  redisInstance.on("connect", () =>
    console.log("hana-portfolio-redis has succesfully connected !"),
  );
  redisInstance.on("error", (err) =>
    console.error("hana-portfolio-redis failed to connect, due: ", err.message),
  );

  return redisInstance;
};

export default initRedis();
