/**
 * @brief
 *  productDetails 頁面的操作功能以及數據請求方法
 * @data
 *  2023/4
 */
import { useProductDetailsStore } from '@/store/productDetails'
import { storeToRefs } from 'pinia'
import router from '@/router'
import ShopCart from '@/views/shopCart/service'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { strToIntNum } from '@/utils/tools'

class ProductDetailsService {
  public static productDetailsStore = useProductDetailsStore()
  public static productDetailsStoreRefs = storeToRefs(ProductDetailsService.productDetailsStore)
  private constructor() {}

  public static async getProductDetailsPageInfo(route: RouteLocationNormalizedLoaded) {
    const ISBN = route.query.ISBN as string
    await ProductDetailsService.productDetailsStore.findBooKItemByISBN(ISBN)
  }

  public static previousPage() {
    router.back()
  }

  public static async toProductDetails(ISBN: string) {
    ShopCart.handleShopCartOpen(false)
    // await productDetailsService.findBooKItemByISBN(ISBN)

    router.push({
      name: 'productDetails',
      query: {
        ISBN,
      },
    })
  }
}

export default ProductDetailsService
