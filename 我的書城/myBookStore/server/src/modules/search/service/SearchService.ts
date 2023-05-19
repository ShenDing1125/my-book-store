/**
 * @brief
 *  保存 '歷史搜尋' 紀錄及點擊數量
 * @data
 *  2023/3
 */
import searchDao from "../dao/SearchDao";
import isEmpty from "@/utils/isEmpty";

class SearchService {
  public static searchService: SearchService = new SearchService();

  private constructor() {}

  public async addOrPutHistoryKeyWord(historyKeyWord: string) {
    const dbHistoryKeywords = await searchDao.findHistoryKeyWords(historyKeyWord);

    if (!isEmpty(dbHistoryKeywords)) {
      const result: [{ affectedRows: number }, any] = await searchDao.putHistoryKeyWord(historyKeyWord);
      return result[0].affectedRows;
    } else {
      const result: [number, number] = await searchDao.addHistoryKeyWord(historyKeyWord);
      return result[0];
    }
  }
}

export default SearchService.searchService;
