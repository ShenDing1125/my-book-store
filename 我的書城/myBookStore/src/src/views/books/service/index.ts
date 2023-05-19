/**
 * @brief
 *  books 頁面數據請求的方法
 * @data
 *  2023/4
 */
import { strToIntNum } from '@/utils/tools'
import CategoryService from '@/views/category/service'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import SliderBlock from './sliderBlock'
import bookItemsService from '@/store/bookItems/service'
import ShopCart from '@/views/shopCart/service'
import { useCategoryStore } from '@/store/category'
import { storeToRefs } from 'pinia'
import router from '@/router'

class BookService {
  public static categoryStore = useCategoryStore()
  public static categoryStoreRefs = storeToRefs(BookService.categoryStore)
  private constructor() {}

  private static getQueryInfo(route: RouteLocationNormalizedLoaded) {
    return {
      secondCategoryId: strToIntNum(route.query.S_CATE as string),
      thirdCategoryId: strToIntNum(route.query.T_CATE as string),
      sliderItemIndex: strToIntNum(route.query.SL_IDX as string),
    }
  }

  public static toBookItemListPage(
    secondCategoryId: number,
    thirdCategoryId: number,
    itemIndex: number
  ) {
    router.push({
      name: 'books',
      query: {
        S_CATE: secondCategoryId,
        T_CATE: thirdCategoryId,
        SL_IDX: itemIndex,
      },
    })
  }

  public static async getThirdCategorySortPageInfo(
    route: RouteLocationNormalizedLoaded,
    sliderBlock: SliderBlock
  ) {
    const { secondCategoryId, sliderItemIndex } = BookService.getQueryInfo(route)

    // 判斷 ThirdCategoryLists 緩存是否被清空
    if (
      BookService.categoryStoreRefs.getThirdCategoryLists.value === undefined &&
      sliderItemIndex === 0
    ) {
      await CategoryService.getAndResetThirdCategory(secondCategoryId)

      // 因 "全部" 類別的圖書列表，是將所有個類別的書彙總起來
      // 所以清空緩存，會造成圖書列表空白的情況，這裡就得等響應後重發 "全部" 的類別請求
      await bookItemsService.findBookItemList(sliderItemIndex)
    } else {
      await CategoryService.getAndResetThirdCategory(secondCategoryId)
    }

    // 創建滑塊
    // 備註:
    //   將滑塊創建寫在這裡，是因為三級類別請求後，有做額外更動(須等更動完成，再創建滑塊)
    //   ，以致需要考量生成順序，否則會產生初始滑塊消失
    sliderBlock.create('rem', 'X', 540, 100)
    // 獲取 query 上的 sliderItemIndex，使滑塊移動到該位置
    sliderBlock.setAutoSliderBlockSizeByIndex(sliderItemIndex)
  }

  public static async getBookListPageInfo(route: RouteLocationNormalizedLoaded) {
    const { thirdCategoryId } = BookService.getQueryInfo(route)
    await bookItemsService.findBookItemList(thirdCategoryId)
  }
}

export default BookService
