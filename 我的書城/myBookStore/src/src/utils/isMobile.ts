/**
 * @brief
 *  判斷是否為移動端
 * @data
 *  2023/4
 */
export default function isMobile():boolean {
  let flag:boolean = false
  const result = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  
  flag = result === null ? false : true
  return flag
}
