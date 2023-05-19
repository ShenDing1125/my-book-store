/**
 * @brief
 *  對請求方法進行"封裝"
 * @data
 *  2023/3
 */
import "reflect-metadata";
import { ResMethodTypes } from "@/types/DecoratorTypes";

const routerRegExp = /^\/[a-zA-Z]+(?:[\/]?(\/\:)?[a-zA-Z])*$/;

function savePropertyKeys(target: any, propertyKey: string) {
  if (!Reflect.hasMetadata("propertyKeys", target)) {
    const savePropertyKey: string[] = [];
    savePropertyKey.push(propertyKey);
    Reflect.defineMetadata("propertyKeys", savePropertyKey, target);
  } else {
    const savePropertyKey: string[] = Reflect.getMetadata("propertyKeys", target);
    savePropertyKey.push(propertyKey);
    Reflect.defineMetadata("propertyKeys", savePropertyKey, target);
  }
}

export function reqProcess(methodType: keyof ResMethodTypes) {
  return function (reqPath: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      savePropertyKeys(target, propertyKey);

      if (routerRegExp.test(reqPath)) {
        Reflect.defineMetadata("methodType", methodType, target, propertyKey);
        Reflect.defineMetadata("path", reqPath, target, propertyKey);
        Reflect.defineMetadata("handlerFn", target[propertyKey], target, propertyKey);
      } else {
        const errorMessage = `reqProcess(Fn): Problem with the router path of the "${methodType}" method -> ${reqPath}`;
        throw new Error(errorMessage);
      }
    };
  };
}

const get = reqProcess("get");
const post = reqProcess("post");
const put = reqProcess("put");
const del = reqProcess("delete");

export { get, post, put, del };
