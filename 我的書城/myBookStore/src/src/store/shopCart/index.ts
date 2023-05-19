/**
 * @brief
 *  儲存購物車資訊
 * @data
 *  2023/4
 */
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage from 'good-storage'
import { ShopCartTypes } from '../state'
import ShopCartApi from '@/api/ShopCartApi'
import { BookItemListTypes } from '@/store/state'
import { Ref, ref } from 'vue'

export const useShopCartStore = defineStore('shopCart', {
  state: () => {
    const curUserShopCartList: ShopCartTypes[] = []
    const curShopCartMapping: Map<string, number> = new Map()
    return {
      curUserShopCartList,
      curShopCartMapping,
    }
  },
  getters: {},
  actions: {
    async findCurUserShopCartList(userId: number) {
      const result: AxiosResponse<ShopCartTypes[]> = await ShopCartApi.getCurUserShopCartList(
        userId
      )
      this.curUserShopCartList = result.data
      this.curUserShopCartList.forEach((item) => {
        if (item.shopCartId !== undefined) {
          this.curShopCartMapping.set(item.bookISBN, item.shopCartId)
        }
      })
    },

    async addWishlistToShopCart(ShopCartList: ShopCartTypes) {
      const shopCartList: ShopCartTypes = (
        await ShopCartApi.addWishlistToShopCartList(ShopCartList)
      ).data

      if (
        !this.curShopCartMapping.has(shopCartList.bookISBN) &&
        shopCartList.shopCartId !== undefined
      ) {
        this.curUserShopCartList.push(shopCartList)
        this.curShopCartMapping.set(shopCartList.bookISBN, shopCartList.shopCartId)
      }

      return shopCartList
    },

    async delWishlistToShopCartList(bookISBN: string) {
      const isSuccess: boolean = (await ShopCartApi.delWishlistToShopCartList(bookISBN)).data

      if (this.curShopCartMapping.has(bookISBN)) {
        // 刪除 curUserShopCartList 中指定的數據
        const newShopCartList: ShopCartTypes[] = []
        for (const item of this.curUserShopCartList) {
          if (item.bookISBN !== bookISBN) {
            newShopCartList.push(item)
          }
        }
        this.curUserShopCartList = newShopCartList
        this.curShopCartMapping.delete(bookISBN)
      }
      return isSuccess
    },

    async putWishlistToShopCartList(ShopCartList: ShopCartTypes) {
      const isSuccess: any = (await ShopCartApi.putWishlistToShopCartList(ShopCartList)).data
      return isSuccess
    },
  },
})
