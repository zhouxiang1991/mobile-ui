/**
 * @param value 待检查值。
 * @returns 检查value是否是数组。
 */
export function isArray<T> (value: T|T[]): value is T[] {
  return Array.isArray(value)
}
