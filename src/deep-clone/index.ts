const getType = (source: any): string => {
  return Object.prototype.toString.call(source)
}
const TYPES = {
  regexp: '[object RegExp]',
  date: '[object Date]',
  array: '[object Array]',
  object: '[object Object]',
  map: '[object Map]',
  set: '[object Set]',
}

const copyRegExp = (regexp: RegExp): RegExp => {
  let flags = ''
  if (regexp.ignoreCase) flags += 'i'
  if (regexp.multiline) flags += 'm'
  if (regexp.global) flags += 'g'
  const result = new RegExp(regexp.source, flags)
  // lastIndex 用来指定下一次匹配的起始位置
  result.lastIndex = regexp.lastIndex
  return result
}

const copySymbol = (source: Symbol): Symbol => {
  return Object(Symbol.prototype.valueOf.call(source))
}

/**
 * 深拷贝
 * @param source 拷贝源
 * @param map 用来存储已经复制过的对象，解决循环引用的问题
 */
const deepClone = function (source: unknown, map = new WeakMap()) {
  // 如果是非引用数据类型，直接返回
  if (typeof source !== 'object' || source === null) return source
  if (map.get(source as Object)) {
    // 之前已经复制过，直接返回
    return map.get(source as Object)
  }
  // 没有复制过，区分需要遍历处理的类型(Array, Object, Map, Set等)和不需要遍历处理的类型(Number, Error, Date, RegExp等)
  let target
  const sourceType = getType(source)
  if (
    [TYPES['array'], TYPES['set'], TYPES['map'], TYPES['object']].indexOf(
      sourceType
    )
  ) {
    switch (sourceType) {
      case TYPES['array']:
        target = new Array()
        break
      case TYPES['object']:
        target = new Object()
        break
      case TYPES['map']:
        target = new Map()
        break
      case TYPES['set']:
        target = new Set()
    }
  } else {
    switch (getType(source)) {
      case TYPES['regexp']:
        return copyRegExp(source as RegExp)
      case TYPES['symbol']:
        return copySymbol(source as Symbol)
      case TYPES['date']:
        return new Date(source as Date)
      default:
        break
    }
  }
  map.set(source, target)
  // 继续进行遍历处理
  if (sourceType === TYPES['set']) {
    ;(source as Set<any>).forEach((val) => {
      target.add(deepClone(val, map))
    })
    return target
  }
  if (sourceType === TYPES['map']) {
    ;(source as Map<any, any>).forEach((value, key) => {
      target.set(key, deepClone(value, map))
    })
  }
  if (sourceType === TYPES['array'] || sourceType === TYPES['object']) {
    for (const key in source) {
      target[key] = deepClone(source[key], map)
    }
  }
  return target
}

export default deepClone
