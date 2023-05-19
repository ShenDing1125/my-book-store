<template>
  <div class="content">
    <span class="content-recommend">猜&nbsp;您&nbsp;喜&nbsp;歡</span>
    <div class="container">
      <div v-if="guessBookList.length !== 0" class="container-img" v-for="item in guessBookList">
        <img
          class="book-img scale-size"
          :src="getImgPath(item.bookPicName)"
          :alt="item.bookName"
          @click="toProductDetails(item.ISBN)"
        />
      </div>
      <div v-else>
        <span class="container-text">期待您使用搜索功能，讓我更了解您的喜好&nbsp;:&#41;</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  猜想模塊
 *   -從歷史搜尋紀錄隨機抽取，並彙總成書籍列表
 * @data
 *  2023/5
 */
import HomeService from '../service'
import ImgUtil from '@/utils/imgUtil'
import ProductDetailsService from '@/views/productDetails/service'

const { guessBookList, getGuessBookList } = HomeService
const { getImgPath } = ImgUtil
const { toProductDetails } = ProductDetailsService

getGuessBookList(5)
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';

.content {
  position: relative;
  height: 2.4rem;
  width: 100%;
  margin-top: 0.8rem;

  &-recommend {
    position: absolute;
    top: -0.26rem;
    left: 0.22rem;
    font-size: 0.3rem;
    margin-bottom: 0.05rem;
    font-weight: bold;
  }

  .container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: auto;

    &-img {
      margin: 0.18rem;
      .book-img {
        width: 2rem;
        height: 2rem;
        box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem $color-shadow;
        border-radius: 0.3rem;
      }
    }

    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }

    &-text {
      position: absolute;
      top: 25%;
      left: 50%;
      translate: -50% -25%;
      display: block;
      width: 80%;
      font-size: 0.25rem;
      line-height: 0.3rem;
      letter-spacing: 0.05rem;
      padding: 0.15rem;

      border-radius: 0.5rem;
      border: 0.03rem solid $color-main-heavy;
    }
  }
  .scale-size {
    object-fit: contain;
    object-fit: fill;
    object-fit: scale-down;
  }
}
</style>
