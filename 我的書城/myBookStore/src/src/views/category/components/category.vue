<template>
  <div class="content">
    <div class="home-btn" @click="HomeService.toHomePage">
      <i class="icon-home" />
    </div>
    <div class="thr-category-wrapper" ref="firCategoryScroll">
      <ul class="first-category">
        <li
          class="first-category-item"
          :class="{ 'first-category-item_active': FirstActiveIndex === index }"
          v-for="(item, index) in firstCategoryList"
          :key="item.firstCategoryId"
          @click="changeFirstTable(index)"
        >
          <span class="first-category-name line-clamp">{{ item.firstCategoryName }}</span>
        </li>
      </ul>
    </div>

    <div class="secThr-category secThr-category-wrapper" ref="secCategoryScroll">
      <ul>
        <li
          class="secThr-category-item"
          v-for="item in allSecThrCategoryLists"
          :key="item.secondCategoryId"
          v-show="item.firstCategoryId === FirstActiveIndex + 1"
        >
          <span class="secThr-category-name">
            <span class="horizontal-bar">――&nbsp;</span>
            {{ item.secondCategoryName }}
            <span class="horizontal-bar">&nbsp;――</span>
          </span>
          <ul class="thr-category">
            <li
              class="thr-category-container"
              v-for="(thrCategoryList, sliderItemIndex) in item.thirdCategoryLists"
              @click="
                BookService.toBookItemListPage(
                  item.secondCategoryId,
                  thrCategoryList.thirdCategoryId,
                  sliderItemIndex + 1
                )
              "
            >
              <img
                class="thr-category-container-icon"
                :src="getImgPath(thrCategoryList.thirdCategoryPicName)"
                alt="類別圖案"
              />
              <span class="thr-category-container-item">
                {{ thrCategoryList.thirdCategoryName }}
              </span>
              <span class="dividing-line"></span>
            </li>
            <span class="placeholder-span"></span>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  類別頁面
 * @data
 *  2023/4
 *  2023/5
 *   -新增類別圖案
 */
import { ref } from 'vue'
import bScrollUtil from '@/utils/bScrollUtil'
import { Options } from '@better-scroll/core'
import CategoryService from '@/views/category/service'
import ImgUtil from '@/utils/imgUtil'
import BookService from '@/views/books/service'
import HomeService from '@/views/home/service'

const { categoryStoreRefs, FirstActiveIndex, changeFirstTable, getCategoryPageInfo } =
  CategoryService
const { firstCategoryList, allSecThrCategoryLists } = categoryStoreRefs
const { getImgPath } = ImgUtil

getCategoryPageInfo()

const firCategoryScroll = ref<HTMLElement | undefined>()
const secCategoryScroll = ref<HTMLElement | undefined>()
const option: Options = {
  scrollY: true,
  click: true,
  scrollbar: {
    fade: true,
  },
  mouseWheel: {
    speed: 20,
    invert: false,
    easeTime: 300,
  },
}

bScrollUtil.asyncCreateByHTMLElement(firCategoryScroll, option)
bScrollUtil.asyncCreateByHTMLElement(secCategoryScroll, option)
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  position: absolute;
  display: flex;
  font-size: 0.18rem;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  gap: 0.1rem;
  background-color: $color-background-middle;

  .home-btn {
    position: absolute;
    width: 1.3rem;
    height: 0.6rem;
    background-color: $color-background-light;
    .icon-home {
      position: absolute;
      top: 0.3rem;
      left: 0.65rem;
      translate: -50% -50%;
      font-size: 0.3rem;
      color: $color-main-heavy;
    }
  }

  .thr-category-wrapper {
    overflow: hidden;
  }

  .first-category {
    width: 1.3rem;
    flex-basis: 1.3rem;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 0.6rem;
    background-color: $color-background-light;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.78rem;
      width: 100%;
    }
    .first-category-item_active {
      color: $color-main-heavy;
      font-weight: bold;
      border-left: 0.03rem solid $color-main-heavy;
      background-color: $color-background-middle;
      .first-category-name {
        width: 100%;
        text-align: center;
      }
    }
  }
  .secThr-category-wrapper {
    overflow: hidden;
  }
  .secThr-category {
    flex: 1;
    margin-right: 0.19rem;
    width: 100%;
    height: auto;
    background-color: $color-background-middle;

    &-item {
      width: 100%;
      background-color: $color-background-light;
    }

    &-name {
      display: flex;
      font-size: 0.16rem;
      font-weight: bold;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      background-color: $color-background-light;
      border-bottom: 0.02rem solid $color-background-heavy;
      .horizontal-bar {
        color: $color-background-heavy;
      }
    }
    .thr-category {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 0.15rem;

      &-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1rem;
        width: 50%;
        word-break: break-all;

        &-icon {
          position: absolute;
          top: 0.15rem;
          height: 0.35rem;
        }

        &-item {
          display: block;
          height: 0.5rem;
          width: 100%;
          margin-top: 0.5rem;
          text-align: center;
          line-height: 0.5rem;
        }
      }

      .dividing-line {
        height: 0.4rem;
        border-right: 0.02rem $color-background-heavy solid;
      }
      .placeholder-span {
        width: 50%;
      }
    }
  }
  .thr-category-container:nth-child(2n) {
    .dividing-line {
      border-right: none;
    }
  }
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
