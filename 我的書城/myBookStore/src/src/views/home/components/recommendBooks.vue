<template>
  <div class="content">
    <span class="content-recommend">推&nbsp;薦</span>
    <div class="container">
      <div class="container-img" v-for="item in recommendBookList" :key="item.ISBN">
        <img
          class="book-img scale-size"
          :src="getImgPath(item.bookPicName)"
          :alt="item.bookName"
          @click="toProductDetails(item.ISBN)"
        />
        <div class="container-info">
          <span class="container-info-name line-clamp">{{ item.bookName }}</span>
          <span class="container-info-author">作者:&nbsp;{{ item.author }}</span>
          <span class="container-info-price"
            >{{ calPrice(item.originalPrice, item.discount) }}&nbsp;$</span
          >
          <div class="container-info-sale">
            <span class="container-info-sale-text">月售:&nbsp;</span>
            <span class="container-info-sale-count">
              {{ item.monthSaleCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  推薦模塊
 *   -從三級分類中隨機抽取，並彙總成書籍列表
 * @data
 *  2023/5
 */
import HomeService from '../service'
import ImgUtil from '@/utils/imgUtil'
import ProductDetailsService from '@/views/productDetails/service'
import BookItems from '@/views/books/service/bookItems'

const { getRecommendBookList, recommendBookList } = HomeService
const { getImgPath } = ImgUtil
const { toProductDetails } = ProductDetailsService
const { calPrice } = BookItems

getRecommendBookList(5)
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';

.content {
  position: relative;
  display: flex;
  height: 3rem;
  width: 100%;
  margin-top: 0.8rem;

  &-recommend {
    position: absolute;
    top: -0.3rem;
    left: 0.22rem;
    font-size: 0.3rem;
    margin-bottom: 0.05rem;
    font-weight: bold;
  }

  .container {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    overflow-x: auto;

    &-img {
      position: relative;
      flex-shrink: 0;
      width: 4.5rem;
      height: 1.8rem;
      border-radius: 0.3rem;
      margin: 0.18rem;
      box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem $color-shadow;
      background-color: rgba($color: $color-main-light, $alpha: 0.15);
      .book-img {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        width: 2rem;
        height: 2.5rem;
        box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem $color-shadow;
        border-radius: 0.3rem;
        background-color: $color-background-light;
      }
    }

    &-info {
      position: absolute;
      right: 0.12rem;
      top: 50%;
      translate: 0 -50%;
      width: 1.8rem;
      height: 1.5rem;
      font-weight: 500;

      //   background-color: aquamarine;

      &-name {
        width: 100%;
        font-size: 0.22rem;
        margin-bottom: 0.21rem;
      }

      &-author {
        position: absolute;
        top: 0.6rem;
        left: 0;
        font-size: 0.16rem;
        color: $color-product-light;
      }

      &-price {
        position: absolute;
        left: 0rem;
        bottom: 0.1rem;
        font-size: 0.32rem;
        font-weight: 500;
        text-decoration: line-through;
        color: $color-main-heavy;
      }

      &-sale {
        position: absolute;
        right: 0.08rem;
        bottom: 0.12rem;
        font-size: 0.2rem;

        &-text {
          font-size: 0.18rem;
        }

        &-count {
          font-size: 0.25rem;
        }
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .scale-size {
    object-fit: contain;
    object-fit: fill;
    object-fit: scale-down;
  }

  .line-clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
