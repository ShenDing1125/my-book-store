/**
 * @brief
 *  添加願望清單到購物車列表
 * @data
 *  2023/3
 */
import ShopCartDao from "../dao/ShopCartDao";
import { ShopCartTypes } from "@/types/modules/ShopCart";
import DbDataFormatUtil from "@/utils/DbDataFormatUtil";

class ShopCartService {
  private constructor() {}
  public static shopCartService: ShopCartService = new ShopCartService();

  async addWishlistToShopCartList(shopCartList: ShopCartTypes) {
    const result = await ShopCartDao.addWishlistToShopCartList(shopCartList);

    // 將返回的 shopCartId 取出，並與接收的 bookItemList 合併後返回
    const wishlist = DbDataFormatUtil.combineFromObj({ shopCartId: result[0] }, shopCartList);
    return wishlist;
  }
}

export default ShopCartService.shopCartService;
