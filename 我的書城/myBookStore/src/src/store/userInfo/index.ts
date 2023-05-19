/**
 * @brief
 *  儲存用戶資訊
 * @data
 *  2023/4
 */
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage from 'good-storage'
import { UserInfoTypes } from '../state'
import UserInfoApi from '@/api/UserInfoApi'
import { Ref, ref } from 'vue'
import { GoodStorageData } from '@/constants'
import { initUserInfo } from '@/constants'

const { TOKEN } = GoodStorageData

function hasProps(obj: Record<string, any>): boolean {
  return Boolean(Object.getOwnPropertyNames(obj).length)
}

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    const defUserInfo: UserInfoTypes = initUserInfo
    return {
      defUserInfo,
    }
  },
  getters: {
    getLoginUserInfo: (state) => {
      return Boolean(state.defUserInfo.token.length === 0) ? state.defUserInfo : goodStorage.get(TOKEN)
    },
  },
  actions: {
    async login(userName: string, password: string) {
      const result: AxiosResponse<UserInfoTypes> = await UserInfoApi.login(userName, password)
      this.defUserInfo = result.data
      goodStorage.set(TOKEN, this.defUserInfo.token)
    },
  },
})
