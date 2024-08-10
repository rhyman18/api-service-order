require("dotenv").config();
const Redis = require("ioredis");

class RedisCache {
  constructor() {
    this.maxRetries = 3;
    this.retryDelay = 3000;
    this.retryCount = 0;

    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      retryStrategy: (times) => {
        if (this.retryCount >= this.maxRetries) {
          return null;
        }

        this.retryCount++;
        const delay = this.retryDelay;
        return delay;
      },
      reconnectOnError: (err) => {
        const targetError = "READONLY";
        if (err.message.includes(targetError)) {
          return true;
        }
        return false;
      },
      maxRetriesPerRequest: 0,
      enableReadyCheck: true,
    });

    this.redisClient.on("error", (err) => {
      console.error("Redis error:", err.message);
    });

    this.redisClient.on("connect", () => {
      console.log("Redis Connected");
      this.retryCount = 0;
    });

    this.redisClient.on("close", () => {
      console.log("Redis Disconnected");
    });
  }

  async get(key) {
    try {
      return await this.redisClient.get(key);
    } catch (err) {
      console.error("Redis get error:", err.message);
      return null;
    }
  }

  async set(key, value) {
    try {
      await this.redisClient.set(
        key,
        JSON.stringify(value),
        "EX",
        process.env.REDIS_EXPIRE
      );
    } catch (err) {
      console.error("Redis set error:", err.message);
    }
  }

  async del(key) {
    try {
      await this.redisClient.del(key);
    } catch (err) {
      console.error("Redis del error:", err.message);
    }
  }

  async keys(key) {
    try {
      return await this.redisClient.keys(key);
    } catch (err) {
      console.error("Redis keys error:", err.message);
      return [];
    }
  }

  status() {
    return this.redisClient.status;
  }
}

module.exports = new RedisCache();
