/**
 * @brief
 *  search 頁面的操作功能以及數據請求方法
 * @data
 *  2023/4
 */
import router from '@/router'
import { Ref, ref } from 'vue'
import { useSearchStore, initKeywordValue } from '@/store/search'
import { storeToRefs } from 'pinia'
import { debounce } from '@/utils/tools'
import { HistoryKeyWordTypes } from '@/store/state'

export default class SearchService {
  public static isOpenAutoContainer: Ref<boolean> = ref(false) // 顯示搜索結果的容器
  public static isOpenAutoHistoryContainer: Ref<boolean> = ref(false) // 顯示歷史紀錄的容器
  public static searchStore = useSearchStore()
  public static searchStoreRefs = storeToRefs(SearchService.searchStore)
  public static lessHistoryKeyWordList: Ref<HistoryKeyWordTypes[]> = ref([])
  public static isShowMoreHistory: Ref<boolean> = ref(false)
  public static isSearchContentOpen: Ref<boolean> = ref(false)

  private constructor() {}

  public static previousPage() {
    router.back()
  }

  public static toSearchPage() {
    router.push({
      name: 'search',
    })
  }
  // 防抖，節省伺服器請求量
  public static getHistoryAndKeyWords = debounce(async () => {
    const keyword = SearchService.getKeywordFromStore()
    if (keyword !== '') {
      await SearchService.searchStore.findKeyWords(keyword)
      await SearchService.searchStore.findHistoryKeyWords(keyword)
      SearchService.openOrCloseAutoHistoryComplete(false)
    }
  }, 320)

  // 按下鍵盤後觸發
  public static async resetKeywords() {
    SearchService.openOrCloseAutoComplete(true)
    // 關閉 "顯示更多"
    SearchService.showOrFadeHistory(false)
    // 發起請求
    SearchService.getHistoryAndKeyWords()
  }

  // 點擊搜索框觸發
  public static async isOpenSearchKeyWords() {
    await SearchService.findAllHistoryKeyWords()
    const keyword = SearchService.getKeywordFromStore()

    if (keyword === initKeywordValue) {
      // 清除默認文字
      SearchService.searchStore.storeKeyword()

      SearchService.openOrCloseAutoComplete(false)
      SearchService.openOrCloseAutoHistoryComplete(true)
    } else if (keyword !== '') {
      await SearchService.searchStore.findKeyWords(keyword)
      await SearchService.searchStore.findHistoryKeyWords(keyword)
      SearchService.openOrCloseAutoComplete(true)
      SearchService.openOrCloseAutoHistoryComplete(false)
    }
  }

  // 離開搜索框觸發
  public static isCloseSearchKeyWords() {
    // 延遲捕獲 isShowMoreHistory 是否有改變
    // 確保點擊 "顯示更多" 後，歷史紀錄依然保留
    setTimeout(() => {
      const keyword = SearchService.getKeywordFromStore()
      if (SearchService.isShowMoreHistory.value === false) {
        if (!keyword) {
          SearchService.searchStore.storeKeyword(initKeywordValue)
        }
        SearchService.openOrCloseAutoComplete(false)
        SearchService.showOrFadeHistory(false)
        SearchService.openOrCloseAutoHistoryComplete(false)
      } else if (keyword === '') {
        SearchService.searchStore.storeKeyword()
      } else {
        SearchService.openOrCloseAutoComplete(false)
        SearchService.openOrCloseAutoHistoryComplete(false)
      }
    }, 20)
  }

  public static async findBookItemListByKeyWord(keyWord: string) {
    if (keyWord === initKeywordValue || keyWord === '') {
      return
    }
    await SearchService.searchStore.findBookItemListByKeyWord(keyWord)
    SearchService.handleSearchContentOpen()
    SearchService.openOrCloseAutoComplete(false)
    SearchService.openOrCloseAutoHistoryComplete(false)
    // 將 keyWord 保存於當前搜索框內的關鍵字
    SearchService.searchStore.storeKeyword(keyWord)
    // 添加該關鍵字於歷史紀錄中 Or 增加歷史點擊次數
    await SearchService.searchStore.addOrPutHistoryKeyWord(keyWord)
  }

  public static async leaveShowMoreHistoryKeyWord() {
    if (SearchService.isShowMoreHistory.value === true) {
      SearchService.searchStore.storeKeyword(initKeywordValue)
      SearchService.showOrFadeHistory(false)
      SearchService.openOrCloseAutoHistoryComplete(false)
    }
  }

  public static async showMoreHistory() {
    SearchService.showOrFadeHistory(true)
  }

  public static handleSearchContentOpen() {
    SearchService.isSearchContentOpen.value = !SearchService.isSearchContentOpen.value
  }

  public static async delAllHistoryKeyWord() {
    await SearchService.searchStore.delAllHistoryKeyWord()
    // 第一時間手動清空(無須等下次請求)，有較為直觀的用戶顯示
    SearchService.searchStoreRefs.allHistoryKeyWordList.value = []
    SearchService.lessHistoryKeyWordList.value = []
  }

  private static async findAllHistoryKeyWords() {
    await SearchService.searchStore.findAllHistoryKeyWords()
    SearchService.lessHistoryKeyWordList.value =
      SearchService.searchStore.allHistoryKeyWordList.slice(0, 3)
  }

  private static openOrCloseAutoComplete(flag: boolean) {
    SearchService.isOpenAutoContainer.value = flag
  }

  private static openOrCloseAutoHistoryComplete(flag: boolean) {
    SearchService.isOpenAutoHistoryContainer.value = flag
  }

  private static showOrFadeHistory(flag: boolean) {
    SearchService.isShowMoreHistory.value = flag
  }

  private static getKeywordFromStore() {
    return SearchService.searchStore.curKeyWord
  }
}
