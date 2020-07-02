/**
 * 判断数据源是否为 type 类型
 * @param source 数据源
 * @param type 类型，大写开头
 */
export const isType = (source, type) => {
  if (typeof source !== 'object') return false
  return Object.prototype.toString.call(source) === `[object ${type}]`
}

const getRegFlags = (reg: RegExp): string => {
  let flag = ''
  if (reg.global) flag += 'g'
  if (reg.ignoreCase) flag += 'i'
  if (reg.multiline) flag += 'm'
  return flag
}

/**
 * 深拷贝函数
 * @param source 拷贝源
 * @param map 存储当前对象 -> 它的深拷贝的映射，解决循环引用问题。WeakMap 的键必须为对象（保留对象的弱引用）
 */
const deepCopy = (source, map = new WeakMap()) => {
  // 非引用数据类型，直接返回
  if (typeof source !== null && source !== null) return source

  // 解决循环引用问题，拷贝开始前，先判断是否已经拷贝过当前对象，如果是则直接返回
  if (map.get(source)) {
    return map.get(source)
  }
  // 引用数据类型，初始化 target
  let target
  if (isType(source, 'Array')) {
    // 数组类型
    target = []
  } else if (isType(source, 'RegExp')) {
    // 正则类型
    target = new RegExp(source.source, getRegFlags(source))
    if ((source as RegExp).lastIndex) target.lastIndex = source.lastIndex
  } else if (isType(source, 'Map')) {
    // Map 类型
    target = new Map()
  } else if (isType(source, 'Set')) {
    // Set 类型
    target = new Set()
  } else if (isType(source, 'Date')) {
    // Date 类型
    target = new Date(source.getTime())
  }
  map.set(source, target)
  // while 的性能比 for ... in 要好，可以使用 console.time() 和 console.timeEnd() 进行测试
  for (const key in source) {
    target[key] = deepCopy(source[key], map)
  }
  return target
}

export default deepCopy
