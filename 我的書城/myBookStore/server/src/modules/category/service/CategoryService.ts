/**
 * @brief
 *  將分級列表掛載於 redis
 * @data
 *  2023/4
 *   -新增 redis 緩存
 */
// import redisConfig, { RedisClient } from "@/config/RedisConfig";
import { FirstCategoryTypes } from "@/types/modules/CategoryTypes";
import CategoryDao from "../dao/CategoryDao";
import { CategoryRedisStoreName } from "@/types/modules/CategoryTypes";
import RedisUtil from "@/utils/RedisUtil";
import baseDao from "@module/BaseDao";

const { FIRST_CATEGORY_LISTS_OBJ, FIRST_CATEGORY_KEY, ALL_SEC_THR_CATEGORY_LISTS_OBJ, ALL_SEC_THR_CATEGORY_KEY } =
  CategoryRedisStoreName;
const { QueryTypes } = require("sequelize");

class CategoryService {
  static categoryRedis: CategoryService = new CategoryService();

  private constructor() {}

  public async findFirstCategory(): Promise<FirstCategoryTypes[]> {
    const firstCategoryRedis = await RedisUtil.hget(FIRST_CATEGORY_LISTS_OBJ, FIRST_CATEGORY_KEY);
    if (!firstCategoryRedis) {
      const firstCategory = await CategoryDao.findFirstCategory();
      RedisUtil.hset(FIRST_CATEGORY_LISTS_OBJ, FIRST_CATEGORY_KEY, firstCategory);

      return firstCategory;
    } else {
      return firstCategoryRedis;
    }
  }

  public async findAllSecThrCategoryLists() {
    const sql = `SELECT sc.firstCategoryId, sc.secondCategoryId, sc.secondCategoryName, tc.thirdCategoryId, tc.thirdCategoryName, tc.thirdCategoryPicName FROM secondCategory sc INNER JOIN thirdCategory tc ON sc.secondCategoryId = tc.secondCategoryId`;

    const allSecThrCategoryLists = await RedisUtil.hget(ALL_SEC_THR_CATEGORY_LISTS_OBJ, ALL_SEC_THR_CATEGORY_KEY);
    if (!allSecThrCategoryLists) {
      const allSecThrCategories = await baseDao.sequelize.query(sql, { type: QueryTypes.SELECT });
      RedisUtil.hset(ALL_SEC_THR_CATEGORY_LISTS_OBJ, ALL_SEC_THR_CATEGORY_KEY, allSecThrCategories);

      return allSecThrCategories;
    } else {
      return allSecThrCategoryLists;
    }
  }
}

export default CategoryService.categoryRedis;
