/**
 * @brief
 *  請求級別分類的書籍清單
 * @data
 *  2023/4
 */
import axiosUtil from '@/utils/axiosUtil'

class BookItemsApi {
  public static api: BookItemsApi = new BookItemsApi()
  private constructor() {}

  public async getBookItems(thirdCategoryId: number) {
    const data = await axiosUtil.get(`/booksList/thirdCategory/${thirdCategoryId}`)
    return data
  }
}

export default BookItemsApi.api
