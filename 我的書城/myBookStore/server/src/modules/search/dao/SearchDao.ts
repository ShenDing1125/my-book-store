/**
 * @brief
 *  使用 '歷史搜尋'、'熱門搜尋'、'關鍵搜尋' 來尋找書本詳情
 * @data
 *  2023/3
 */
import KeyWord from "@/modules/decoratorModel/KeyWord.model";
import HistoryKeyWord from "@/modules/decoratorModel/HistoryKeyWord.model";
import Books from "@/modules/decoratorModel/Books.model";
import { Op, QueryTypes } from "sequelize";
import BaseDao from "@/modules/BaseDao";
import { HistoryKeyWordList } from "@/types/modules/HistoryKeyWordTypes";

const { TABLE_NAME } = HistoryKeyWordList;

class SearchDao {
  public static searchDao: SearchDao = new SearchDao();
  private constructor() {}

  public async findKeyWords(keyWord: string) {
    return await KeyWord.findAll({
      raw: true,
      where: {
        keyWord: { [Op.like]: `%${keyWord}%` },
      },
    });
  }

  public async findHistoryKeyWords(historyKeyWord: string) {
    return await HistoryKeyWord.findAll({
      raw: true,
      where: {
        historyKeyWord: { [Op.like]: `%${historyKeyWord}%` },
      },
    });
  }

  public async findAllHistoryKeyWords() {
    return await HistoryKeyWord.findAll({
      raw: true,
    });
  }

  public async addHistoryKeyWord(historyKeyWord: string): Promise<[any, any]> {
    const sql = `INSERT INTO historyKeyWord (historyKeyWord, clickCount) VALUES ('${historyKeyWord}', 1)`;

    return await BaseDao.sequelize.query(sql, { type: QueryTypes.INSERT });
  }

  public async putHistoryKeyWord(historyKeyWord: string): Promise<[any, any]> {
    const sql = `UPDATE historyKeyWord SET clickCount=clickCount+1 WHERE historyKeyWord='${historyKeyWord}'`;

    return await BaseDao.sequelize.query(sql);
  }

  public async findBookItemListByKeyWord(keyWord: string) {
    // 增廣搜索度，例: ps 轉成 %p%s%
    const KeyWordToArray = keyWord.split("");
    const KeyWordToString = KeyWordToArray.join("%");
    return await Books.findAll({
      raw: true,
      where: {
        bookName: { [Op.like]: `%${KeyWordToString}%` },
      },
    });
  }

  public async delAllHistoryKeyWord() {
    const sql = `DELETE FROM ${TABLE_NAME}`;
    return await BaseDao.sequelize.query(sql);
  }
}

export default SearchDao.searchDao;
