/**
 * @brief
 *  將抽取出來的 DB數據 進行分類封裝
 * @data
 *  2023/3
 */
import dbDataFormatUtil from "@/utils/DbDataFormatUtil";
import { SecondCategoryList, ThirdCategoryList } from "@/types/modules/CategoryTypes";
import { ItemType, EleOfArr } from "@/types/UtilsTypes";

const THIRD_CATEGORY_LIST_NAME = "thirdCategoryLists";

function subItemAssignBySecCategoryId<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(
  arr: T,
  assign: SecondCategoryList,
  args: K[]
) {
  type valueTypes = EleOfArr<T>[K];
  const result: { [V in valueTypes]: ItemType<T>[] } = {};

  for (const item of arr) {
    const assignByCategoryId: EleOfArr<T>[K] = item[assign as K];
    const subItem = args.reduce((pre: any, cur: any, index: any) => {
      return { ...pre, [args[index]]: item[args[index]] };
    }, {});

    if (!(assignByCategoryId in result)) {
      Object.defineProperty(result, assignByCategoryId, {
        enumerable: true,
        configurable: false,
        writable: true,
        value: [],
      });

      result[assignByCategoryId].push(subItem);
    } else {
      result[assignByCategoryId].push(subItem);
    }
  }
  return result;
}

function dbFormatConversion(secThrCategory: any[]) {
  // 取出 secThrCategory 當中的 secondCategoryId 與 secondCategoryName
  const secCategoryList = dbDataFormatUtil.getSubItemFromArr(
    secThrCategory,
    SecondCategoryList.FIRST_CATEGORY_ID,
    SecondCategoryList.SECOND_CATEGORY_ID,
    SecondCategoryList.SECOND_CATEGORY_NAME
  );

  // 使用 secondCategoryId 進行判斷去重
  const result: any[] = dbDataFormatUtil.getNoReptItem(secCategoryList, SecondCategoryList.SECOND_CATEGORY_ID);

  // 抽取 secThrCategory 當中給予的指定值(例:thirdCategoryId)，並依照 secondCategoryId 進行劃分
  const thrCategoryList = subItemAssignBySecCategoryId(secThrCategory, SecondCategoryList.SECOND_CATEGORY_ID, [
    // ThirdCategoryList.SECOND_CATEGORY_ID,
    ThirdCategoryList.THIRD_CATEGORY_ID,
    ThirdCategoryList.THIRD_CATEGORY_NAME,
    ThirdCategoryList.THIRD_CATEGORY_PIC_NAME,
  ]);

  // 進行合併
  for (const item of result) {
    if (item[SecondCategoryList.SECOND_CATEGORY_ID] in thrCategoryList) {
      // 將 thirdCategory 的資料放置於 thirdCategoryLists
      Object.defineProperty(item, THIRD_CATEGORY_LIST_NAME, {
        enumerable: true,
        configurable: false,
        writable: true,
        value: thrCategoryList[item[SecondCategoryList.SECOND_CATEGORY_ID]],
      });
    }
  }

  return result;
}

export default dbFormatConversion;
//----------------------------------------------------
// 範例 :
// 輸入
// [
//   {
//     firstCategoryId: 1,
//     secondCategoryId: 1,
//     secondCategoryName: "傳記/自傳",
//     thirdCategoryId: 1,
//     thirdCategoryName: "領袖/領導人物",
//   },
//   {
//     firstCategoryId: 1,
//     secondCategoryId: 1,
//     secondCategoryName: "傳記/自傳",
//     thirdCategoryId: 2,
//     thirdCategoryName: "台灣人物",
//   },
//   {
//     firstCategoryId: 1,
//     secondCategoryId: 1,
//     secondCategoryName: "傳記/自傳",
//     thirdCategoryId: 3,
//     thirdCategoryName: "傳奇/逸聞",
//   },
//   {
//     firstCategoryId: 1,
//     secondCategoryId: 2,
//     secondCategoryName: "哲學",
//     thirdCategoryId: 4,
//     thirdCategoryName: "西方哲學",
//   },
//   {
//     firstCategoryId: 1,
//     secondCategoryId: 2,
//     secondCategoryName: "哲學",
//     thirdCategoryId: 5,
//     thirdCategoryName: "東方哲學",
//   },
// ];

// 輸出
// [
//   {
//     secondCategoryId: 1,
//     secondCategoryName: "傳記/自傳",
//     thirdCategoryLists: [[Object], [Object], [Object]],
//   },
//   {
//     secondCategoryId: 2,
//     secondCategoryName: "哲學",
//     thirdCategoryLists: [[Object], [Object]],
//   },
// ];
