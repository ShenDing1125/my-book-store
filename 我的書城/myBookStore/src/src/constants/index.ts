/**
 * @brief
 *  定義常量
 * @data
 *  2023/4
 */
import { BookItemListTypes, ThirdCategoryTypes, UserInfoTypes } from '@/store/state'

// 定義移動端螢幕尺寸
export const SCREEN_SIZE: number = 540

// thirdCategoryLists 本地構建數據
export const ALL_THIRD_CATEGORY_LISTS: ThirdCategoryTypes = {
  thirdCategoryId: 0,
  thirdCategoryPicName: '',
  thirdCategoryName: '全部',
}

// 緩存於瀏覽器上的名稱
export enum GoodStorageData {
  THIRD_CATEGORY_LISTS = 'THR_CATE_LIT',
  TOKEN = 'token',
}

// 上下拉動所載入的偽數據
export const pullingDownDummyData: BookItemListTypes = {
  ISBN: '111', // 書本身分證
  bookName: 'Pull Down',
  author: 'Pull Down',
  publishId: 111, // 出版社 ID
  publisherName: 'Pull Down',
  monthSaleCount: 111,
  bookPicName: 'Pull Down',
  secondCategoryId: 111,
  thirdCategoryId: 111,
  originalPrice: 111, // 原始定價
  discount: 0, // 折扣
}

export const pullingUpDummyData: BookItemListTypes = {
  ISBN: '222', // 書本身分證
  bookName: 'Pull Up',
  author: 'Pull Up',
  publishId: 222, // 出版社 ID
  publisherName: 'Pull Up',
  monthSaleCount: 222,
  bookPicName: 'Pull Up',
  secondCategoryId: 222,
  thirdCategoryId: 222,
  originalPrice: 222, // 原始定價
  discount: 0, // 折扣
}

// 初始用戶訊息
export const initUserInfo: UserInfoTypes = {
  userId: 0,
  userName: '',
  password: '',
  address: '',
  valid: 0,
  token: '',
}
