/**
 * @brief
 *  生成 JWT
 * @data
 *  2023/4
 */
import UserInfoDao from "@/modules/userinfo/dao/UserInfoDao";
import { UserInfoTypes } from "@/types/modules/UserInfoTypes";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "@/private";

class UserInfoService {
  public static userInfoService: UserInfoService = new UserInfoService();
  private constructor() {}

  public async login(userName: string, passWord: string) {
    // 這裡數據庫裡的密碼不進行 "不可逆加密"，所以直接使用原密碼直接查詢即可
    const result = await UserInfoDao.findOneUser(userName, passWord);

    if (result !== null) {
      this.createJWT(result);
    }

    return result;
  }

  private createJWT(userInfo: UserInfoTypes) {
    // expiresIn -> 有效時間 (hours、days、ms、s)
    // alg -> 加密算法
    const token: string = jwt.sign({ data: userInfo }, TOKEN_KEY, {
      expiresIn: "24hr",
      header: { alg: "HS256", typ: "JWT" },
    });
    userInfo.token = token;
  }
}

export default UserInfoService.userInfoService;
