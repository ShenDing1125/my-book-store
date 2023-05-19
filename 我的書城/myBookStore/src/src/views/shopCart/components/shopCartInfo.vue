<template>
  <div class="content">
    <div class="total-price">
      <span class="total-price-text">Total Price</span>
      <span class="total-price-shopCart">
        <span>$&nbsp;</span>
        <span>{{ totalDiscountPrice }}</span>
      </span>
    </div>
    <div class="checkout" @click="switchButtonInfo">
      <span v-if="showButtonInfo === 0" class="checkout-text">登入</span>
      <span v-else-if="showButtonInfo === 1" class="checkout-text">購物車</span>
      <span v-if="curPurchaseQuantity >= 1 && curPurchaseQuantity < 99" class="purchase-quantity">{{
        curPurchaseQuantity
      }}</span>
      <span v-else-if="curPurchaseQuantity >= 99" class="purchase-quantity">99+</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  購物車訊息頁面
 * @data
 *  2023/4
 */
import shopCartService from '../service/index'

const {
  shopCartRefs,
  totalDiscountPrice,
  showButtonInfo,
  switchButtonInfo,
  curPurchaseQuantity,
  getShopCartPageInfo,
} = shopCartService

getShopCartPageInfo()
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 9.5vh;
  background-color: $color-background-light;
  border-top: 0.02rem solid $color-background-heavy;
  z-index: 100;

  .total-price {
    width: 2rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: $color-background-light;

    &-text {
      display: flex;
      align-items: end;
      justify-content: center;
      height: 35%;
      width: 100%;
      font-size: 0.15rem;
      font-weight: bold;
      color: $color-main-heavy;
    }

    &-shopCart {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 65%;
      width: 100%;
      font-size: 0.23rem;
      font-weight: bold;
    }
  }
  .checkout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    width: 2.1rem;
    border-radius: 0.12rem;
    margin-right: 7%;
    background-color: $color-main-light;
    color: $color-background-light;

    &-text {
      font-size: 0.3rem;
      font-weight: 500;
    }

    &-symbol {
      padding-left: 0.1rem;
      font-size: 0.25rem;
      font-weight: bold;
    }

    .purchase-quantity {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0.25rem;
      top: 0.05rem;
      width: 0.2rem;
      height: 0.2rem;
      padding: 0.06rem;
      background-color: $color-product-mark;
      border-radius: 50%;
      font-size: 0.15rem;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
