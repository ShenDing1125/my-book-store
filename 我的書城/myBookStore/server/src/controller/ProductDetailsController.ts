/**
 * @brief
 *  操作書籍詳情
 * @data
 *  2023/3
 *  2023/4
 *    重新修改路由路徑
 */
import { Context } from "koa";
import { get, post, del, put } from "../decorator/ReqMethodDecorator";
import { controller } from "../decorator/ControllerDecorator";
import ProductDetailsDao from "@/modules/productDetails/dao/ProductDetailsDao";
import { success, fail } from "@/common/ResResult";

@controller("/productDetails")
class SearchController {
  @get("/bookItem/:ISBN")
  public async findBooKItemByISBN(ctx: Context) {
    const { ISBN } = ctx.params;
    const result = await ProductDetailsDao.findBooKItemByISBN(ISBN);

    ctx.body = success(result);
  }
}
