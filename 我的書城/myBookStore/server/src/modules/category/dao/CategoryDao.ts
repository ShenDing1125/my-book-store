/**
 * @brief
 *  級別分類表
 * @data
 *  2023/3
 */
import FirstCategory from "../../decoratorModel/FirstCategory.model";
import baseDao from "@module/BaseDao";

const { QueryTypes } = require("sequelize");
// const { FIRST_CATEGORY_ID } = FirstCategoryList;

class CategoryDao {
  static categoryDao: CategoryDao = new CategoryDao();
  private constructor() {}

  public findFirstCategory() {
    return FirstCategory.findAll({
      raw: true,
    });
  }

  public async findAllSecThrCategoryLists() {
    const sql = `SELECT sc.firstCategoryId, sc.secondCategoryId, sc.secondCategoryName, tc.thirdCategoryId, tc.thirdCategoryName, tc.thirdCategoryPicName FROM secondCategory sc INNER JOIN thirdCategory tc ON sc.secondCategoryId = tc.secondCategoryId`;

    return await baseDao.sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  public async findSecThrCategoryByFirstCategory(firstCategoryId: number) {
    const sql = `SELECT sc.firstCategoryId, sc.secondCategoryId, sc.secondCategoryName, tc.thirdCategoryId, tc.thirdCategoryName, tc.thirdCategoryPicName FROM secondCategory sc INNER JOIN thirdCategory tc ON sc.secondCategoryId = tc.secondCategoryId WHERE sc.firstCategoryId = ${firstCategoryId}`;

    return await baseDao.sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  public async findThirdCategoryBySecondCategoryId(secondCategoryId: number) {
    const sql = `SELECT sc.firstCategoryId, sc.secondCategoryId, sc.secondCategoryName, tc.thirdCategoryId, tc.thirdCategoryName, tc.thirdCategoryPicName FROM secondCategory sc INNER JOIN thirdCategory tc ON sc.secondCategoryId = tc.secondCategoryId WHERE tc.secondCategoryId = ${secondCategoryId};
    `;
    return await baseDao.sequelize.query(sql, { type: QueryTypes.SELECT });
  }
}

export default CategoryDao.categoryDao;
