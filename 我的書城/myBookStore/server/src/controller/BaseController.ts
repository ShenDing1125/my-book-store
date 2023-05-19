/**
 * @brief
 *  Token 驗證
 * @data
 *  2023/4
 */
import jwt, { JwtPayload } from "jsonwebtoken";
import { TOKEN_KEY } from "@/private";

export default class BaseController {
  private constructor() {}

  public static verifyToken(token: string) {
    const result = jwt.verify(token, TOKEN_KEY) as JwtPayload;

    return result.data;
  }
}

export const { verifyToken } = BaseController;
