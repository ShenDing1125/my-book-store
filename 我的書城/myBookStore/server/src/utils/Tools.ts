/**
 * @brief
 *  提供應用處理
 * @data
 *  2023/3
 */
export function strToIntNum(data: string): number {
  const regex = /^[0-9]*$/g;
  if (regex.test(data)) {
    return parseInt(data, 10);
  } else {
    return NaN;
  }
}
