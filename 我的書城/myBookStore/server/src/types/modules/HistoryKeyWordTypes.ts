/**
 * @brief
 *  historyKeyWord 的宣告類型
 * @data
 *  2023/3
 */
export interface HistoryKeyWordTypes {
  historyKeyWordId: number;
  historyKeyWord: string;
  clickCount: number;
}

export enum HistoryKeyWordList {
  TABLE_NAME = "historyKeyWord",
  HISTORY_KEY_WORD_ID = "historyKeyWordId",
  HISTORY_KEY_WORD = "historyKeyWord",
  CLICK_COUNT = "clickCount",
}
