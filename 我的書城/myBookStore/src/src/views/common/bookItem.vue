<template>
  <div
    v-if="bookItem !== undefined"
    class="book-container"
    @click="toProductDetails(bookItem.ISBN)"
  >
    <img class="book-img" :src="getImgPath(bookItem.bookPicName)" :alt="bookItem.bookName" />
    <p class="book-name line-clamp">
      {{ bookItem.bookName }}
    </p>
    <div class="price-info">
      <p v-if="bookItem.discount !== 10 && bookItem.discount !== 0" class="book-discount">
        {{ bookItem.discount }} 折
      </p>
      <p v-if="bookItem.discount === 0" class="book-discount">免費</p>
      <p v-if="bookItem.discount !== 10" class="book-original-price">
        {{ bookItem.originalPrice }}
      </p>
      <p class="book-price">{{ calPrice(bookItem.originalPrice, bookItem.discount) }}$</p>
      <i
        class="icon-cart"
        :class="{ 'icon-cart-click': isClickShopCartIcon(bookItem.ISBN) }"
        @click.stop="switchWishlistToShopCart(bookItem)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  單一書本展示樣式
 * @data
 *  2023/4
 */
import { PropType, defineProps } from 'vue'
import BookItems from '@/views/books/service/bookItems'
import { BookItemListTypes } from '@/store/state'
import ImgUtil from '@/utils/imgUtil'
import productDetails from '@/views/productDetails/service'
import ShopCart from '@/views/shopCart/service'

const { calPrice } = BookItems
const { getImgPath } = ImgUtil
const { toProductDetails } = productDetails
const { isClickShopCartIcon, switchWishlistToShopCart } = ShopCart

defineProps({
  bookItem: {
    type: Object as PropType<BookItemListTypes>,
    require: true,
  },
})
</script>

<style lang="scss" scoped>
@import '../../assets/scss/config.scss';
.book-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 2.8rem;
  width: 2.2rem;
  margin: 0.18rem 0.15rem;
  background-color: $color-background-light;
  overflow: hidden;
  border-radius: 0.15rem;
  box-shadow: 0.03rem 0.03rem 0.05rem 0.01rem $color-shadow;
  padding-bottom: 0.1rem;

  .book-img {
    display: block;
    background-size: cover;
    height: 1.5rem;
    margin-bottom: 0.4rem;
  }

  .book-name {
    position: absolute;
    top: 1.9rem;
    line-height: 0.21rem;
    width: 80%;
    text-align: center;
  }

  .price-info {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 0.2rem;
    text-align: center;
    align-items: baseline;

    .book-discount {
      width: 0.5rem;
      border-radius: 0.07rem;
      color: $color-product-mark;
      border: 0.01rem solid $color-product-mark;
    }

    .book-original-price {
      text-decoration: line-through;
      color: $color-product-light;
    }

    .book-price {
      font-size: 0.22rem;
      line-height: 0.22rem;
      margin-right: 0.05rem;
    }
    .icon-cart {
      font-size: 0.2rem;
      color: $color-product-light;

      &-click {
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
    }
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
    100% {
      color: rgba(255, 140, 17);
    }
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
