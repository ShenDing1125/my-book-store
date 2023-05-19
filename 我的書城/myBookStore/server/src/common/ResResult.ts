/**
 * @brief
 *  設定HTTP狀態碼
 *
 *  成功:
 *    -200(OK): 執行成功
 *    -202(Accepted): 已接受請求(加入queue中)，在未來某段時間執行
 *
 *  失敗:
 *    -401(Unauthorized): 沒有經過授權
 *    -403(Forbidden): 沒有權限存取
 *    -404(Not Found): 請求的資源或網址不存在
 *    -410(Gone): 請求的資源曾經存在(現在不存在)
 *    -500(Server Error): 伺服器出錯
 * @data
 *  2023/3
 */
type successStatus = "200" | "202";
type errorStatus = "401" | "403" | "404" | "410" | "500";

class ResResult {
  private constructor() {}

  public static success(data: any = undefined, status: successStatus = "200", msg: string = "") {
    return { data, status, msg };
  }
  public static fail(status: errorStatus, msg: string = "") {
    return { status, msg };
  }
}

export const { success, fail } = ResResult;
