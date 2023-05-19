<template>
  <div class="content">
    <div class="background">
      <div class="background-shape"></div>
      <div class="background-shape"></div>
    </div>
    <form v-if="!isHasToken()" class="container">
      <i class="container-icon icon-arrow-left2" @click="previousPage" />
      <h3 class="container-title">帳&nbsp;號&nbsp;登&nbsp;入</h3>
      <label class="container-label" :class="{ errorMark: isErrorUserName }" for="userName">{{
        errorUserNameMes
      }}</label>
      <input
        class="container-input"
        v-model.trim="initUserName"
        type="text"
        placeholder="Account"
        id="username"
        @focus="resetErrorUserName"
      />
      <label class="container-label" :class="{ errorMark: isErrorPassword }" for="password">{{
        errorPasswordMes
      }}</label>
      <input
        class="container-input"
        v-model.trim="initPassword"
        type="password"
        placeholder="Password"
        id="password"
        @focus="resetErrorPassword"
      />
      <div class="container-btn" @click="login(initUserName, initPassword)">登&nbsp;入</div>
    </form>
    <form v-else class="container">
      <i class="container-icon icon-arrow-left2" @click="previousPage" />
      <h3 class="container-title">歡&nbsp;迎&nbsp;回&nbsp;來</h3>
      <div class="container-signOut container-btn" @click="signOut">登&nbsp;出</div>
    </form>
  </div>
</template>

<script setup lang="ts">
/**
 * @brief
 *  用戶登入頁面
 * @data
 *  2023/4
 */
import UserInfoService from '../service/index'

const {
  previousPage,
  login,
  isErrorUserName,
  isErrorPassword,
  errorUserNameMes,
  errorPasswordMes,
  initUserName,
  initPassword,
  resetErrorUserName,
  resetErrorPassword,
  isHasToken,
  signOut,
} = UserInfoService
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';
.content {
  width: 100%;
  height: 100%;

  .background {
    &-shape {
      height: 15rem;
      width: 15rem;
      position: fixed;
      border-radius: 50%;

      &:first-child {
        background-color: $color-main-light;
        left: -2.5rem;
        top: -3.5rem;
      }

      &:last-child {
        background-color: $color-main-heavy;
        right: -2rem;
        bottom: -9rem;
      }
    }
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 5.5rem;
    width: 4rem;
    padding: 0.5rem 0.35rem;
    background-color: rgba($color: $color-background-light, $alpha: 0.35);
    border-radius: 0.22rem;
    backdrop-filter: blur(0.1rem);
    border: 0.05rem solid rgba(255, 255, 255, 0.2);
    box-shadow: 0.03rem 0.03rem 0.13rem 0.03rem $color-shadow;
    color: rgba($color: #000000, $alpha: 0.8);
    letter-spacing: 0.05rem;

    &-icon {
      position: relative;
      display: flex;
      top: 0.36rem;
      justify-content: center;
      align-items: center;
      height: 0.4rem;
      width: 0.4rem;
      font-size: $font-icon-large;
      color: $color-main-light;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0.01rem 0.01rem 0.02rem 0.01rem $color-shadow;
    }

    &-title {
      font-size: 0.4rem;
      font-weight: bold;
      line-height: 0.35rem;
      text-align: center;
      padding-bottom: 0.2rem;
    }

    &-label {
      display: block;
      margin-top: 0.2rem;
      font-size: 0.15rem;
      letter-spacing: 0.02rem;
      font-weight: 500;
    }

    .errorMark {
      color: red;
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    &-input {
      display: block;
      height: 0.4rem;
      width: 100%;
      background-color: rgba($color: $color-background-light, $alpha: 0.2);
      border-radius: 0.2rem;
      padding-left: 0.2rem;
      margin-top: 0.12rem;
      font-size: 0.15rem;
      font-weight: 300;
      border: none;
      box-sizing: border-box;

      &::placeholder {
        color: white;
      }
    }

    &-btn {
      margin-top: 0.4rem;
      width: 100%;
      text-align: center;
      background-color: #ffffff;
      color: #080710;
      padding: 0.12rem 0;
      font-size: 0.18rem;
      line-height: 0.18rem;
      font-weight: 500;
      border-radius: 0.15rem;
    }

    &-signOut {
      margin-top: 4.2rem;
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
  }
}
</style>
