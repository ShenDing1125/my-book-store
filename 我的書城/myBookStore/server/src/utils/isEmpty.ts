/**
 * @brief
 *  提供判斷 data 是否為空
 * @data
 *  2023/3
 */
export default function isEmpty(data: any): boolean {
  if (Array.isArray(data)) {
    return Boolean(data.length === 0);
  } else if (typeof data === "object") {
    return Boolean(Object.keys(data).length === 0);
  } else if (data == null) {
    // data == null
    // 相等於 data === null || data === undefined
    return true;
  } else {
    return true;
  }
}
