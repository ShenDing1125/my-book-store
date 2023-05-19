/**
 * @brief
 *  裝飾器模式
 *  對路由進行自動"掛載"
 * @data
 *  2023/3
 */
import { ResMethodTypes } from "@/types/DecoratorTypes";
import ALLControlRouterLoader from "@/common/ALLControllerRouterLoader";

const baseUrlRegExp = /^(?:\/[a-zA-Z0-9-_\.]*)?(?:[\/]?[a-zA-Z])*$/;

function getFullPath(baseUrl: string, routerPath: string) {
  if (baseUrl === "/") {
    baseUrl = "";
  }
  if (baseUrlRegExp.test(baseUrl)) {
    const fullPath: string = baseUrl.concat(routerPath);
    return fullPath;
  } else {
    const errorMessage = `getFullPath(Fn): Problem with the baseUrl path -> ${baseUrl}`;
    throw new Error(errorMessage);
  }
}

function cleanMetadata(target: { new (...args: any): any }, propertyKey: string, valueKey: string[]): void;
function cleanMetadata(target: { new (...args: any): any }, valueKey: string): void;
function cleanMetadata(target: any, valueKey: any, propertyKey?: any): any {
  if (typeof valueKey)
    if (typeof valueKey !== "string") {
      for (const key of valueKey) {
        Reflect.deleteMetadata(key, target.prototype, propertyKey);
      }
    } else {
      Reflect.deleteMetadata(valueKey, target.prototype);
    }
}

export function controller(prefixUrl: string = "") {
  return function (target: { new (...args: any): any }) {
    const propertyKeyArr: string[] = Reflect.getMetadata("propertyKeys", target.prototype);
    propertyKeyArr.forEach((propertyKey: string) => {
      const routerHandlerFn = Reflect.getMetadata("handlerFn", target.prototype, propertyKey);
      const reqMethodType: keyof ResMethodTypes = Reflect.getMetadata("methodType", target.prototype, propertyKey);
      const reqPath = Reflect.getMetadata("path", target.prototype, propertyKey);
      const fullReqPath = getFullPath(prefixUrl, reqPath);
      const rootRouter = ALLControlRouterLoader.app.context.rootRouter;
      // 掛載到根路由
      if (reqMethodType) {
        rootRouter[reqMethodType](fullReqPath, routerHandlerFn);
      } else {
        const errorMessage = `controller(Fn): Request method type doesn't exist -> reqMethodType: ${reqMethodType}`;
        throw new Error(errorMessage);
      }

      cleanMetadata(target, propertyKey, ["handlerFn", "methodType", "path"]);
    });
    cleanMetadata(target, "propertyKeys");
  };
}
