<template>
  <div>
    <third-category-sort />
    <book-items />
    <shopCart />
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  books 的統整頁面
 * @data
 *  2023/4
 */
import thirdCategorySort from './components/thirdCategorySort.vue'
import bookItems from './components/bookList.vue'
import shopCart from '../shopCart/index.vue'
</script>

<style lang="scss" scoped></style>
