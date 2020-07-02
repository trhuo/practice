/**
 * 用法：arr.map((currentValue, index, array) => {}, thisArg)
 */
export function myMap<T, P>(
  arr: Array<P>,
  cb: (currentValue: P, index?: number, arr?: Array<P>) => T,
  context?: any // 执行 callback 的上下文
): T[] {
  const result = new Array<T>(this.length)
  // 通过 Array.prototype.slice.call(arguments) 可以将 arguments 转化为数组
  // const [cb, thisArg] = [].slice.call(arguments)
  if (typeof cb !== 'function') {
    throw new Error('callback must be a function')
  }
  // this 是一个数组，对数组中的每一项执行cb
  for (let i = 0; i < arr.length; i++) {
    result[i] = cb.call(context, arr[i], i, arr)
  }
  return result
}

export function myFilter<T>(
  arr: Array<T>,
  cb: (currentValue: T, index?: Number, arr?: Array<T>) => Boolean,
  context?: any // 执行 callback 的上下文
): T[] {
  const result = new Array<T>()
  if (typeof cb !== 'function') {
    throw new TypeError('callback must be a function')
  }
  for (let i = 0; i < arr.length; i++) {
    // 调用 cb ，如果 cb 返回true，将 arr[i] 放到结果中
    if (cb.call(context, arr[i], i, arr)) {
      result.push(arr[i])
    }
  }
  return result
}

export function myReduce<T, P>(
  arr: Array<T>,
  cb: (acc: P, cur: T, index?: number, arr?: Array<T>) => P,
  initialVal?: T
): P {}
