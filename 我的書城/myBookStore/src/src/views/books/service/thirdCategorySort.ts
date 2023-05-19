/**
 * @brief
 *  操作三級分類的特定功能
 * @data
 *  2023/4
 */
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store/category'
import router from '@/router'
import bookItemsService from '@/store/bookItems/service/index'
import SliderBlock from '../service/sliderBlock'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { strToIntNum } from '@/utils/tools'

export default class ThirdCategorySort {
  public static categoryStore = useCategoryStore()
  public static categoryStoreRefs = storeToRefs(ThirdCategorySort.categoryStore)
  private constructor() {}

  public static async jumpThirdCategory(
    route: RouteLocationNormalizedLoaded,
    sliderBlock: SliderBlock,
    sliderItemIndex: number,
    thirdCategoryId: number
  ) {
    // 先移動滑塊位置
    sliderBlock.onItemClick(sliderItemIndex)
    // 等待請求的書本列表返回
    await bookItemsService.findBookItemList(thirdCategoryId)
    const secondCategoryId = strToIntNum(route.query.S_CATE as string)
    router.push({
      name: 'books',
      query: {
        S_CATE: secondCategoryId,
        T_CATE: thirdCategoryId,
        SL_IDX: sliderItemIndex,
      },
    })
  }

  public static toCategoryPage() {
    router.push({
      name: 'category',
    })
  }
}
