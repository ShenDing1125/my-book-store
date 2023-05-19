/**
 * @brief
 *  用戶登入的操作處理
 * @data
 *  2023/4
 */
import router from '@/router'
import { useUserInfoStore } from '@/store/userInfo'
import storage from 'good-storage'
import { storeToRefs } from 'pinia'
import { Ref, ref } from 'vue'
import { GoodStorageData } from '@/constants'

const { TOKEN } = GoodStorageData

class UserInfoService {
  public static userInfoStore = useUserInfoStore()
  public static userInfoStoreRefs = storeToRefs(UserInfoService.userInfoStore)
  public static initUserName: Ref<string> = ref('')
  public static initPassword: Ref<string> = ref('')
  public static isErrorUserName: Ref<boolean> = ref(false)
  public static isErrorPassword: Ref<boolean> = ref(false)
  public static errorUserNameMes: Ref<string> = ref('帳號')
  public static errorPasswordMes: Ref<string> = ref('密碼')
  private constructor() {}

  public static previousPage() {
    router.back()
  }

  public static toLoginPage() {
    router.push({ name: 'login' })
  }

  public static isHasToken(): boolean {
    return Boolean(storage.get(TOKEN))
  }

  public static async login(userName: string, password: string) {
    try {
      if (userName === '') {
        UserInfoService.openOrCloseErrorUserName(true)
        UserInfoService.setErrorUserName('帳號不能為空')
        return
      }
      if (password === '') {
        UserInfoService.openOrCloseErrorPassword(true)
        UserInfoService.setErrorPassword('密碼不能為空')
        return
      }

      await UserInfoService.userInfoStore.login(userName, password)

      UserInfoService.openOrCloseErrorUserName(false)
      UserInfoService.openOrCloseErrorPassword(false)
      UserInfoService.setErrorUserName('帳號')
      UserInfoService.setErrorPassword('密碼')

      router.push({ name: 'default' })
    } catch (error) {
      UserInfoService.openOrCloseErrorUserName(true)
      UserInfoService.openOrCloseErrorPassword(true)
      UserInfoService.setErrorUserName('輸入的帳號有誤')
      UserInfoService.setErrorPassword('輸入的密碼有誤')
    }
  }

  public static signOut() {
    storage.remove(TOKEN)
    router.push({ name: 'default' })
  }

  public static resetErrorUserName() {
    if (UserInfoService.isErrorUserName) {
      UserInfoService.openOrCloseErrorUserName(false)
      UserInfoService.initUserName.value = ''
      UserInfoService.setErrorUserName('帳號')
    }
  }

  public static resetErrorPassword() {
    if (UserInfoService.initPassword) {
      UserInfoService.openOrCloseErrorPassword(false)
      UserInfoService.initPassword.value = ''
      UserInfoService.setErrorPassword('密碼')
    }
  }

  private static openOrCloseErrorUserName(value: boolean) {
    UserInfoService.isErrorUserName.value = value
  }

  private static openOrCloseErrorPassword(value: boolean) {
    UserInfoService.isErrorPassword.value = value
  }

  private static setErrorUserName(mes: string) {
    UserInfoService.errorUserNameMes.value = mes
  }
  private static setErrorPassword(mes: string) {
    UserInfoService.errorPasswordMes.value = mes
  }
}

export default UserInfoService
