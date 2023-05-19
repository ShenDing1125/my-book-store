/**
 * @brief
 *  滑塊:
 *   -可以創建 X 或 Y 軸的滑塊
 *   -可以選擇像素單位( 'px'、'rem' )
 *   -其他功能
 * @data
 *  2023/4
 *  2023/5
 *    -新增初始滑塊自動居中的功能
 */
import { ref, Ref, watch } from 'vue'
import { SCREEN_SIZE } from '@/constants'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

type directionType = 'X' | 'Y'
type distanceUnitType = 'px' | 'rem'
type scrollObjType = BScrollConstructor | Promise<BScrollConstructor>

export default class SliderBlock {
  private sliderItemRef!: Ref<HTMLElement | undefined> // 元素
  private sliderContainer!: Ref<HTMLElement | undefined> // 放置元素的容器
  private scrollObj!: scrollObjType // BScroll物件
  public itemRefsArray!: HTMLElement[] // 滑動區域的所有元素
  public currentCategoryIndex!: Ref<number> // 當前索引直
  public chooseDirection!: directionType // 偏移方向
  public endScrollX!: Ref<number> // 在 X軸 上滾動結束時的距離
  public endScrollY!: Ref<number> // 在 Y軸 上滾動結束時的距離
  public unit!: distanceUnitType // 單位
  public proportionalValue!: number // 與原設計的螢幕寬度的相對比例 -> (screenSize / window.innerWidth)
  public screenSize!: number // 定義的螢幕寬度
  public remToPixelFixedRate!: number // 定義的寬度比 例: 100px = 18.518vw

  public constructor(
    _sliderItemRef: Ref<HTMLElement | undefined>,
    _sliderContainer: Ref<HTMLElement | undefined>,
    _itemRefsArray: HTMLElement[],
    _scrollObj: scrollObjType
  ) {
    this.sliderItemRef = _sliderItemRef
    this.sliderContainer = _sliderContainer
    this.scrollObj = _scrollObj
    this.itemRefsArray = _itemRefsArray
    this.currentCategoryIndex = ref(0)
    this.chooseDirection = 'X'
    this.unit = 'px'
    this.endScrollX = ref(0)
    this.endScrollY = ref(0)
    this.remToPixelFixedRate = 100
  }

  public create(
    distanceUnit: distanceUnitType = 'px',
    chooseDirection: directionType = 'X',
    screenSize: number = SCREEN_SIZE,
    remToPixelFixedRate: number = 100
  ) {
    this.registerBScrollEvent()
    this.storeDistanceInfo(distanceUnit, chooseDirection, screenSize, remToPixelFixedRate)
    this.setWatchCurrentCategoryIndex()
    this.setInitSliderBlockCenter()
  }

  // 更新點擊後的元素下標
  public async onItemClick(index: number) {
    this.currentCategoryIndex.value = index
  }

  // 滑動區域停止後，紀錄離瀏覽器多少的距離
  private registerBScrollEvent() {
    if (this.scrollObj instanceof Promise) {
      this.scrollObj.then((res) => {
        res.on('scrollEnd', (pos: any) => {
          this.endScrollX.value = pos?.x
          this.endScrollY.value = pos?.y
        })
      })
    } else {
      this.scrollObj.on('scrollEnd', (pos: any) => {
        this.endScrollX.value = pos?.x
        this.endScrollY.value = pos?.y
      })
    }
  }

  private storeDistanceInfo(
    distanceUnit: distanceUnitType = 'px',
    chooseDirection: directionType = 'X',
    screenSize: number = SCREEN_SIZE,
    remToPixelFixedRate: number = 100
  ) {
    this.chooseDirection = chooseDirection
    this.unit = distanceUnit
    this.screenSize = screenSize
    this.remToPixelFixedRate = remToPixelFixedRate
    this.calProportionalValue()
  }

  // 設定自動初始化滑動塊大小
  private setInitSliderBlockSize() {
    if (this.itemRefsArray[0] !== undefined) {
      const { width } = this.itemRefsArray[0].getBoundingClientRect()
      if (this.sliderItemRef.value !== undefined) {
        this.sliderItemRef.value.style.width =
          this.unit === 'px'
            ? `${width}${this.unit}`
            : `${(width / this.remToPixelFixedRate) * this.proportionalValue}${this.unit}`
      }
    }
  }

