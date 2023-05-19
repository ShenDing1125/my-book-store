<template>
  <div class="content">
    <moduleNavigationBar navigationBarText="商&nbsp;品&nbsp;頁">
      <template v-slot:leftBtn>
        <div class="icon icon-left">
          <i class="icon-arrow-left2" @click="previousPage" />
        </div>
      </template>
      <template v-slot:rightBtn v-if="bookItem">
        <div class="icon icon-right">
          <i
            class="icon-cart"
            :class="{ 'icon-cart-click': isClickShopCartIcon(bookItem?.ISBN) }"
            @click="switchWishlistToShopCart(bookItem)"
          />
          <span v-if="isClickShopCartIcon(bookItem?.ISBN)" class="icon-cart-info icon-checkmark" />
          <span v-else class="icon-cart-info icon-plus" />
        </div>
      </template>
    </moduleNavigationBar>
    <div class="container-product" ref="infoScroll">
      <div class="container" v-if="bookItem">
        <div class="container-img">
          <img
            class="container-img-book"
            :src="getImgPath(bookItem.bookPicName)"
            :alt="bookItem.ISBN"
          />
        </div>
        <div class="container-book">
          <div class="container-book-item">
            <div class="container-book-item-name">{{ bookItem.bookName }}</div>
            <div class="container-book-item-author">作者:&nbsp;{{ bookItem.author }}</div>
            <div class="container-book-item-publisher">
              出版社:&nbsp;{{ bookItem.publisherName }}
            </div>
          </div>
          <div class="container-book-price">
            <div class="container-book-price-discountPrice">
              <div v-if="bookItem.discount === 0">免費</div>
              <div v-else>$&nbsp;{{ calPrice(bookItem.originalPrice, bookItem.discount) }}</div>
            </div>
          </div>
          <div class="container-book-otherInfo">
            <div class="container-book-otherInfo-monthSaleCount">
              月銷售量:&nbsp;{{ bookItem.monthSaleCount }}
            </div>
            <div class="container-book-otherInfo-ISBN">ISBN:&nbsp;{{ bookItem.ISBN }}</div>
          </div>
        </div>
        <div class="circle-style" />
      </div>
      <div v-else>
        <img class="icon-error" src="@/assets/img/error/not_found.png" alt="找不到資源" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  商品詳情頁面
 * @data
 *  2023/4
 */
import productDetails from '@/views/productDetails/service'
import BookItems from '@/views/books/service/bookItems'
import ImgUtil from '@/utils/imgUtil'
import { useRoute } from 'vue-router'
import ShopCart from '@/views/shopCart/service'
import moduleNavigationBar from '@/views/common/moduleNavigationBar.vue'
import bScrollUtil from '@/utils/bScrollUtil'
import { Ref, ref } from 'vue'
import { Options } from '@better-scroll/core'
import ProductDetailsService from '../service/index'

const { calPrice } = BookItems
const { getImgPath } = ImgUtil
const { productDetailsStoreRefs, previousPage } = productDetails
const { bookItem } = productDetailsStoreRefs
const { isClickShopCartIcon, switchWishlistToShopCart } = ShopCart

const route = useRoute()
ProductDetailsService.getProductDetailsPageInfo(route)

const infoScroll: Ref<HTMLElement | undefined> = ref()

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

bScrollUtil.asyncCreateByHTMLElement(infoScroll, option)
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  width: 100%;
  height: 100vh;
  background-color: $color-background-middle;

  .icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.5rem;
    width: 0.5rem;
    color: $color-main-light;
    border-radius: 50%;
    background-color: $color-background-middle;
    z-index: 20;

    &-left {
      position: absolute;
      left: 0.15rem;
      top: 0.1rem;
      .icon-arrow-left2 {
        display: inline-block;
        font-size: $font-icon-large;
      }
    }

    &-right {
      position: absolute;
      right: 0.15rem;
      top: 0.1rem;
      .icon-cart {
        display: inline-block;
        font-size: $font-icon-large;
        color: $color-icon-main;
        &-click {
          color: $color-main-light;
        }
      }

      .icon-cart-info {
        display: inline-block;
        position: absolute;
        right: -0.05rem;
        top: 0rem;
        font-size: 0.16rem;
      }
      .icon-checkmark {
        color: $color-icon-add;
      }
      .icon-plus {
        color: $color-icon-del;
      }
    }
  }
  .container-product {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    width: 100%;
    // 9.5 -> 購物車 、 0.75 -> 導航欄
    height: calc(100vh - 9.5vh - 0.75rem);
    overflow: hidden;

    .container {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-start;
      padding-bottom: 0.5rem;
      z-index: 10;
      &-img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        background-color: $color-background-light;
        box-shadow: 0.03rem 0.03rem 0.05rem 0.01rem $color-shadow;
        margin-top: 0.2rem;
        z-index: 50;
        overflow: hidden;
        &-book {
          height: 2.5rem;
        }
      }

      &-book {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 0.25rem;
        padding: 0.2rem;
        z-index: 10;

        &-item {
          width: 70%;
          font-size: 0.18rem;
          &-name {
            font-weight: bold;
            font-size: 0.26rem;
            margin-bottom: 0.15rem;
            line-height: 0.32rem;
          }
          &-author {
            margin-top: 0.13rem;
            margin-bottom: 0.13rem;
          }
          &-publisher {
            margin-bottom: 0.13rem;
          }
        }

        &-price {
          width: 30%;
          height: 1rem;

          &-discountPrice {
            text-align: center;
            font-size: 0.32rem;
            font-weight: bold;
            color: $color-main-light;
          }
        }

        &-otherInfo {
          width: 100%;
          font-size: 0.15rem;

          &-monthSaleCount {
            font-size: 0.18rem;
            margin-bottom: 0.13rem;
          }

          &-ISBN {
            color: rgba($color: #000000, $alpha: 0.6);
            padding-left: 0.01rem;
          }
        }
      }

      .circle-style {
        position: absolute;
        top: 2.3rem;
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        background-color: $color-background-light;
        z-index: 1;
      }
    }

    .icon-error {
      position: relative;
      top: 0.2rem;
      width: 4.5rem;
      z-index: 50;
    }
  }
}
</style>
