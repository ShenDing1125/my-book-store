/**
 * @brief
 *  shopCart 登入後狀態，以及購物車狀態顯示
 *
 *  備註: 沒有開發 "結帳" 模塊
 * @data
 *  2023/4
 */
import { ref, Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useShopCartStore } from '@/store/shopCart'
import { BookItemListTypes, ShopCartTypes } from '@/store/state'
import storage from 'good-storage'
import router from '@/router'
import isEmpty from '@/utils/isEmpty'
import { GoodStorageData } from '@/constants'

const { TOKEN } = GoodStorageData

export default class ShopCartService {
  public static shopCartStore = useShopCartStore()
  public static shopCartRefs = storeToRefs(ShopCartService.shopCartStore)
  public static totalDiscountPrice: Ref<number> = ref(0)
  public static isShopCartListOpen: Ref<boolean> = ref(false)
  public static showButtonInfo: Ref<number> = ref(0)
  public static curPurchaseQuantity: Ref<number> = ref(0)

  private constructor() {}

  public static async getShopCartPageInfo() {
    if (storage.get(TOKEN)) {
      if (isEmpty(ShopCartService.shopCartRefs.curUserShopCartList.value)) {
        await ShopCartService.findCurUserShopCartList()
        ShopCartService.calShopCartInfo()
      } else {
        ShopCartService.calShopCartInfo()
      }

      ShopCartService.changeShopCartButtonInfo(1)
    } else {
      ShopCartService.changeShopCartButtonInfo(0)
    }
  }

  public static async toShopCartListPage() {
    if (storage.get(TOKEN)) {
      await ShopCartService.findCurUserShopCartList()
      ShopCartService.handleShopCartOpen(true)
    } else {
      router.push({ name: 'login' })
    }
  }

  public static async findCurUserShopCartList() {
    await ShopCartService.shopCartStore.findCurUserShopCartList(1)
  }

  public static isClickShopCartIcon(bookISBN: string) {
    return ShopCartService.shopCartStore.curShopCartMapping.has(bookISBN)
  }

  // 先判斷是否已登入
  public static async switchWishlistToShopCart(bookItemList: BookItemListTypes) {
    if (storage.get('token')) {
      const shopCartList = ShopCartService.bookItemToShopCartList(bookItemList)

      if (ShopCartService.shopCartStore.curShopCartMapping.has(bookItemList.ISBN)) {
        await ShopCartService.shopCartStore.delWishlistToShopCartList(bookItemList.ISBN)
      } else {
        await ShopCartService.shopCartStore.addWishlistToShopCart(shopCartList)
      }

      ShopCartService.calShopCartInfo()
    } else {
      router.push('/login')
    }
  }

  private static bookItemToShopCartList(bookItemList: BookItemListTypes): ShopCartTypes {
    const shopCartList: ShopCartTypes = {
      bookISBN: bookItemList.ISBN,
      bookName: bookItemList.bookName,
      bookPicName: bookItemList.bookPicName,
      originalPrice: bookItemList.originalPrice,
      discount: bookItemList.discount,
      purchaseQuantity: 1,
    }
    return shopCartList
  }

  public static calShopCartInfo() {
    ShopCartService.calTotalPrice()
    ShopCartService.calCurPurchaseQuantity()
  }

  public static calTotalPrice() {
    ShopCartService.totalDiscountPrice.value =
      ShopCartService.shopCartRefs.curUserShopCartList.value.reduce((accumulator, currentValue) => {
        return (
          accumulator +
          Math.floor(
            currentValue.originalPrice * currentValue.discount * 0.1 * currentValue.purchaseQuantity
          )
        )
      }, 0)
  }

  public static async updatePurchase(ShopCartList: ShopCartTypes, method: 'add' | 'del') {
    if (method === 'add') {
      ShopCartList.purchaseQuantity += 1
    } else {
      ShopCartList.purchaseQuantity -= 1
    }

    if (ShopCartList.purchaseQuantity === 0) {
      await ShopCartService.shopCartStore.delWishlistToShopCartList(ShopCartList.bookISBN)
    } else {
      await ShopCartService.shopCartStore.putWishlistToShopCartList(ShopCartList)
    }

    ShopCartService.calShopCartInfo()
  }

  public static handleShopCartOpen(flag: boolean) {
    ShopCartService.isShopCartListOpen.value = flag
  }

  public static calCurPurchaseQuantity() {
    ShopCartService.curPurchaseQuantity.value =
      ShopCartService.shopCartRefs.curUserShopCartList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.purchaseQuantity
      }, 0)
  }

  public static changeShopCartButtonInfo(state: 0 | 1) {
    ShopCartService.showButtonInfo.value = state
  }

  /**
   * showButtonInfo
   * 0: 登入 (帳戶未登入)
   * 1: 購物車 (帳號已登入)
   */
  public static async switchButtonInfo() {
    switch (ShopCartService.showButtonInfo.value) {
      case 0:
        router.push({ name: 'login' })
        break
      case 1:
        await ShopCartService.getShopCartPageInfo()
        ShopCartService.isShopCartListOpen.value = true
        break
      default:
        break
    }
  }
}
