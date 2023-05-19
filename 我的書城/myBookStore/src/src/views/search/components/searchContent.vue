<template>
  <div class="content" :class="{ 'content-display-animation': isSearchContentOpen }">
    <moduleNavigationBar navigationBarText="搜&nbsp;尋&nbsp;結&nbsp;果">
      <template v-slot:leftBtn>
        <div class="icon icon-left">
          <i class="icon-arrow-down2" @click="handleSearchContentOpen" />
        </div>
      </template>
    </moduleNavigationBar>
    <ul v-if="bookListByKeyWord.length !== 0" class="container">
      <li v-for="item in bookListByKeyWord" :key="item.ISBN">
        <bookItem :bookItem="item"></bookItem>
      </li>
      <span class="place-holder" />
    </ul>

    <div v-else class="search-not-find">
      <img
        class="search-not-find-logo"
        src="@/assets/img/search/search_not_find_logo.png"
        alt="沒有找到相關資源"
      />
      <span class="search-not-find-text"> 喔歐~沒有找到您想要的資源!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  搜索結果頁面
 * @data
 *  2023/4
 */
import Search from '../service'
import moduleNavigationBar from '@/views/common/moduleNavigationBar.vue'
import bookItem from '@/views/common/bookItem.vue'

const { isSearchContentOpen, handleSearchContentOpen, searchStoreRefs } = Search
const { bookListByKeyWord } = searchStoreRefs
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background-light;
  z-index: 20;

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
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: start;
    width: 100%;
    height: 91vh;
    overflow-y: auto;
    .place-holder {
      width: 2.2rem;
      margin: 0.18rem 0.15rem;
    }
  }

  .search-not-find {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    top: 50%;
    translate: 0 -50%;
    background: radial-gradient(closest-side, $color-main-light, $color-background-light);
    &-logo {
      height: 3rem;
    }
    &-text {
      font-size: 0.2rem;
      margin-top: 0.05rem;
      font-weight: bold;
      letter-spacing: 0.05rem;
    }
  }
}
</style>
