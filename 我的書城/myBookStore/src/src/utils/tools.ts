/**
 * @brief
 *   提供應用處理
 * @data
 *  2023/4
 */
export function strToIntNum(data: string): number {
  const regex = /^[0-9]*$/g
  if (regex.test(data)) {
    return parseInt(data, 10)
  } else {
    return NaN
  }
}

type CommonFnType = (...args: any) => any
export function debounce<T extends CommonFnType>(fn: T, waitTime: number = 200) {
  let timer: any = 0

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      timer = 0
    }, waitTime)
  }
}
