// 获取传入数据的类型
export function getType (val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}
