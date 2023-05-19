/**
 * @brief
 *  對 redis 進行方法封裝
 * @data
 *  2023/4
 */
import redisConfig, { RedisClient } from "@/config/RedisConfig";

class RedisUtil implements RedisClient {
  public static redisUtil: RedisUtil = new RedisUtil();
  public redisClient: RedisClient = redisConfig.redisServerConfig();

  private constructor() {}

  public async set(key: string, value: any): Promise<any> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  public async get(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  public async hset(obj: string, key: string, value: any): Promise<any> {
    await this.redisClient.hset(obj, key, JSON.stringify(value));
  }

  public async hget(obj: string, key: string): Promise<any> {
    const value = await this.redisClient.hget(obj, key);
    return value ? JSON.parse(value) : undefined;
  }

  public async hgetall(obj: string): Promise<any> {
    const value = await this.redisClient.hgetall(obj);
    return value ? JSON.parse(value) : undefined;
  }

  public async hmset(obj: string, ...keyValue: any[]): Promise<any> {
    await this.redisClient.hmset(obj, JSON.stringify(keyValue));
  }

  public async hmget(obj: string, ...keys: any[]): Promise<any> {
    const value = await this.redisClient.hmget(obj, keys);
    return value ? JSON.parse(value) : undefined;
  }

  public async del(key: string): Promise<any> {
    await this.redisClient.del(key);
  }
}

export default RedisUtil.redisUtil;
