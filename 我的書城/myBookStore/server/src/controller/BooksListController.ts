/**
 * @brief
 *  操作級別分類的書籍清單
 * @data
 *  2023/3
 *  2023/4
 *    重新修改路由路徑
 */
import { Context } from "koa";
import { get, post } from "../decorator/ReqMethodDecorator";
import { controller } from "../decorator/ControllerDecorator";
import BooksDao from "@/modules/books/dao/BooksDao";
import { success, fail } from "@/common/ResResult";
import { strToIntNum } from "@/utils/Tools";

@controller("/booksList")
class BooksController {
  @get("/thirdCategory/:thirdCategoryId")
  async findBooksByThirdCategoryId(ctx: Context) {
    const { thirdCategoryId } = ctx.params;
    const Id: number = strToIntNum(thirdCategoryId);

    const result = await BooksDao.findBooksByThirdCategoryId(Id);
    ctx.body = success(result);
  }
}
