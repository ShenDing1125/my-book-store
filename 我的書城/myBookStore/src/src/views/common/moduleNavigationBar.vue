<template>
  <div>
    <div class="blur-effect" />
    <slot name="leftBtn"></slot>
    <div class="navigation-bar">
      <span class="navigation-bar-text">{{ navigationBarText }}</span>
    </div>
    <slot name="rightBtn"></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  模塊導航欄
 * @data
 *  2023/4
 *  2023/5
 *   -按鈕功能改為自訂義添加，提供左右兩側的雙插槽
 */
import { defineProps } from 'vue'
import router from '@/router'

defineProps({
  navigationBarText: {
    type: String,
    require: true,
  },
})

function previousPage() {
  router.back()
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/config.scss';
.blur-effect {
  position: absolute;
  top: 0.67rem;
  width: 100%;
  height: 0.16rem;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  z-index: 25;
}

.navigation-bar {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0.75rem;
  background-color: $color-background-light;
  z-index: 10;
  &-text {
    margin-top: 0.17rem;
    font-size: 0.35rem;
    font-weight: bold;
  }
}
</style>
