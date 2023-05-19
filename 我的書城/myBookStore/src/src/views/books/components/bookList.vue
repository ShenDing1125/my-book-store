<template>
  <div class="content" ref="bookItemScroll">
    <ul class="book-content">
      <div class="pulldown-scroller">
        <div>
          <div v-show="beforePullDown">
            <span>Pull Down And Refresh</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown">
              <span>Refresh Success</span>
            </div>
          </div>
        </div>
      </div>

      <li v-for="item in bookItemList" :key="item.ISBN">
        <bookItem :bookItem="item" />
      </li>
      <span class="place-holder" />

      <div
        v-if="getIsProductsComingSoon && isDelayDisplayProductsComingSoon"
        class="products-preparing"
      >
        <img
          class="products-preparing-logo-gif"
          src="@/assets/img/other/products_preparing_logo.gif"
          alt="商品準備中"
        />
        <img
          class="products-preparing-text-gif"
          src="@/assets/img/other/products_preparing_text.gif"
          alt="商品準備中"
        />
      </div>
      <div class="pullUp-scroller">
        <div>
          <div v-if="isPullUpLoad">
            <img class="pullUp-scroller-loading" src="@/assets/img/other/loading.gif" alt="載入中" />
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  書本列表頁面
 * @data
 *  2023/4
 */
import { ref, Ref } from 'vue'
import BookItems from '../service/bookItems'
import bScrollUtil from '@/utils/bScrollUtil'
import { Options } from '@better-scroll/core'
import bookItem from '@/views/common/bookItem.vue'
import { useRoute } from 'vue-router'
import BookService from '../service/index'

const {
  bookItemRefs,
  bsPullingDown,
  bsPullingUp,
  delayDisplayProductsComingSoon,
  isDelayDisplayProductsComingSoon,
} = BookItems
const { bookItemList, getIsProductsComingSoon } = bookItemRefs

const route = useRoute()
BookService.getBookListPageInfo(route)

const bookItemScroll: Ref<HTMLElement | undefined> = ref()
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
  pullDownRefresh: {
    threshold: 60,
    stop: 55,
  },
  pullUpLoad: {
    threshold: 650,
  },
}
const bs = bScrollUtil.asyncCreateByHTMLElement(bookItemScroll, option)

const beforePullDown: Ref<boolean> = ref(true)
const isPullingDown: Ref<boolean> = ref(false)
const isPullUpLoad: Ref<boolean> = ref(false)
const scrollY: Ref<number> = ref(0)
// 備註: 這裡的 上拉 與 下拉 僅作功能實現
// 所以直接插入偽資料，並未重發請求
// 上拉新增資料
bsPullingDown(bs, beforePullDown, isPullingDown)
// 下拉新增資料
bsPullingUp(bs, isPullUpLoad, scrollY, bookItemScroll)
// products-ComingSoon 延遲顯示
delayDisplayProductsComingSoon()
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  position: relative;
  left: 0;
  height: 90vh;
  background-color: $color-background-middle;
  overflow: hidden;

  .pulldown-scroller {
    width: 100%;
    height: 0.5rem;
    font-size: 0.22rem;
    text-align: center;
    line-height: 0.65rem;
    color: $color-background-heavy;
    position: absolute;
    top: -0.5rem;
    left: 0;
  }

  .pullUp-scroller {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0.5rem;
    font-size: 0.22rem;
    text-align: center;
    line-height: 0.5rem;

    &-loading {
      display: block;
      height: 0.65rem;
      width: 0.65rem;
    }
  }
  .book-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .place-holder {
      width: 2.2rem;
      margin: 0.18rem 0.15rem;
    }
  }

  .products-preparing {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85vh;

    &-logo-gif {
      width: 0.65rem;
    }

    &-text-gif {
      height: 0.65rem;
    }
  }
}
</style>
