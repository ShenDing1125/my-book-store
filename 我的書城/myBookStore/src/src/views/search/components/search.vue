<template>
  <div class="content" @click="leaveShowMoreHistoryKeyWord">
    <div class="search-bar">
      <div class="icon" @click.stop="previousPage">
        <i class="icon-arrow-left2" />
      </div>
      <div class="search-keyword">
        <input
          class="search-keyword-input"
          type="text"
          v-model="curKeyWord"
          @keyup.enter.stop="findBookItemListByKeyWord(curKeyWord)"
          @keyup.stop="resetKeywords"
          @focus.stop="isOpenSearchKeyWords"
          @blur.stop="isCloseSearchKeyWords"
        />
        <i
          class="search-keyword-icon icon-search"
          @click.stop="findBookItemListByKeyWord(curKeyWord)"
        />
        <span class="blur-effect" />
      </div>
      <div v-if="isOpenAutoHistoryContainer" class="keyword">
        <div v-if="!isShowMoreHistory">
          <div
            class="keyword-text"
            v-for="item in lessHistoryKeyWordList"
            :key="item.historyKeyWordId"
            @click.stop="findBookItemListByKeyWord(item.historyKeyWord)"
          >
            {{ item.historyKeyWord }}
          </div>
          <span
            v-if="allHistoryKeyWordList.length > 3"
            class="keyword-showMoreText"
            @click.stop="showMoreHistory"
            >顯示更多</span
          >
          <i
            v-else
            v-show="allHistoryKeyWordList.length !== 0"
            class="keyword-clearIcon icon-bin2"
            @click.stop="delAllHistoryKeyWord"
          />
        </div>
        <div v-else>
          <div
            class="keyword-text"
            v-for="item in allHistoryKeyWordList"
            :key="item.historyKeyWordId"
            @click.stop="findBookItemListByKeyWord(item.historyKeyWord)"
          >
            {{ item.historyKeyWord }}
          </div>
          <i
            v-show="allHistoryKeyWordList.length !== 0"
            class="keyword-clearIcon icon-bin2"
            @click.stop="delAllHistoryKeyWord"
          />
        </div>
      </div>
      <div v-else-if="isOpenAutoContainer" class="keyword">
        <div
          v-if="historyKeyWordList.length !== 0"
          class="keyword-text keyword-history-text"
          v-for="item in historyKeyWordList"
          :key="item.historyKeyWordId"
          @click.stop="findBookItemListByKeyWord(item.historyKeyWord)"
        >
          {{ item.historyKeyWord }}
        </div>
        <div
          class="keyword-text"
          v-for="item in keyWordList"
          :key="item.keyWordId"
          @click.stop="findBookItemListByKeyWord(item.keyWord)"
        >
          {{ item.keyWord }}
        </div>
        <div v-show="keyWordList.length === 0" class="keyword-defText">
          --&nbsp;沒有符合您預期的關鍵字&nbsp;--
        </div>
      </div>
    </div>
    <div class="background">
      <img class="background-img" src="@/assets/img/search/search_background.png" alt="搜索區背景圖" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  搜索頁面
 * @data
 *  2023/4
 */
import search from '../service'
const {
  isOpenAutoContainer,
  searchStoreRefs,
  lessHistoryKeyWordList,
  isShowMoreHistory,
  isOpenAutoHistoryContainer,
  previousPage,
  isOpenSearchKeyWords,
  resetKeywords,
  isCloseSearchKeyWords,
  showMoreHistory,
  findBookItemListByKeyWord,
  delAllHistoryKeyWord,
  leaveShowMoreHistoryKeyWord,
} = search
const { curKeyWord, keyWordList, historyKeyWordList, allHistoryKeyWordList } = searchStoreRefs
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;

  .search-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 0.6rem;
    padding-top: 0.1rem;

    .icon {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.4rem;
      width: 0.4rem;
      margin-bottom: 0.035rem;
      font-size: $font-icon-large;
      color: $color-main-light;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0.01rem 0.01rem 0.02rem 0.01rem $color-shadow;
    }
    .search-keyword {
      position: relative;
      width: 80%;
      height: 65%;
      margin-left: 0.25rem;
      margin-bottom: 0.05rem;

      &-input {
        width: 100%;
        height: 100%;
        font-size: 0.18rem;
        border: 0.02rem $color-background-middle solid;
        box-sizing: border-box;
        box-shadow: 0.01rem 0.01rem 0.02rem 0.01rem rgba(0, 0, 0, 0.5);
        padding-left: 0.15rem;
      }

      &-icon {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.09rem;
        color: $color-main-light;
        font-size: $font-icon-small;
        background-color: $color-background-light;
      }
      .blur-effect {
        position: absolute;
        top: 0;
        right: 0.4rem;
        width: 0.15rem;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(1px);
      }
    }
    .keyword {
      position: absolute;
      top: 0.65rem;
      left: 0;
      width: 100%;
      max-height: 75vh;
      overflow: auto;
      background-color: rgba(255, 255, 255, 0.8);

      &-clearIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0.5rem;
        font-size: $font-icon-large;
        color: $color-main-heavy;
        box-shadow: 0.01rem 0.01rem 0.02rem 0.01rem $color-shadow;
      }

      &-text {
        display: flex;
        justify-content: start;
        align-items: center;
        height: 0.5rem;
        padding-left: 0.2rem;
        border-bottom: 0.01rem solid $color-background-heavy;
      }

      &-defText {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.5rem;
        color: $color-main-heavy;
        border-bottom: 0.01rem solid $color-product-light;
      }

      &-showMoreText {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.5rem;
        color: $color-main-heavy;
        border-bottom: 0.01rem solid $color-product-light;
      }

      &-history-text {
        font-weight: bold;
        color: darkgrey;
      }
    }
  }

  .background {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
    background-color: #d4a056;
    &-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