  public setAutoSliderBlockSizeByIndex(index: number) {
    if (index === 0) {
      this.setInitSliderBlockSize()
    } else {
      this.currentCategoryIndex.value = index
    }
  }

  private setWatchCurrentCategoryIndex() {
    if (this.chooseDirection === 'X') {
      this.setWatchCurrentCategoryIndexByX()
    } else {
      this.setWatchCurrentCategoryIndexByY()
    }
  }

  private setWatchCurrentCategoryIndexByX() {
    watch(this.currentCategoryIndex, (curIndex: number) => {
      const { itemRefLeft, itemRefWidth } = this.getItemRefFromSliderList(curIndex)

      const { fixeDistanceWidth } = this.getFixeDistanceWidthOrHeight()

      // 判斷元素單位後進行計算比率值
      // px:  拖動螢幕大小後會失真
      // rem: 拖動螢幕大小後不失真
      let translateX: number = this.calTranslateXorY(
        itemRefLeft,
        this.endScrollX.value,
        fixeDistanceWidth,
        this.proportionalValue
      )
      let width: number = this.calElementWidthOrHeight(itemRefWidth, this.proportionalValue)
      translateX = this.unit === 'px' ? translateX : translateX / this.remToPixelFixedRate
      width = this.unit === 'px' ? width : width / this.remToPixelFixedRate

      // 更改元素樣式
      if (this.sliderItemRef.value !== undefined) {
        this.sliderItemRef.value.style.translate = `${translateX}${this.unit} 0`
        this.sliderItemRef.value.style.width = `${width}${this.unit}`
      }
    })
  }

  private setWatchCurrentCategoryIndexByY() {
    watch(this.currentCategoryIndex, (curIndex: number) => {
      const { itemRefTop, itemRefHeight } = this.getItemRefFromSliderList(curIndex)

      const { fixeDistanceHeight } = this.getFixeDistanceWidthOrHeight()

      // 判斷元素單位後進行計算比率值
      // px:  拖動螢幕大小後會失真
      // rem: 拖動螢幕大小後不失真
      let translateY: number = this.calTranslateXorY(
        itemRefTop,
        this.endScrollY.value,
        fixeDistanceHeight,
        this.proportionalValue
      )
      let width: number = this.calElementWidthOrHeight(itemRefHeight, this.proportionalValue)
      translateY = this.unit === 'px' ? translateY : translateY / this.remToPixelFixedRate
      width = this.unit === 'px' ? width : width / this.remToPixelFixedRate

      // 更改元素樣式
      if (this.sliderItemRef.value !== undefined) {
        this.sliderItemRef.value.style.translate = `0 ${translateY}${this.unit}`
        this.sliderItemRef.value.style.width = `${width}${this.unit}`
      }
    })
  }

  private calProportionalValue() {
    this.proportionalValue = this.screenSize / window.innerWidth
  }

  // 獲取滾動列表中每個元素
  // 1. 與螢幕的距離
  // 2. 自身的大小
  private getItemRefFromSliderList(index: number) {
    let itemRefTop: number = 0
    let itemRefBottom: number = 0
    let itemRefRight: number = 0
    let itemRefLeft: number = 0
    let itemRefWidth: number = 0
    let itemRefHeight: number = 0
    if (this.itemRefsArray[index] !== undefined) {
      const { top, bottom, right, left, width, height } =
        this.itemRefsArray[index].getBoundingClientRect()

      itemRefTop = top
      itemRefBottom = bottom
      itemRefRight = right
      itemRefLeft = left
      itemRefWidth = width
      itemRefHeight = height
    }
    return { itemRefTop, itemRefBottom, itemRefRight, itemRefLeft, itemRefWidth, itemRefHeight }
  }

