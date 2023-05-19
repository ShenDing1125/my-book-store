/**
 * @brief
 *  加載名稱有 "Controller" 的路由檔案
 * @data
 *  2023/3
 */
import Koa from "koa";
import json from "koa-json";
import Router from "koa-router";
import koaBody from "koa-body";
import Application from "koa";
import pathUtil from "@/utils/PathUtil";

class ALLControllerRouterLoader {
  public app!: Koa;
  public static aLLControllerRouterLoader: ALLControllerRouterLoader = new ALLControllerRouterLoader();
  private constructor() {}

  public init(app: Koa, middlewareArr: Application.Middleware[] = [json(), koaBody()]) {
    this.app = app;
    this.loadMiddleware(middlewareArr); // 加載中間件
    this.storeRootRouterToCtx(); // 保存根路由
    this.loadAllControllerRouterWrapper(); // 加載控制器路由
    this.listen(); // 監聽
  }

  private loadMiddleware(middlewareArr: Application.Middleware[]) {
    for (const middleware of middlewareArr) {
      this.app.use(middleware);
    }
  }

  private storeRootRouterToCtx() {
    const rootRouter = new Router();
    // 把根路由掛載到全局上下文
    this.app.context.rootRouter = rootRouter;
    this.app.use(rootRouter.routes());
  }

  private isControlFile(file: string): boolean {
    const slash: string = file.includes("\\") === true ? "\\" : "/";
    const fileName: string = file.substring(file.lastIndexOf(slash) + 1, file.lastIndexOf("."));
    return fileName.includes("Controller") === true;
  }

  private getAbsoluteFilePaths() {
    const dir = pathUtil.mergePath(process.cwd(), "src/controller");
    const fullFilesPaths: string[] = pathUtil.getAbsoluteFilePaths(dir, ["ts"]);

    for (const file of fullFilesPaths) {
      if (this.isControlFile(file) === false) {
        const errorMessage = `getAbsoluteFilePaths(Fn): File name doesn't contain "controller"! -> ${file}`;
        throw new Error(errorMessage);
      }
    }

    return fullFilesPaths;
  }

  private loadAllRouter(allFullFilePaths: string[]) {
    for (let fullFilePath of allFullFilePaths) {
      require(fullFilePath);
    }
  }

  private loadAllControllerRouterWrapper() {
    const allFullFilePaths: string[] = this.getAbsoluteFilePaths();
    this.loadAllRouter(allFullFilePaths);
  }

  private listen() {
    this.app.listen(3002);
    console.log("server running on port 3002");
  }


}

export default ALLControllerRouterLoader.aLLControllerRouterLoader;
