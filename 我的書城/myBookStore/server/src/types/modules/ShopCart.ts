/**
 * @brief
 *  shopCart 的宣告類型
 * @data
 *  2023/3
 */
export interface ShopCartTypes {
  shopCartId: number;
  bookISBN: string;
  bookName: string;
  bookPicName: string;
  originalPrice: number;
  discount: number;
  userId: number;
  purchaseNum: number;
  purchaseQuantity: number;
}

export enum ShopCartList {
  TABLE_NAME = "shopCart",
  SHOP_CART_ID = "shopCartId",
  BOOK_ISBN = "bookISBN",
  BOOK_NAME = "bookName",
  BOOK_PIC_NAME = "bookPicName",
  ORIGINAL_PRICE = "originalPrice",
  DISCOUNT = "discount",
  USER_ID = "userId",
  PURCHASE_NUM = "purchaseNum",
  PURCHASE_QUANTITY = "purchaseQuantity",
}
