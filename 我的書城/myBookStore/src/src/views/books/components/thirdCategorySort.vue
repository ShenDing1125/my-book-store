<template>
  <div class="content">
    <div class="blur-effect" />
    <ul class="third-category">
      <div class="icon icon-left">
        <i class="icon-arrow-left2" @click="toCategoryPage" />
        <span class="icon-left-divingLine">|</span>
      </div>
      <div class="third-category-wrapper" ref="thirdCategoryScroll">
        <ul class="third-category-content">
          <li
            class="third-category-item"
            :class="{
              'text-highlight': sliderBlock.currentCategoryIndex.value === sliderItemIndex,
            }"
            v-for="(item, sliderItemIndex) in getThirdCategoryLists"
            :key="item.thirdCategoryId"
            :ref="setSliderItemRef"
            @click="jumpThirdCategory(route, sliderBlock, sliderItemIndex, item.thirdCategoryId)"
          >
            {{ item.thirdCategoryName }}
          </li>
          <span class="slider-block" ref="sliderItemRef" />
          <span class="placeholder" />
        </ul>
      </div>
      <div class="icon icon-right">
        <i class="icon-search" @click="toSearchPage" />
      </div>
    </ul>
  </div>
</template>
<script setup lang="ts">
/**
 * @brief
 *  類別區塊頁面
 * @data
 *  2023/4
 */
import bScrollUtil from '@/utils/bScrollUtil'
import { onBeforeUpdate, ref, Ref, VNodeRef } from 'vue'
import { Options } from '@better-scroll/core'
import { useRoute } from 'vue-router'
import ThirdCategorySort from '@/views/books/service/thirdCategorySort'
import SliderBlock from '../service/sliderBlock'
import BookService from '../service/index'
import SearchService from '@/views/search/service'

const { categoryStoreRefs, toCategoryPage, jumpThirdCategory } = ThirdCategorySort
const { getThirdCategoryLists } = categoryStoreRefs
const { toSearchPage } = SearchService

// 創建滑動條
const thirdCategoryScroll: Ref<HTMLElement | undefined> = ref()
const option: Options = {
  scrollX: true,
  click: true,
  probeType: 3,
  scrollbar: {
    fade: true,
  },
  mouseWheel: {
    speed: 20,
    invert: false,
    easeTime: 300,
  },
}
const bs = bScrollUtil.asyncCreateByHTMLElement(thirdCategoryScroll, option)

// 創建滑動塊樣式
const itemRefs: Ref<any[]> = ref([])
// 儲存 itemRefs 元素
const setSliderItemRef: VNodeRef = (el) => {
  if (el) {
    itemRefs.value.push(el)
  }
}
// 防止點擊時，元素重複添加至陣列中
onBeforeUpdate(() => {
  itemRefs.value.length = 0
})
const sliderItemRef: Ref<HTMLElement | undefined> = ref()
const sliderBlock = new SliderBlock(sliderItemRef, thirdCategoryScroll, itemRefs.value, bs)

// 頁面請求 thirdCategorySort 的資料後，並創建滑塊
const route = useRoute()
BookService.getThirdCategorySortPageInfo(route, sliderBlock)
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  position: static;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: $color-background-light;

  .blur-effect {
    position: absolute;
    top: 0.48rem;
    width: 100%;
    height: 0.1rem;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1;
  }
  .third-category {
    display: flex;

    &-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }

    &-content {
      display: inline-block;
    }

    &-item {
      display: inline-block;
      position: relative;
      font-size: 0.15rem;
      text-align: center;
      padding: 0.18rem 0.18rem;
      margin-bottom: 0.02rem;
      z-index: 10;
    }
  }
  .text-highlight {
    color: white;
  }
  .slider-block {
    display: block;
    height: 0.3rem;
    position: absolute;
    top: 0.09rem;
    background-color: $color-main-light;
    border-radius: 0.5rem;
    transition-duration: 200ms;
  }
  .placeholder {
    display: inline-block;
    width: 0.1rem;
  }
  .icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.49rem;
    width: 0.6rem;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(3px);

    &-left {
      color: $color-icon-main;
      .icon-arrow-left2 {
        display: inline-block;
        margin-top: 0.01rem;
        margin-left: 0.1rem;
        font-size: $font-icon-small;
        border-radius: 50%;
      }
      &-divingLine {
        font-weight: bold;
        font-size: 0.28rem;
        padding-bottom: 0.11rem;
        margin-left: 0.1rem;
      }
    }

    &-right {
      right: 0.08rem;
      .icon-search {
        display: inline-block;
        margin-left: 0.15rem;
        font-size: $font-icon-small;
        color: $color-icon-main;
      }
    }
  }
}
</style>
