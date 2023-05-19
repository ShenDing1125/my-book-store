/**
 * @brief
 *  對 axios 進行二次封裝
 *   -提供更好的靜態提醒
 *   -自動 響應 / 攔截 處理
 * @data
 *  2023/4
 */
import config from '@/config'
import { GoodStorageData } from '@/constants'
import router from '@/router'
import axios, { AxiosInstance, AxiosPromise } from 'axios'
import storage from 'good-storage'

const { TOKEN } = GoodStorageData
type Method = 'get' | 'post' | 'put' | 'delete'
const methods: Method[] = ['get', 'post', 'put', 'delete']
type ReqFn = (url: string, data?: any) => AxiosPromise<any>
interface ReqExecute {
  get: ReqFn
  post: ReqFn
  put: ReqFn
  delete: ReqFn
  path: ReqFn
}

class AxiosUtil {
  public static axiosUtil: AxiosUtil = new AxiosUtil()
  private axiosInstance!: AxiosInstance
  public request!: ReqExecute

  private constructor() {
    this.createAxiosInstance()
    this.setBaseUrl()
    this.beforeReqInstance()
    this.beforeResponseInstance()
    this.requestInit()
    this.reqPrepare()
  }

  private createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 })
  }

  private setBaseUrl() {
    switch (config.env) {
      case 'production':
        this.axiosInstance.defaults.baseURL = config.baseAPI
        break
      case 'development':
        this.axiosInstance.defaults.baseURL =
          config.isMock === true ? config.mockBaseAPI : config.baseAPI
        break
      default:
        const check: never = config.env
        break
    }
  }

  // 設置請求傳遞數據格式 x-www-form-urlencoded (aa=bb&cc=dd)
  // qs為第三方庫(未安裝)，可以進行自動數據的格式轉換
  // setHeader() {
  //   this.axiosInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  //   this.axiosInstance.defaults.transformRequest = (data) => qs.stringify(data)
  // }

  // 1.請求開始之前的請求攔截器
  private beforeReqInstance() {
    this.axiosInstance.interceptors.request.use((request) => {
      const token = storage.get(TOKEN)

      // 判斷 Token 是否加入至 header 訊息當中
      // Bearer 為固定寫法
      if (!request.headers.Authorization && token) {
        request.headers.Authorization = `Bearer ${token}`
      }

      return request
    })
  }

  // 2.數據響應之前的攔截器
  private beforeResponseInstance() {
    this.axiosInstance.interceptors.response.use((response) => {
      const { data, msg, status } = response.data
      switch (status as string) {
        case '200':
          return response.data
        case '401':
          storage.remove(TOKEN)
          router.push({ name: 'login' })
          return { msg, status: '401' }
        case '404':
          router.push({ name: '404' })
          return { msg, status: '404' }
        default:
          return { msg: 'No status response', status: '500' }
      }
    })
  }

  private requestInit() {
    this.request = {
      get: (): any => {},
      post: (): any => {},
      put: (): any => {},
      delete: (): any => {},
      path: (): any => {},
    }
  }

  // 自動掛載 method 類型
  private reqPrepare() {
    return methods.forEach((method) => {
      this.request[method] = (url, data) => {
        return this.axiosInstance[method](url, data)
      }
    })
  }
}
export default AxiosUtil.axiosUtil.request
