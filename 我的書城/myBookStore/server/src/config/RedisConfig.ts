/**
 * @brief
 *  定義 redis
 * @data
 *  2023/4
 */
import redis from "koa-redis";
import { RedisConnectConfig, RedisEnvConfig } from "@/types/ConfigTypes";

export interface RedisClient {
  set(key: string, value: any): any;
  get(key: string): any;
  hset(obj: string, key: string, value: any): any;
  hget(obj: string, key: string): any;
  hgetall(obj: string): any;
  hmset(obj: string, ...keyValue: any[]): any;
  hmget(obj: string, ...keys: any[]): any;
  del(key: string): any;
}

class RedisConfig {
  static redisConfig: RedisConfig = new RedisConfig();
  envConfig!: RedisEnvConfig;
  env!: keyof RedisEnvConfig;
  private constructor() {
    const curEnv = process.env.NODE_ENV || "dev";
    this.env = process.env.NODE_ENV === "dev" ? "dev" : "prod";
    this.initConfig();
  }

  private initConfig() {
    this.envConfig = {
      dev: {
        host: "127.0.0.1",
        port: 6379,
      },
      prod: {
        host: "127.0.0.1",
        port: 6379,
      },
    };
  }

  public getConfig() {
    if (this.env === undefined || this.envConfig === undefined) {
      this.env = process.env.NODE_ENV === "dev" ? "dev" : "prod";
      this.initConfig();
    }
    return this.envConfig[this.env];
  }

  public redisServerConfig() {
    return redis(this.getConfig()).client;
  }
}

export default RedisConfig.redisConfig;
