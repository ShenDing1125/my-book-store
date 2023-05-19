/**
 * @brief
 *  宣告靜態提示
 * @data
 *  2023/4
 */
import 'axios'

declare module 'dotenv' {
  export interface DotenvParseOutput {
    readonly VITE_HOST: string
    readonly VITE_PORT: number
    readonly VITE_BASE_URL: string
    readonly VITE_PROXY_DOMAIN: string
  }
}
