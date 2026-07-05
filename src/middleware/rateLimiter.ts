import { rateLimit } from "express-rate-limit";
import { RedisReply, RedisStore } from "rate-limit-redis";
import redis from "../lib/redis/config";
import { errorFormatter } from "../lib/helper";

const createRateLimiter = (options: {
  windowMs: number;
  limit: number;
  message: string;
}) =>
  rateLimit({
    store: new RedisStore({
      sendCommand: async (
        command: string,
        ...args: (string | number | Buffer)[]
      ) => {
        try {
          return (await redis.call(command, ...args)) as Promise<RedisReply>;
        } catch (err) {
          console.error(`Redis Rate Limiter Error: ${errorFormatter(err)}`);
          throw err;
        }
      },
    }),
    windowMs: options.windowMs,
    limit: options.limit,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
      success: false,
      message: options.message,
      data: null,
      error: "Rate limit exceeded",
    },

    skip: (req) => req.path === "/api/v1/health",
  });

export const globalRequestRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  message: "Too many requests from this IP, please try again later.",
});

export const crudRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  message: "Too many requests from this IP, please try again later.",
});
