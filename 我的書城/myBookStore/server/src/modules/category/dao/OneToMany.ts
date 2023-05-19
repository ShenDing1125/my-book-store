/**
 * @brief
 *  級別分類表
 *    -此表為測試表，因為返回的數據格式不適用，需使用原 sql 語法查詢
 * @data
 *  2023/3
 *    -已不使用
 */
import SecondCategoryModel from "../../decoratorModel/SecondCategory.model";
import ThirdCategoryModel from "../../decoratorModel/ThirdCategory.model";

// 一對多 關係
SecondCategoryModel.hasMany(ThirdCategoryModel, { as: "thirdCategory", foreignKey: "secondCategoryId" });
// 多對一 關係
ThirdCategoryModel.belongsTo(SecondCategoryModel, {
  foreignKey: "secondCategoryId",
  targetKey: "secondCategoryId",
});

export default async function findSecThirdCategoryByFirstCategoryId(firstCategoryId: number) {
  return await SecondCategoryModel.findAll({
    raw: true,
    where: {
      firstCategoryId,
    },
    include: [
      {
        model: ThirdCategoryModel,
        as: "thirdCategory",
      },
    ],
  });
}
