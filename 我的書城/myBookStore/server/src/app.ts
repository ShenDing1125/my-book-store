/**
 * @brief
 *  app 文件
 * @data
 *  2023/3
 *  2023/4
 *   -新增 JWT
 */
import Koa from "koa";
import json from "koa-json";
import koaBody from "koa-body";
import jwt from "koa-jwt";
import "@/modules/BaseDao";
import globalException from "./common/GlobalException";
import aLLControllerRouterLoader from "./common/ALLControllerRouterLoader";
import { TOKEN_KEY } from "./private";

const app = new Koa();

aLLControllerRouterLoader.init(app, [
  json(),
  koaBody(),
  globalException(),
  jwt({ secret: TOKEN_KEY }).unless({
    path: [/^\/userInfo\/login/, /^\/category/, /^\/books/, /^\/search/, /^\/productDetails/],
  }),
]);
