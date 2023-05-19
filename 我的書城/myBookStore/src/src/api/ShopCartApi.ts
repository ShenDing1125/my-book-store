/**
 * @brief
 *  請求購物車訊息
 * @data
 *  2023/4
 */
import axiosUtil from '@/utils/axiosUtil'
import { ShopCartTypes } from '@/store/state'

class ShopCartApi {
  public static shopCartApi: ShopCartApi = new ShopCartApi()
  private constructor() {}

  public getCurUserShopCartList(userId: number) {
    const data = axiosUtil.get(`/shopCart/curUser/${userId}`)
    return data
  }

  public async addWishlistToShopCartList(ShopCartList: ShopCartTypes) {
    const data = await axiosUtil.post('/shopCart/wishlist', ShopCartList)
    return data
  }

  public async delWishlistToShopCartList(bookISBN: string) {
    const data = await axiosUtil.delete(`/shopCart/wishlist/${bookISBN}`)
    return data
  }

  public async putWishlistToShopCartList(ShopCartList: ShopCartTypes) {
    const data = await axiosUtil.put('/shopCart/wishlist', ShopCartList)
    return data
  }
}

export default ShopCartApi.shopCartApi
