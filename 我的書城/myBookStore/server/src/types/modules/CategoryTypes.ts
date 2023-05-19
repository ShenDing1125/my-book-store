/**
 * @brief
 *  Category 的宣告類型
 * @data
 *  2023/3
 *  2023/5
 *   -新增類別圖案
 */
// FirstCategory
export interface FirstCategoryTypes {
  firstCategoryId: number;
  firstCategoryName: string;
}

export enum FirstCategoryList {
  TABLE_NAME = "firstCategory",
  FIRST_CATEGORY_ID = "firstCategoryId",
  FIRST_CATEGORY_NAME = "firstCategoryName",
}

// SecondCategory
export interface SecondCategoryTypes {
  secondCategoryId: number;
  secondCategoryName: string;
  firstCategoryId: number;
}

export enum SecondCategoryList {
  TABLE_NAME = "secondCategory",
  SECOND_CATEGORY_ID = "secondCategoryId",
  SECOND_CATEGORY_NAME = "secondCategoryName",
  FIRST_CATEGORY_ID = "firstCategoryId",
}

// ThirdCategoryModel
export interface ThirdCategoryTypes {
  thirdCategoryId: number;
  thirdCategoryName: string;
  thirdCategoryPicName: string;
  secondCategoryId: number;
}

export enum ThirdCategoryList {
  TABLE_NAME = "thirdCategory",
  THIRD_CATEGORY_ID = "thirdCategoryId",
  THIRD_CATEGORY_NAME = "thirdCategoryName",
  THIRD_CATEGORY_PIC_NAME = "thirdCategoryPicName",
  SECOND_CATEGORY_ID = "secondCategoryId",
}

// Category Redis Store Name
export enum CategoryRedisStoreName {
  FIRST_CATEGORY_LISTS_OBJ = "firstCategoryLists",
  FIRST_CATEGORY_KEY = "firstCategories",
  ALL_SEC_THR_CATEGORY_LISTS_OBJ = "allSecThrCategoryLists",
  ALL_SEC_THR_CATEGORY_KEY = "allSecThrCategories",
}
