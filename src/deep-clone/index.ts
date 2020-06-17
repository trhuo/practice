const isObject = (source) => {
  const type = typeof source
  return source !== null && (type === 'object' || type === 'function')
}

export const getType = (source) => {
  return Object.prototype.toString.call(source)
}

/**
 * 深拷贝函数
 * @param source 拷贝源
 * @param map 存储当前对象 -> 它的深拷贝的映射，解决循环引用问题。WeakMap 的键必须为对象（保留对象的弱引用）
 */
const deepCopy = (source, map = new WeakMap()) => {
  // 基本类型数据，直接返回
  if (!isObject(source)) return source
  // 引用类型数据
  const target = Array.isArray(source) ? [] : {}
  // 解决循环引用问题，拷贝开始前，先判断是否已经拷贝过当前对象，如果是则直接返回
  if (map.get(source)) {
    return map.get(source)
  }
  map.set(source, target)
  for (const key in source) {
    target[key] = deepCopy(source[key], map)
  }
  return target
}

export default deepCopy
