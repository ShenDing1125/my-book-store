/**
 * @brief
 *  操作搜索紀錄和關鍵字
 * @data
 *  2023/3
 *  2023/4
 *    重新修改路由路徑
 */
import { Context } from "koa";
import { get, post, del, put } from "../decorator/ReqMethodDecorator";
import { controller } from "../decorator/ControllerDecorator";
import SearchDao from "@/modules/search/dao/SearchDao";
import SearchService from "@/modules/search/service/SearchService";
import { success, fail } from "@/common/ResResult";

@controller("/search")
class SearchController {
  @post("/historyKeyWord")
  public async addOrPutHistoryKeyWord(ctx: Context) {
    const { historyKeyWord } = ctx.request.body;
    const dbHistoryKeyWord = await SearchService.addOrPutHistoryKeyWord(historyKeyWord);

    ctx.body = success(dbHistoryKeyWord);
  }

  @get("/keyWords/:key")
  public async findKeyWords(ctx: Context) {
    const { key } = ctx.params;
    const dbKeyWords = await SearchDao.findKeyWords(key);
    ctx.body = success(dbKeyWords);
  }

  @get("/historyKeyWords/list")
  public async findAllHistoryKeyWords(ctx: Context) {
    const dbAllHistoryKeyWords = await SearchDao.findAllHistoryKeyWords();
    ctx.body = success(dbAllHistoryKeyWords);
  }

  @get("/historyKeyWords/:key")
  public async findHistoryKeyWords(ctx: Context) {
    const { key } = ctx.params;
    const dbHistoryKeyWords = await SearchDao.findHistoryKeyWords(key);
    ctx.body = success(dbHistoryKeyWords);
  }

  @get("/bookItems/:key")
  public async findBookItemListByKeyWord(ctx: Context) {
    const { key } = ctx.params;
    const dbBookItemListByKeyWord = await SearchDao.findBookItemListByKeyWord(key);
    ctx.body = success(dbBookItemListByKeyWord);
  }

  @del("/historyKeyWords/list")
  public async delAllHistoryKeyWord(ctx: Context) {
    const dbBookItemListByKeyWord = await SearchDao.delAllHistoryKeyWord();

    ctx.body = success(dbBookItemListByKeyWord);
  }
}
