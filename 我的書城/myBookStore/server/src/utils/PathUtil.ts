/**
 * @brief
 *  提供對 路徑 的操作功能
 * @data
 *  2023/3
 */
import fs from "fs";
import path from "path";

class PathUtil {
  public static pathUtil: PathUtil = new PathUtil();
  private constructor() {}
  public isExist(path: string): boolean {
    try {
      fs.accessSync(path, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  public getFiles(dir: string): string[] {
    return fs.readdirSync(dir);
  }

  public mergePath(firDir: string, secDir: string): string {
    const fullPath = path.join(firDir, secDir);
    if (this.isExist(fullPath)) {
      return fullPath;
    } else {
      const errorMessage = `mergePath(Fn): No such path! -> ${fullPath}`;
      throw new Error(errorMessage);
    }
  }

  public getAbsoluteFilePaths(dir: string, fileExtension: string[] = ["ts"]): string[] {
    const allFiles = this.getFiles(dir);
    const fullFilePaths: string[] = [];

    for (const fileName of allFiles) {
      for (const extension of fileExtension) {
        const filExt = new RegExp(`\.${extension}`);
        if (fileName.search(filExt) !== -1) {
          fullFilePaths.push(path.join(dir, fileName));
          break;
        }
      }
    }
    return fullFilePaths;
  }
}

export default PathUtil.pathUtil;
