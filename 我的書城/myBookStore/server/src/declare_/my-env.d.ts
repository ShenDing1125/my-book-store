/**
 * @brief
 *  宣告靜態提示
 * @data
 *  2023/3
 */
import "koa";
import Router from "koa-router";

declare module "koa" {
  export interface DefaultContext {
    params: any;
  }
  export interface ContextDelegatedRequest {
    rootRouter: Router;
  }
}
