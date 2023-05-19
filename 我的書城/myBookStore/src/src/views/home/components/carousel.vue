<template>
  <div class="content">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
        <div class="slide-banner-content">
          <img class="scale-size" src="@/assets/img/carousel/carousel_1.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_2.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_3.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_4.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_5.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_6.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_7.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_8.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_9.png" alt="輪播圖" />
          <img class="scale-size" src="@/assets/img/carousel/carousel_10.png" alt="輪播圖" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  輪播圖 模塊
 *
 *  備註: 僅顯示，未有連結
 * @data
 *  2023/5
 */
import bScrollUtil from '@/utils/bScrollUtil'
import { Ref, ref } from 'vue'

const slide: Ref<HTMLElement | undefined> = ref()

const option = {
  scrollX: true,
  scrollY: false,
  slide: {
    threshold: 100,
    loop: true,
    autoplay: true,
  },
  useTransition: false,
  momentum: false,
  bounce: false,
  stopPropagation: true,
}

bScrollUtil.asyncCreateByHTMLElement(slide, option)
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';

.content {
  width: 100%;
  height: 3rem;

  .banner-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .slide-banner-wrapper {
      height: 100%;
      overflow: hidden;
    }
    .slide-banner-content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      white-space: nowrap;
      font-size: 0;
      .scale-size {
        object-fit: fill;
        object-fit: contain;
        object-fit: scale-down;
      }
    }
  }
}
</style>
