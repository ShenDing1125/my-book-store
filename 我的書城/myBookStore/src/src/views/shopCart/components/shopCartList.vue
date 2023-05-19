<template>
  <div class="content" :class="{ 'content-display-animation': isShopCartListOpen }">
    <moduleNavigationBar navigationBarText="購&nbsp;物&nbsp;車">
      <template v-slot:leftBtn>
        <div class="blur-effect" />
        <div class="icon icon-left">
          <i class="icon-arrow-down2" @click="handleShopCartOpen(false)" />
        </div>
      </template>
    </moduleNavigationBar>
    <div v-if="curUserShopCartList.length !== 0" class="container">
      <div class="container-book" v-for="item in curUserShopCartList" :key="item.bookISBN">
        <div class="container-book-box">
          <img
            class="container-book-box-img"
            :src="getImgPath(item.bookPicName)"
            :alt="item.bookName"
            @click="toProductDetails(item.bookISBN)"
          />
        </div>
        <div class="container-book-item">
          <div @click="toProductDetails(item.bookISBN)">
            <span class="container-book-item-text line-clamp">{{ item.bookName }}</span>
            <span class="container-book-item-price">
              <span>$</span>
              {{ calPrice(item.originalPrice, item.discount, item.purchaseQuantity) }}
            </span>
          </div>
          <div class="container-book-item-purchase">
            <span
              v-show="item.purchaseQuantity === 1"
              class="container-book-item-purchase-reduce"
              @click="updatePurchase(item, 'del')"
              ><i class="icon-bin2"
            /></span>
            <span
              v-show="item.purchaseQuantity > 1"
              class="container-book-item-purchase-reduce"
              @click="updatePurchase(item, 'del')"
              >-</span
            >
            <span class="container-book-item-purchase-purchase">{{ item.purchaseQuantity }}</span>
            <span class="container-book-item-purchase-increase" @click="updatePurchase(item, 'add')"
              >+</span
            >
          </div>
        </div>
        <span class="container-book-divingLine"></span>
      </div>
      <span class="placeholder" />
    </div>
    <div class="shopCart-empty" v-else>
      <img
        class="shopCart-empty-logo"
        src="../../../assets/img/shopCart/shop_cart_empty_logo.png"
        alt="清空的購物車"
      />
      <img
        class="shopCart-empty-text"
        src="../../../assets/img/shopCart/shop_cart_empty_text.gif"
        alt="清空的購物車"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  購物車清單頁面
 * @data
 *  2023/4
 */
import ImgUtil from '@/utils/imgUtil'
import BookItems from '@/views/books/service/bookItems'
import shopCart from '../service'
import productDetails from '@/views/productDetails/service'
import moduleNavigationBar from '@/views/common/moduleNavigationBar.vue'

const { calPrice } = BookItems
const { getImgPath } = ImgUtil
const { handleShopCartOpen, isShopCartListOpen, shopCartRefs, updatePurchase } = shopCart
const { curUserShopCartList } = shopCartRefs
const { toProductDetails } = productDetails
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background-light;
  z-index: 99;

  &-display-animation {
    display: block;
    animation: display 0.2s ease-in-out forwards;

    @keyframes display {
      0% {
        top: 10%;
      }
      100% {
        top: 0%;
      }
    }
  }

  .blur-effect {
    position: absolute;
    top: 0.67rem;
    width: 100%;
    height: 0.16rem;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(3px);
    z-index: 25;
  }

  .icon {
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
      .icon-arrow-down2 {
        display: inline-block;
        font-size: $font-icon-large;
      }
    }
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: start;
    width: 100%;
    height: 85%;
    overflow-y: auto;

    &-book {
      position: relative;
      width: 85%;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      box-shadow: 5px 5px 15px 2px $color-background-heavy;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;

      &-box {
        position: absolute;
        left: 0.35rem;
        display: flex;
        justify-content: center;
        height: 1.65rem;
        width: 1.65rem;
        overflow: hidden;

        &-img {
          display: block;
          height: 1.65rem;
        }
      }

      &-item {
        position: absolute;
        right: 0.15rem;
        width: 2.2rem;
        height: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-content: start;

        &-text {
          width: 100%;
          font-size: 0.22rem;
          font-weight: bold;
        }

        &-price {
          position: absolute;
          top: 0.45rem;
          width: 100%;
          font-size: 0.2rem;
          font-weight: bold;
          margin-top: 0.12rem;
          color: $color-main-light;
        }

        &-purchase {
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: space-around;
          width: 100%;
          font-size: 0.45rem;

          &-reduce {
            display: block;
            width: 0.45rem;
            height: 0.45rem;
            text-align: center;
            line-height: 0.4rem;
            color: $color-main-light;
            border-radius: 50%;
            background-color: $color-background-middle;
            font-weight: bold;
            .icon-bin2 {
              display: block;
              font-size: $font-icon-large;
              line-height: 0.45rem;
            }
          }

          &-purchase {
            width: 0.45rem;
            height: 0.45rem;
            text-align: center;
            line-height: 0.45rem;
          }

          &-increase {
            width: 0.45rem;
            height: 0.45rem;
            text-align: center;
            line-height: 0.45rem;
            color: $color-main-light;
            border-radius: 50%;
            background-color: $color-background-middle;
            font-weight: bold;
          }
        }
      }
    }
    .line-clamp {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .placeholder {
      height: 2.1rem;
    }
  }

  .shopCart-empty {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-logo {
      width: 1.5rem;
    }
    &-text {
      width: 3rem;
    }
  }
}
</style>