  // 獲取固定佔位元素的大小
  private getFixeDistanceWidthOrHeight() {
    let fixeDistanceWidth: number = 0
    let fixeDistanceHeight: number = 0
    if (this.sliderContainer.value !== undefined) {
      const { x, y } = this.sliderContainer.value?.getBoundingClientRect()
      fixeDistanceWidth = x
      fixeDistanceHeight = y
    }
    return { fixeDistanceWidth, fixeDistanceHeight }
  }

  private calTranslateXorY(
    itemRefDistance: number,
    endScrollDistance: number,
    fixeDistance: number,
    proportionalValue: number
  ): number {
    let result: number = itemRefDistance + Math.abs(endScrollDistance) - fixeDistance
    return (result = this.unit === 'px' ? result : result * proportionalValue)
  }

  private calElementWidthOrHeight(itemRefDistance: number, proportionalValue: number): number {
    let result: number = itemRefDistance
    return (result = this.unit === 'px' ? result : result * proportionalValue)
  }

  // 滑塊初始位置若超出可視範圍，將自動置中
  private setInitSliderBlockCenter() {
    if (this.scrollObj instanceof Promise) {
      this.scrollObj.then((bs) => {
        this.setInitScrollToCenter(bs)
      })
    } else {
      this.setInitScrollToCenter(this.scrollObj)
    }
  }

  private setInitScrollToCenter(bs: BScrollConstructor) {
    // 判斷:
    // 1. 元素初始位置超過容器內的可視區
    // 2.1 該元素距離容器內部右側的長度，必須大於容器長度的一半 (這樣元素才有滑動置中的空間)
    if (this.chooseDirection === 'X') {
      const { itemRefLeft, itemRefRight, itemRefWidth, lastItemRefRight, sliderContainerWidth } =
        this.getSliderBlockCenterData()
      if (
        itemRefRight > sliderContainerWidth &&
        lastItemRefRight - (itemRefLeft + itemRefWidth * 0.5) > sliderContainerWidth * 0.5
      ) {
        bs.scrollTo(-(itemRefLeft + itemRefWidth * 0.5) * 0.5, 0, 350)
      } else if (
        itemRefLeft > sliderContainerWidth &&
        lastItemRefRight - (itemRefLeft + itemRefWidth * 0.5) < sliderContainerWidth * 0.5
      ) {
        bs.scrollTo(bs.maxScrollX, 0, 350)
      }
    } else {
      const { itemRefTop, itemRefBottom, itemRefHeight, lastItemRefBottom, sliderContainerHeight } =
        this.getSliderBlockCenterData()

      if (
        itemRefBottom > sliderContainerHeight &&
        lastItemRefBottom - (itemRefTop + itemRefHeight * 0.5) > sliderContainerHeight * 0.5
      ) {
        bs.scrollTo(-(itemRefTop + itemRefHeight * 0.5) * 0.5, 0, 350)
      } else if (
        itemRefTop > sliderContainerHeight &&
        lastItemRefBottom - (itemRefTop + itemRefHeight * 0.5) < sliderContainerHeight * 0.5
      ) {
        bs.scrollTo(bs.maxScrollY, 0, 350)
      }
    }
  }

  private getSliderBlockCenterData() {
    const { itemRefLeft, itemRefRight, itemRefWidth, itemRefTop, itemRefBottom, itemRefHeight } =
      this.getItemRefFromSliderList(this.currentCategoryIndex.value)

    // 獲取元素容器內部的總長度
    const { itemRefRight: lastItemRefRight, itemRefBottom: lastItemRefBottom } =
      this.getItemRefFromSliderList(this.itemRefsArray.length - 1)

    // 獲取容器的長度
    let sliderContainerWidth: number = 0
    let sliderContainerHeight: number = 0
    if (this.sliderContainer.value !== undefined) {
      const { width, height } = this.sliderContainer.value.getBoundingClientRect()
      sliderContainerWidth = width
      sliderContainerHeight = height
    }

    return {
      itemRefLeft,
      itemRefRight,
      itemRefWidth,
      lastItemRefRight,
      sliderContainerWidth,
      itemRefTop,
      itemRefBottom,
      itemRefHeight,
      lastItemRefBottom,
      sliderContainerHeight,
    }
  }
}
