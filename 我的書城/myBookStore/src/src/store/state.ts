/**
 * @brief 
 *  定義 個別store 類型 
 * @data
 */
// category
export interface FirstCategoryTypes {
  firstCategoryId: number
  firstCategoryName: string
}

export interface SecondCategoryTypes {
  secondCategoryId: number
  secondCategoryName: string
  firstCategoryId: number
}

export interface ThirdCategoryTypes {
  thirdCategoryId: number
  thirdCategoryName: string
  thirdCategoryPicName: string
  secondCategoryId?: number
}

export interface SecThrCategoryTypes {
  firstCategoryId: number
  secondCategoryId: number
  secondCategoryName: string
  thirdCategoryLists: ThirdCategoryTypes[]
}

// books
export interface BookItemListTypes {
  ISBN: string // 書本身分證
  bookName: string
  author: string
  publishId: number // 出版社 ID
  publisherName: string
  monthSaleCount: number
  bookPicName: string
  secondCategoryId: number
  thirdCategoryId: number
  originalPrice: number // 原始定價
  discount: number // 折扣
}

// shopCart
export interface ShopCartTypes {
  checked?: boolean
  shopCartId?: number
  bookISBN: string
  bookName: string
  bookPicName: string
  originalPrice: number
  discount: number
  userId?: number
  purchaseNum?: number
  purchaseQuantity: number
}

// search
export interface KeyWordTypes {
  keyWordId: number
  keyWord: string
}

export interface HistoryKeyWordTypes {
  historyKeyWordId: number
  historyKeyWord: string
  clickCount: number
}

// userInfo
export interface UserInfoTypes {
  userId: number;
  userName: string;
  password: string;
  address: string;
  valid: number;
  token: string;
}

export {}
