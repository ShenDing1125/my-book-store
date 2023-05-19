/**
 * @brief
 *  全局的異常捕獲
 * @data
 *  2023/3
 *  2023/4
 *   -新增 token 異常捕獲 (使用第三方庫)
 */
import Koa, { Context } from "koa";
import { fail } from "./ResResult";
// import { verifyToken } from "@/controller/BaseController";

function globalException() {
  return async (ctx: Context, next: Koa.Next) => {
    await next().catch((error) => {
      if (error.status === 401) {
        const errResult = getTokenErrorMes(error.name);
        ctx.body = fail("401", errResult);
      } else {
        const errResult = error.originalError ? error.originalError.message : error.message;
        ctx.body = fail("500", `服務器錯誤: ${errResult}`);
      }
    });

    // // 若要使用 took + redis 緩存，可以自訂義來寫 took 驗證
    // try {
    //   if (ctx.request.originalUrl.indexOf("login") === -1) {
    //     const token = ctx.req.headers.authorization?.split(" ")[1];

    //     if (token !== undefined) {
    //       verifyToken(token);
    //     }
    //   }

    //   await next();
    // } catch (error: any) {
    //   const errResult = error as { message: String };

    //   switch (error.name) {
    //     case "JsonWebTokenError": {
    //       ctx.body = fail("401", "Illegal Token");
    //       break;
    //     }
    //     case "TokenExpiredError": {
    //       ctx.body = fail("403", "Token Expired");
    //       break;
    //     }
    //     default: {
    //       ctx.body = fail("500", `服務器錯誤: ${errResult.message}`);
    //     }
    //   }
    // }
  };
}

function getTokenErrorMes(error: string): string {
  switch (error) {
    case "JsonWebTokenError": {
      return "非法 Token";
    }
    case "TokenExpiredError": {
      return "Token 已過期";
    }
    case "UnauthorizedError": {
      return "未經授權的錯誤";
    }
    default: {
      return error;
    }
  }
}

export default globalException;
