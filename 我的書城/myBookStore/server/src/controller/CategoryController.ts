/**
 * @brief
 *  操作級別分類表
 * @data
 *  2023/3
 *  2023/4
 *    重新修改路由路徑
 */
import { Context } from "koa";
import { get, post } from "../decorator/ReqMethodDecorator";
import { controller } from "../decorator/ControllerDecorator";
import { success, fail } from "@/common/ResResult";
import CategoryDao from "@/modules/category/dao/CategoryDao";
import dbFormatConversion from "@/modules/category/service/DbCategoryConvert";
import { strToIntNum } from "@/utils/Tools";
import CategoryService from "@/modules/category/service/CategoryService";

@controller("/category")
class CategoryController {
  @get("/firstCategory/list")
  public async findFirstCategory(ctx: Context) {
    const result = await CategoryService.findFirstCategory();
    ctx.body = success(result);
  }

  @get("/secThrCategory/lists")
  public async findAllSecThrCategoryLists(ctx: Context) {
    const result = await CategoryService.findAllSecThrCategoryLists();
    ctx.body = success(dbFormatConversion(result));
  }

  @get("/secThrCategory/list/:firstCategoryId")
  public async findSecThrCategoryByFirstCategoryId(ctx: Context) {
    const { firstCategoryId } = ctx.params;
    const Id: number = strToIntNum(firstCategoryId);
    const result = await CategoryDao.findSecThrCategoryByFirstCategory(Id);
    ctx.body = success(dbFormatConversion(result));
  }

  @get("/thirdCategory/list/:secondCategoryId")
  public async findThirdCategoryBySecondCategoryId(ctx: Context) {
    const { secondCategoryId } = ctx.params;
    const Id: number = strToIntNum(secondCategoryId);
    const result = await CategoryDao.findThirdCategoryBySecondCategoryId(Id);
    ctx.body = success(result);
  }
}
