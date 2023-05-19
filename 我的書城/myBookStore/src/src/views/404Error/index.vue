<template>
  <div class="content">
    <i class="icon icon-home" @click="toDefaultPage" />
    <img class="errorLogo" src="@/assets/img/error/404Error.png" alt="404網頁" />
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  404 錯誤頁面
 * @data
 *  2023/4
 */
import router from '@/router'

function toDefaultPage() {
  router.push({ name: 'default' })
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/config.scss';

.content {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right bottom, $color-background-light, $color-main-heavy);
  .errorLogo {
    width: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
  .icon {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-size: 0.35rem;
    color: $color-main-light;
  }
}
</style>
