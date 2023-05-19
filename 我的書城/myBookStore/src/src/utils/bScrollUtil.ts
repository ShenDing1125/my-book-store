/**
 * @brief
 *  對 Better-Scroll 進行二次封裝
 *   -提供簡易的使用方法
 *   -支持 同步 / 異步
 *   -支持 HTML元素 / Class元素
 * @data
 *  2023/4
 */
import { onMounted, ref, Ref, nextTick, onUpdated, onBeforeUnmount } from 'vue'
import BScroll from '@better-scroll/core'
import { Options } from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import MouseWheel from '@better-scroll/mouse-wheel'
import NestedScroll from '@better-scroll/nested-scroll'
import ScrollBar from '@better-scroll/scroll-bar'
import PullUp from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import Slide from '@better-scroll/slide'

const DEF_OPTIONS = {
  scrollX: true,
  scrollY: true,
  mouseWheel: {
    speed: 20,
    invert: false,
    easeTime: 300,
  },
}

class BScrollUtil {
  public static bScrollUtil: BScrollUtil = new BScrollUtil()
  private constructor() {
    this.initRegister()
  }

  private initRegister() {
    // 註冊 BScroll 組件
    BScroll.use(MouseWheel) // 鼠標滾輪的能力
    BScroll.use(NestedScroll) // 支持多層嵌套
    BScroll.use(ScrollBar) // 提供了樣式美觀的滾動條
    BScroll.use(PullUp) // 擴展上拉加載的能力
    // 官網所提供以下的庫類型，在TS的判斷上有問題，所以暫時先用 any 來轉譯
    BScroll.use(PullDown as any) // 擴展下拉加載的能力
    BScroll.use(Slide as any) // 輪播圖
  }

  private create(elementParam: string, option: Options, isAsyncData: boolean): BScrollConstructor
  private create(
    elementParam: Ref<HTMLElement | undefined>,
    option: Options,
    isAsyncData: boolean
  ): BScrollConstructor
  private create(elementParam: any, option: any, isAsyncData: any): any {
    const bsRef: Ref<BScrollConstructor | Promise<BScrollConstructor> | undefined> = ref()
    if (isAsyncData) {
      bsRef.value = this.asyncCreate(elementParam, option)
      this.refresh(bsRef)
    } else {
      onMounted(() => {
        bsRef.value = this.__(elementParam, option)
      })
    }
    this.unregister(bsRef)
    return bsRef.value
  }

  private __(elementParam: Ref<HTMLElement | undefined> | string, option: Options) {
    if (typeof elementParam === 'string') {
      return new BScroll(elementParam, option)
    } else if (elementParam.value !== undefined) {
      return new BScroll(elementParam.value, option)
    } else {
      const errorMessage = 'ref<HTMLElement | undefined> is undefined!'
      throw new Error(errorMessage)
    }
  }

  private async asyncCreate(elementParam: Ref<HTMLElement | undefined> | string, option: Options) {
    await nextTick()
    return this.__(elementParam, option)
  }

  private refresh(bsRef: Ref<BScrollConstructor | Promise<BScrollConstructor> | undefined>) {
    onUpdated(() => {
      if (bsRef.value !== undefined) {
        if (bsRef.value instanceof Promise) {
          bsRef.value.then((resolve) => {
            resolve.refresh()
          })
        } else {
          bsRef.value.refresh()
        }
      }
    })
  }

  private unregister(bsRef: Ref<BScrollConstructor | Promise<BScrollConstructor> | undefined>) {
    onBeforeUnmount(() => {
      if (bsRef.value !== undefined) {
        if (bsRef.value instanceof Promise) {
          bsRef.value.then((resolve) => {
            resolve.destroy()
          })
        } else {
          bsRef.value.destroy()
        }
      }
    })
  }

  private isNameOrIdFromClass(NameOrId: string) {
    const regex = /^[\.#]{1}/
    return regex.test(NameOrId)
  }

  public createByNameOrIdFromClass(
    NameOrId: string,
    option: Options = DEF_OPTIONS
  ): BScrollConstructor {
    if (this.isNameOrIdFromClass(NameOrId)) {
      return this.create(NameOrId, option, false)
    } else {
      const errorMessage = `createByNameOrIdFromClass(Fn): missing symbols '.' or '#' !-> ${NameOrId}`
      throw new Error(errorMessage)
    }
  }

  public async asyncCreateByNameOrIdFromClass(
    NameOrId: string,
    option: Options = DEF_OPTIONS
  ): Promise<BScrollConstructor> {
    if (this.isNameOrIdFromClass(NameOrId)) {
      return this.create(NameOrId, option, true)
    } else {
      const errorMessage = `asyncCreateByNameOrIdFromClass(Fn): missing symbols '.' or '#' !-> ${NameOrId}`
      throw new Error(errorMessage)
    }
  }

  public createByHTMLElement(
    htmlEle: Ref<HTMLElement | undefined>,
    option: Options = DEF_OPTIONS
  ): BScrollConstructor {
    return this.create(htmlEle, option, false)
  }

  public async asyncCreateByHTMLElement(
    htmlEle: Ref<HTMLElement | undefined>,
    option: Options = DEF_OPTIONS
  ): Promise<BScrollConstructor> {
    return this.create(htmlEle, option, true)
  }
}

export default BScrollUtil.bScrollUtil
