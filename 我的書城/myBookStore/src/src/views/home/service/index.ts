/**
 * @brief
 *  home 首頁的功能模塊
 * @data
 *  2023/5
 */
import router from '@/router'
import { useBookItemsStore } from '@/store/bookItems/index'
import { storeToRefs } from 'pinia'
import { BookItemListTypes } from '@/store/state'
import { Ref, ref } from 'vue'
import { useSearchStore } from '@/store/search'

class HomeService {
  public static bookItemsStore = useBookItemsStore()
  public static bookItemsStoreRefs = storeToRefs(HomeService.bookItemsStore)
  public static searchStore = useSearchStore()
  public static searchStoreRefs = storeToRefs(HomeService.searchStore)
  public static recommendBookList: Ref<BookItemListTypes[]> = ref([])
  public static guessBookList: Ref<BookItemListTypes[]> = ref([])

  private constructor() {}

  public static toHomePage() {
    router.push({ name: 'home' })
  }

  public static async getRecommendBookList(num: number) {
    // 清空緩存
    HomeService.recommendBookList.value = []
    const result: BookItemListTypes[] = []

    const randomArray = HomeService.getRandomIntArray(30, num)

    for (const thirdCategoryId of randomArray) {
      const bookList = await HomeService.bookItemsStore.findBookItemListByThirdCategoryId(
        thirdCategoryId + 1
      )
      // 只取有上架的書籍
      if (bookList.length !== 0) {
        result.push(HomeService.getOneFromBookList(bookList))
      }
    }
    HomeService.recommendBookList.value.push(...result)
  }

  public static async getGuessBookList(num: number) {
    HomeService.guessBookList.value = []
    const result: BookItemListTypes[] = []

    await HomeService.searchStore.findAllHistoryKeyWords()
    const historyKeyWordLength = HomeService.searchStoreRefs.allHistoryKeyWordList.value.length
    const allHistoryKeyWords = HomeService.searchStoreRefs.allHistoryKeyWordList.value

    num = num > historyKeyWordLength ? historyKeyWordLength : num
    if (num !== 0) {
      const randomArray = HomeService.getRandomIntArray(historyKeyWordLength, num)
      for (const keyWord of randomArray) {
        const bookList = await HomeService.searchStore.findBookItemListByHistoryKeyWord(
          allHistoryKeyWords[keyWord].historyKeyWord
        )
        if (bookList.length !== 0) {
          result.push(HomeService.getOneFromBookList(bookList))
        }
      }
      HomeService.guessBookList.value.push(...result)
    }
  }

  // 獲取指定數量的隨機值
  // 若該 max > times (最大值大於獲取數量)，不會有重複值
  // 若該 max < times (最大值少於獲取數量)，會有重複值
  private static getRandomIntArray(max: number, times: number = 1): number[] {
    if (max < times) {
      const randomArray: number[] = []

      for (let i = 0; i < times; i++) {
        randomArray.push(Math.floor(Math.random() * max))
      }

      return randomArray
    } else {
      const randomArray: Set<number> = new Set()
      let randomNum = Math.floor(Math.random() * max)

      for (let i = 0; i < times; i++) {
        while (randomArray.has(randomNum)) {
          randomNum = Math.floor(Math.random() * max)
        }
        randomArray.add(randomNum)
      }
      return [...randomArray]
    }
  }

  private static getOneFromBookList(bookList: BookItemListTypes[]) {
    const randomBookListIdx = HomeService.getRandomIntArray(bookList.length)[0]
    // 防止越界
    return bookList[randomBookListIdx]
  }
}

export default HomeService
