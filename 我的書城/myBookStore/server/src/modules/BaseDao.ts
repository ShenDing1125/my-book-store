/**
 * @brief
 *  連接 mysql
 * @data
 *  2023/3
 */
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import pathUtil from "@/utils/PathUtil";
import dbConfig from "@/config/DbConfig";

class BaseDao {
  public static baseDao: BaseDao = new BaseDao();
  public sequelize!: Sequelize;

  private constructor() {
    this.initSeqConfig("mysql");
    this.addModels();
  }

  private addModels() {
    this.sequelize.addModels([process.cwd() + `/src/modules/decoratorModel/*.model.ts`]);
  }

  private initSeqConfig(dialect: Dialect) {
    const { host, username, password, database, port } = dbConfig.getConfig();
    this.sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect,
      define: {
        freezeTableName: true, // true 表示使用者自訂義表名，false 表示 model 後加 s 作為表名
        timestamps: false, // true 表示給 model 加上間戳屬性(createAt、updateAt)，false 表示不帶時間戳屬性
      },
      // 數據庫連接池
      pool: {
        max: 10, // 最大連接數 (若超過 max數量，則會報異常)
        min: 5, // 最小連接數 (若超過 min數量 則會額外創建，但不會大於 max數量)
        idle: 10000, // 額外連接數進行銷毀的等待空閒時間(ms)
        acquire: 1000, // 表示一條 sql 查詢在獲取連接資源之前的最長等待時間(ms)
      },
    });
  }

  public createModel(modelName: string) {
    try {
      const fullPath = pathUtil.mergePath(process.cwd(), `/src/modules/decoratorModel/${modelName}.model.ts`);
      this.sequelize.addModels([fullPath]);
      this.sequelize.sync();
    } catch (e) {
      const errorMessage = `createModel(Fn): Table name is not exist -> ${modelName}`;
      throw new Error(errorMessage);
    }
  }
}

export default BaseDao.baseDao;
