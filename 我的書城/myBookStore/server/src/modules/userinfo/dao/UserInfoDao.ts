/**
 * @brief
 *  用戶詳情
 * @data
 *  2023/4
 */
import UserInfoModel from "../../decoratorModel/UserInfo.model";
// import { UserInfoTypes, UserInfoList } from "@/types/modules/UserInfoTypes";

class UserInfoDao {
  public static userInfoDao: UserInfoDao = new UserInfoDao();
  private constructor() {}

  public findOneUser(userName: string, password: string) {
    return UserInfoModel.findOne({
      raw: true,
      where: { userName, password },
    });
  }

  // // 以下為擴展內容 (未使用)
  // public findAllUser() {
  //   return UserInfoModel.findAll({
  //     raw: true,
  //   });
  // }

  // public findByProps() {
  //   return UserInfoModel.findAll({
  //     raw: true,
  //     attributes: [UserInfoList.USER_ID, UserInfoList.PASS_WORD],
  //   });
  // }

  // public findByUsmAndPsw(username: string, password: string) {
  //   return UserInfoModel.findOne({
  //     raw: true,
  //     where: {
  //       [Op.or]: [{ [UserInfoList.USER_NAME]: username }, { [UserInfoList.PASS_WORD]: password }],
  //     },
  //   });
  // }

  // public findByLike(key: string) {
  //   const searchKey = `%${key}%`;
  //   return UserInfoModel.findAll({
  //     raw: true,
  //     where: {
  //       [UserInfoList.USER_NAME]: {
  //         [Op.like]: searchKey,
  //       },
  //     },
  //   });
  // }

  // public findByUsmAndAddr(firKey: string, secKey: string) {
  //   const searchKey = `%${firKey}%`;
  //   const infoKey = `%${secKey}%`;
  //   return UserInfoModel.findAll({
  //     raw: true,
  //     where: {
  //       [Op.or]: [
  //         {
  //           [UserInfoList.USER_NAME]: {
  //             [Op.like]: searchKey,
  //           },
  //         },
  //         {
  //           [UserInfoList.ADDRESS]: infoKey,
  //         },
  //       ],
  //     },
  //   });
  // }

  // // mySQL語法
  // // select address, count(valid) as totalCount from userinfo where valid=1 group by address
  // public countUserInfo() {
  //   return UserInfoModel.findAll({
  //     raw: true,
  //     group: UserInfoList.ADDRESS,
  //     attributes: [UserInfoList.ADDRESS, [Sequelize.fn("count", Sequelize.col(UserInfoList.VALID)), "totalCount"]],
  //     where: {
  //       valid: 1,
  //     },
  //   });
  // }

  // // mySQL語法
  // // select * from userinfo limit 5,3 (跳過前五段數據後，加載三段數據)
  // public findUserWithPager(offset: number, limit: number) {
  //   return UserInfoModel.findAll({
  //     raw: true,
  //     offset,
  //     limit,
  //   });
  // }
}

export default UserInfoDao.userInfoDao;
