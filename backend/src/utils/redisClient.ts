import { Queue } from "bullmq";
import Redis from "ioredis";

let redisClient: Redis;
let uptimeQueue: Queue;

const initializeRedisClient = async (): Promise<void> => {
  try {
    redisClient = new Redis(process.env.REDIS_URL as string, {
      maxRetriesPerRequest: null,
    });

    redisClient.on("error", (error) => {
      console.log("🚀 ~ redisClient ~ error:", error);
      process.exit(1);
    });

    redisClient.on("connect", () => {
      console.log("🚀 ~ redisClient is connected");
    });

    redisClient.on("ready", () => {
      console.log("🚀 ~ redisClient is ready");
    });

    uptimeQueue = new Queue("uptimeQueue", { connection: redisClient });
    console.log("🚀 ~ uptime queue initialized successfully");
  } catch (error) {
    console.log("🚀 ~ initializeRedisClient ~ error:", error);
    process.exit(1);
  }
};

export { initializeRedisClient, redisClient, uptimeQueue };
