<template>
  <div class="content">
    <div class="icon">
      <i class="icon-set icon-search" @click="SearchService.toSearchPage" />
      <i class="icon-set icon-list2" @click="CategoryService.toCategoryPage" />
      <i class="icon-set icon-cart" @click="ShopCartService.toShopCartListPage" />
      <i class="icon-set icon-account_circle" @click="UserInfoService.toLoginPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchService from '@/views/search/service'
import CategoryService from '@/views/category/service'
import ShopCartService from '@/views/shopCart/service'
import UserInfoService from '@/views/userInfo/service'
</script>

<style lang="scss" scoped>
/**
 * @brief
 *  提供各處功能模塊的連結
 * @data
 *  2023/5
 */
@import '../../../assets/scss/config.scss';
.content {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 8.5vh;
  border-top: 0.02rem solid $color-background-heavy;
  background-color: $color-background-light;
  .icon {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0.3rem;
    width: 100%;
    height: 100%;
    color: $color-main-light;

    &-set {
      padding: 0.15rem;
    }
    .icon-account_circle {
      font-size: 0.38rem;
    }
  }
}
</style>
