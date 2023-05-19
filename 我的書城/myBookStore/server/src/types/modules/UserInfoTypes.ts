/**
 * @brief
 *  userInfo 的宣告類型
 * @data
 *  2023/3
 */
export interface UserInfoTypes {
  userId: number;
  userName: string;
  password: string;
  address: string;
  valid: number;
  token: string;
}

export enum UserInfoList {
  TABLE_NAME = "userInfo",
  USER_ID = "userId",
  USER_NAME = "userName",
  PASS_WORD = "password",
  ADDRESS = "address",
  VALID = "valid",
}
