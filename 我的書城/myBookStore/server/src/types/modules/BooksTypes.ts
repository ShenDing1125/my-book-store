/**
 * @brief
 *  books 的宣告類型
 * @data
 *  2023/3
 */
export interface BooksTypes {
  ISBN: string;
  bookName: string;
  author: string;
  publishId: number;
  publisherName: string;
  monthSaleCount: number;
  bookPicName: string;
  secondCategoryId: number;
  thirdCategoryId: number;
  originalPrice: number;
  discount: number;
}

export enum BooksList {
  TABLE_NAME = "books",
  ISBN = "ISBN",
  BOOK_NAME = "bookName",
  AUTHOR = "author",
  PUBLISH_ID = "publishId",
  PUBLISHER_NAME = "publisherName",
  MONTH_SALE_COUNT = "monthSaleCount",
  BOOK_PIC_NAME = "bookPicName",
  SECOND_CATEGORY_ID = "secondCategoryId",
  THIRD_CATEGORY_ID = "thirdCategoryId",
  ORIGINAL_PRICE = "originalPrice",
  DISCOUNT = "discount",
}
