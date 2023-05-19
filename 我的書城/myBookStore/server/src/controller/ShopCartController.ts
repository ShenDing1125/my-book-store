/**
 * @brief
 *  操作購物車訊息
 * @data
 *  2023/3
 *  2023/4
 *    重新修改路由路徑
 */
import { Context } from "koa";
import { get, post, del, put } from "../decorator/ReqMethodDecorator";
import { controller } from "../decorator/ControllerDecorator";
import ShopCartDao from "@/modules/shopCart/dao/ShopCartDao";
import { success, fail } from "@/common/ResResult";
import { strToIntNum } from "@/utils/Tools";
import ShopCartService from "@/modules/shopCart/service/ShopCartService";
import { ShopCartTypes } from "@/types/modules/ShopCart";

@controller("/shopCart")
class ShopCartController {
  @get("/curUser/:userId")
  async findCurUserShopCartList(ctx: Context) {
    const { userId } = ctx.params;
    const Id: number = strToIntNum(userId);
    const result = await ShopCartDao.findCurUserShopCartList(Id);

    ctx.body = success(result);
  }

  @post("/wishlist")
  async addWishlistToShopCartList(ctx: Context) {
    const shopCartList: ShopCartTypes = ctx.request.body;
    const dbShopCartList = await ShopCartService.addWishlistToShopCartList(shopCartList);
    ctx.body = success(dbShopCartList);
  }

  @del("/wishlist/:bookISBN")
  async delWishlistToShopCartList(ctx: Context) {
    const { bookISBN } = ctx.params;
    const ISBN: number = strToIntNum(bookISBN);
    const isSuccess = await ShopCartDao.delWishlistFromShopCartList(ISBN);
    if (isSuccess) {
      ctx.body = success(isSuccess);
    } else {
      ctx.body = fail("500", "刪除失敗");
    }
  }

  @put("/wishlist")
  async putWishlistToShopCartList(ctx: Context) {
    const shopCartList: ShopCartTypes = ctx.request.body;
    const result = await ShopCartDao.putWishlistToShopCartList(shopCartList);
    ctx.body = success(result);
  }
}
