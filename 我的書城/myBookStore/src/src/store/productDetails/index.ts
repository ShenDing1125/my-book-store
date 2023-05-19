/**
 * @brief
 *  儲存商品詳情
 * @data
 *  2023/4
 */
import { defineStore } from 'pinia'
import { BookItemListTypes } from '../state'
import ProductDetailsApi from '@/api/ProductDetailsApi'
import { AxiosResponse } from 'axios'

export const useProductDetailsStore = defineStore('productDetails', {
  state: () => {
    let bookItem!: BookItemListTypes
    return {
      bookItem,
    }
  },
  getters: {},
  actions: {
    async findBooKItemByISBN(ISBN: string) {
      const result: AxiosResponse<BookItemListTypes[]> = await ProductDetailsApi.findBooKItemByISBN(
        ISBN
      )
      this.bookItem = result.data[0]
    },
  },
})
