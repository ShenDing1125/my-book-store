/**
 * @brief
 *  請求用戶訊息
 * @data
 *  2023/4
 */
import axiosUtil from '@/utils/axiosUtil'

class UserInfoApi {
  public static userInfoApi: UserInfoApi = new UserInfoApi()

  private constructor() {}

  public async login(userName: string, password: string) {
    const data = await axiosUtil.post('/userInfo/login', { userName, password })

    return data
  }
}

export default UserInfoApi.userInfoApi
