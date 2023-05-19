/**
 * @brief
 *  儲存書本列表資訊
 * @data
 *  2023/4
 */
import { defineStore } from 'pinia'
import BookItemsApi from '@/api/BookItemsApi'
import { AxiosResponse } from 'axios'
import { BookItemListTypes } from '../state'
import { Ref, ref } from 'vue'

export const useBookItemsStore = defineStore('bookItems', {
  state: () => {
    const bookItemList: BookItemListTypes[] = []
    const isProductsComingSoon: Ref<boolean> = ref(true)

    return {
      bookItemList,
      isProductsComingSoon,
    }
  },
  getters: {
    getIsProductsComingSoon(state) {
      return (state.isProductsComingSoon = state.bookItemList.length === 0 ? true : false)
    },
  },
  actions: {
    async findBookItemListByThirdCategoryId(thirdCategoryId: number) {
      const result: AxiosResponse<BookItemListTypes[]> = await BookItemsApi.getBookItems(
        thirdCategoryId
      )
      this.isProductsComingSoon = false

      return result.data
    },
  },
})
