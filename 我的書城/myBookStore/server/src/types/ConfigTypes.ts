/**
 * @brief
 *  config 文件夾下的宣告類型
 * @data
 *  2023/3
 */
// DbConfig
export interface DbConnectConfig {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

export interface DbEnvConfig {
  dev: DbConnectConfig;
  prod: DbConnectConfig;
}

// RedisConfig
export interface RedisConnectConfig {
  host: string;
  port: number;
}

export interface RedisEnvConfig {
  dev: RedisConnectConfig;
  prod: RedisConnectConfig;
}
