/**
 * @brief
 *  判斷該 data 是否為空
 * @data
 *  2023/4
 */
export default function isEmpty(data: { [K in any]: any } | Array<any>): boolean {
  if (Array.isArray(data)) {
    return Boolean(data.length === 0)
  } else if (typeof data === 'object') {
    return Boolean(Object.keys(data).length === 0)
  } else {
    return true
  }
}
