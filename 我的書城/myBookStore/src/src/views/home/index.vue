<template>
  <div>
    <div class="container">
      <carousel />
      <recommendBooks />
      <guessBooks />
    </div>
    <functionList />
    <shopCartList />
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  home 的統整首頁
 * @data
 *  2023/5
 */
import carousel from './components/carousel.vue'
import functionList from './components/functionList.vue'
import recommendBooks from './components/recommendBooks.vue'
import shopCartList from '@/views/shopCart/components/shopCartList.vue'
import guessBooks from './components/guessBooks.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 91.5vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
</style>
