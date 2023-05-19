/**
 * @brief
 *  儲存搜尋紀錄
 * @data
 *  2023/4
 */
import SearchApi from '@/api/SearchApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { BookItemListTypes } from '../state'
import { KeyWordTypes, HistoryKeyWordTypes } from '../state'

export const initKeywordValue: string = '請輸入搜索關鍵字'

export const useSearchStore = defineStore('search', {
  state: () => {
    const curKeyWord: string = initKeywordValue
    const keyWordList: KeyWordTypes[] = []
    const historyKeyWordList: HistoryKeyWordTypes[] = []
    const allHistoryKeyWordList: HistoryKeyWordTypes[] = []
    const bookListByKeyWord: BookItemListTypes[] = []

    return {
      initKeywordValue,
      curKeyWord,
      keyWordList,
      historyKeyWordList,
      allHistoryKeyWordList,
      bookListByKeyWord,
    }
  },
  getters: {
    getKeyword(state) {
      return state.curKeyWord
    },
  },
  actions: {
    storeKeyword(keyword: string = '') {
      this.curKeyWord = keyword
    },

    async findKeyWords(keyWord: string) {
      const result: AxiosResponse<KeyWordTypes[]> = await SearchApi.findKeyWords(keyWord)

      this.keyWordList = result.data
    },

    async addOrPutHistoryKeyWord(keyWord: string) {
      await SearchApi.addOrPutHistoryKeyWord(keyWord)
    },

    async findHistoryKeyWords(keyWord: string) {
      const result: AxiosResponse<HistoryKeyWordTypes[]> = await SearchApi.findHistoryKeyWords(
        keyWord
      )
      this.historyKeyWordList = result.data
    },

    async findAllHistoryKeyWords() {
      const result: AxiosResponse<HistoryKeyWordTypes[]> = await SearchApi.findAllHistoryKeyWords()

      this.allHistoryKeyWordList = result.data
    },

    async findBookItemListByKeyWord(keyWord: string) {
      const result: AxiosResponse<BookItemListTypes[]> = await SearchApi.findBookItemListByKeyWord(
        keyWord
      )

      this.bookListByKeyWord = result.data
    },

    async findBookItemListByHistoryKeyWord(keyWord: string) {
      const result: AxiosResponse<BookItemListTypes[]> = await SearchApi.findBookItemListByKeyWord(
        keyWord
      )

      return result.data
    },

    async delAllHistoryKeyWord() {
      const result = await SearchApi.delAllHistoryKeyWord()

      this.bookListByKeyWord = result.data
    },
  },
})
