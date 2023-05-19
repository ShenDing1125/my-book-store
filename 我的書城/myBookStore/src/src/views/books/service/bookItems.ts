/**
 * @brief
 *  操作圖書列表的特定功能
 * @data
 */
import { useBookItemsStore } from '@/store/bookItems'
import { storeToRefs } from 'pinia'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import { Ref, ref, watch } from 'vue'
import { pullingDownDummyData, pullingUpDummyData } from '@/constants'

export default class BookItems {
  public static bookItemsStore = useBookItemsStore()
  public static bookItemRefs = storeToRefs(BookItems.bookItemsStore)
  public static isDelayDisplayProductsComingSoon: Ref<boolean> = ref(false)
  private constructor() {}

  public static calPrice(originalPrice: number, discount: number, purchase: number = 1) {
    return Math.floor(originalPrice * discount * 0.1 * purchase)
  }

  public static bsPullingDown(
    bs: Promise<BScrollConstructor> | BScrollConstructor,
    beforePullDown: Ref<boolean>,
    isPullingDown: Ref<boolean>
  ) {
    if (bs instanceof Promise) {
      bs.then((res) => {
        BookItems.pullingDownHandler(res, beforePullDown, isPullingDown)
      })
    } else {
      BookItems.pullingDownHandler(bs, beforePullDown, isPullingDown)
    }
  }

  private static pullingDownHandler(
    bs: BScrollConstructor,
    beforePullDown: Ref<boolean>,
    isPullingDown: Ref<boolean>
  ) {
    bs.on('pullingDown', async () => {
      beforePullDown.value = false
      isPullingDown.value = true
      //------------------------------------------
      // 僅載入偽數據，此處則不進行需求重發
      setTimeout(() => {
        BookItems.bookItemsStore.bookItemList.unshift(pullingDownDummyData)
      }, 200)
      setTimeout(() => {
        isPullingDown.value = false
      }, 250)
      setTimeout(() => {
        bs.finishPullDown()
      }, 500)
      setTimeout(() => {
        beforePullDown.value = true
        bs.refresh()
      }, 660)
      //------------------------------------------
    })
  }

  public static bsPullingUp(
    bs: Promise<BScrollConstructor> | BScrollConstructor,
    isPullUpLoad: Ref<boolean>,
    scrollY: Ref<number>,
    contentRef: Ref<HTMLElement | undefined>
  ) {
    if (bs instanceof Promise) {
      bs.then((res) => {
        BookItems.pullingUpHandler(res, isPullUpLoad, scrollY, contentRef)
      })
    } else {
      BookItems.pullingUpHandler(bs, isPullUpLoad, scrollY, contentRef)
    }
  }

  private static pullingUpHandler(
    bs: BScrollConstructor,
    isPullUpLoad: Ref<boolean>,
    scrollY: Ref<number>,
    contentRef: Ref<HTMLElement | undefined>
  ) {
    bs.on('scroll', (pos: any) => {
      scrollY.value = pos.y
    })

    let height: number = 0
    if (contentRef.value !== undefined) {
      height = contentRef.value.getBoundingClientRect().height
    }
    //------------------------------------------
    // 載入偽數據
    let isFinish: boolean = true
    bs.on('pullingUp', async () => {
      if (Math.abs(scrollY.value) > height && isFinish) {
        isFinish = false
        isPullUpLoad.value = true

        setTimeout(() => {
          BookItems.bookItemsStore.bookItemList.push(pullingUpDummyData)
        }, 450)
        setTimeout(() => {
          bs.finishPullUp()
        }, 500)
        setTimeout(() => {
          isPullUpLoad.value = false
          bs.refresh()
          isFinish = true
        }, 660)
      } else {
        bs.finishPullUp()
        isFinish = true
      }
      //------------------------------------------
    })
  }

  // 防止當 bookItemList 初始值為空等待數據加載時
  // products-ComingSoon 會閃爍顯示一下，所以這裡用延遲來確保不會閃爍
  public static delayDisplayProductsComingSoon() {
    watch(BookItems.bookItemRefs.isProductsComingSoon, () => {
      setTimeout(() => {
        BookItems.isDelayDisplayProductsComingSoon.value =
          BookItems.bookItemRefs.getIsProductsComingSoon.value
      }, 35)
    })
  }
}
