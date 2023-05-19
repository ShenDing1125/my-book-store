/**
 * @brief
 *  定義 mysql
 * @data
 *  2023/3
 */
import { DbConnectConfig, DbEnvConfig } from "@/types/ConfigTypes";

class DbConfig {
  public static dbConfig: DbConfig = new DbConfig();
  public env!: keyof DbEnvConfig;
  public envConfig!: DbEnvConfig;
  private constructor() {
    this.env = process.env.NODE_ENV === "dev" ? "dev" : "prod";
    this.initConfig();
  }

  private initConfig() {
    this.envConfig = {
      dev: {
        host: "localhost",
        username: "root",
        password: "123456",
        database: "mybookstore",
        port: 3306,
      },
      prod: {
        host: "localhost",
        username: "root",
        password: "123456",
        database: "mybookstore",
        port: 3306,
      },
    };
  }

  private isDbConnectConfig(key: any): key is keyof DbConnectConfig {
    return key in this.envConfig[this.env];
  }

  public getConfig(): DbConnectConfig;
  public getConfig(key: keyof DbConnectConfig): string | number;
  public getConfig(key: any = ""): any {
    if (this.isDbConnectConfig(key) && key.length > 0) {
      return this.envConfig[this.env][key];
    } else {
      return this.envConfig[this.env];
    }
  }
}

export default DbConfig.dbConfig;
