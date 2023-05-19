/**
 * @brief
 *  操作用戶功能
 * @data
 *  2023/4
 */
import { Context } from "koa";
import { get, post, del, put } from "../decorator/ReqMethodDecorator";
import { controller } from "../decorator/ControllerDecorator";
import { success, fail } from "@/common/ResResult";
import UserInfoService from "@/modules/userinfo/service/UserInfoService";

@controller("/userInfo")
class UserInfoController {
  @post("/login")
  async login(ctx: Context) {
    const { userName, password } = ctx.request.body;
    const result = await UserInfoService.login(userName, password);

    ctx.body = success(result);
  }
}
