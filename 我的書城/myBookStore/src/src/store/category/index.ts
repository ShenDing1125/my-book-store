/**
 * @brief
 *  儲存類別資訊
 * @data
 *  2023/4
 */
import { defineStore } from 'pinia'
import categoryApi from '@/api/CategoryApi'
import { FirstCategoryTypes, SecThrCategoryTypes, ThirdCategoryTypes } from '@/store/state'
import { AxiosResponse } from 'axios'
import goodStorage from 'good-storage'
import isEmpty from '@/utils/isEmpty'
import { GoodStorageData } from '@/constants'

const { THIRD_CATEGORY_LISTS } = GoodStorageData

export const useCategoryStore = defineStore('category', {
  state: () => {
    let firstCategoryList!: FirstCategoryTypes[]
    // let secThrCategoryListByFirId!: SecThrCategoryTypes[] // 靠點擊獲取二三級分類(分類多的情況下)
    let allSecThrCategoryLists!: SecThrCategoryTypes[] // 儲存所有二三級分類(分類少的情況下，減少請求)
    let thirdCategoryLists!: ThirdCategoryTypes[]
    let bookItemThirdCategoryId!: number // 三級類別的圖書 ID

    return {
      firstCategoryList,
      allSecThrCategoryLists,
      thirdCategoryLists,
      bookItemThirdCategoryId,
    }
  },
  // 緩存 "較無變動性的數據" 於本地瀏覽器
  getters: {
    getThirdCategoryLists(state): ThirdCategoryTypes[] {
      return isEmpty(state.thirdCategoryLists)
        ? goodStorage.get(THIRD_CATEGORY_LISTS)
        : state.thirdCategoryLists
    },
  },
  actions: {
    async findFirstCategoryList() {
      const result: AxiosResponse<FirstCategoryTypes[]> = await categoryApi.getFirstCategoryList()
      this.firstCategoryList = result.data
    },

    async findSecThrCategoryLists() {
      const result: AxiosResponse<SecThrCategoryTypes[]> =
        await categoryApi.getSecThrCategoryLists()
      this.allSecThrCategoryLists = result.data
    },

    async findThirdCategoryBySecondCategory(SecondCategoryId: number) {
      const result: AxiosResponse<ThirdCategoryTypes[]> =
        await categoryApi.getThirdCategoryBySecondCategoryId(SecondCategoryId)

      return result.data
    },
  },
})
