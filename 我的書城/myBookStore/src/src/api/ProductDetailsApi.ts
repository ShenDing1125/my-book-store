/**
 * @brief
 *  請求書籍詳情
 * @data
 *  2023/4
 */
import axiosUtil from '@/utils/axiosUtil'

class ProductDetailsApi {
  public static productDetailsApi: ProductDetailsApi = new ProductDetailsApi()
  private constructor() {}

  public async findBooKItemByISBN(ISBN: string) {
    const data = await axiosUtil.get(`/productDetails/bookItem/${ISBN}`)

    return data
  }
}

export default ProductDetailsApi.productDetailsApi
