/**
 * @brief
 *  對書本列表資訊進行額外的功能擴展
 * @data
 *  2023/4
 */
import { useCategoryStore } from '../../category/index'
import { useBookItemsStore } from '../index'
import { storeToRefs } from 'pinia'

const categoryStore = useCategoryStore()
const { getThirdCategoryLists } = storeToRefs(categoryStore)

class BookItemsService {
  public static bookItemsService: BookItemsService = new BookItemsService()
  public bookItemsStore = useBookItemsStore()
  public bookItemsStoreRefs = storeToRefs(this.bookItemsStore)
  private constructor() {}

  public async findBookItemList(thirdCategoryId: number) {
    // 0 表示為 '全部' 類別
    if (thirdCategoryId !== 0) {
      this.cleanBookItemList()
      const result = await this.bookItemsStore.findBookItemListByThirdCategoryId(thirdCategoryId)
      this.bookItemsStoreRefs.bookItemList.value = result
    } else {
      this.cleanBookItemList()

      await this.findAllThirdCategoryLists()
    }
  }

  private cleanBookItemList() {
    this.bookItemsStoreRefs.bookItemList.value = []
  }

  // 查詢三級所有書籍方法
  private async findAllThirdCategoryLists() {
    if (getThirdCategoryLists.value !== undefined) {
      const minThirdCategoryId: number = getThirdCategoryLists.value[1].thirdCategoryId
      const maxThirdCategoryId: number =
        getThirdCategoryLists.value[getThirdCategoryLists.value.length - 1].thirdCategoryId

      for (let i = minThirdCategoryId; i <= maxThirdCategoryId; i++) {
        const result = await this.bookItemsStore.findBookItemListByThirdCategoryId(i)
        this.bookItemsStoreRefs.bookItemList.value.push(...result)
      }
    }
  }
}

export default BookItemsService.bookItemsService
