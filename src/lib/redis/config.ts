import Redis from "ioredis";

let redisInstance: Redis | null = null;

const initRedis = (): Redis => {
  if (redisInstance) return redisInstance;

  const port = Number(process.env.REDIS_PORT);
  if (isNaN(port)) {
    console.error("hana-portfolio-redis is invalid");
    process.exit(1);
  }

  redisInstance = new Redis({
    host: process.env.REDIS_HOST,
    port: port,
    password: process.env.REDIS_PASSWORD,
    db: Number(process.env.REDIS_DB),

    retryStrategy: (times: number) => {
      if (times > 6) {
        console.error(
          `Failed to connect to hana-portfolio-redis after ${times} attempts`,
        );
        return null;
      }
      const delay = Math.min(times * 200, 4000);
      console.warn(
        `hana-portfolio-redis retry attempt ${times}, waiting ${delay}ms...`,
      );
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
