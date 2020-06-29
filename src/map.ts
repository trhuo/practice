/**
 * 用法：arr.map((currentValue, index, array) => {}, thisArg)
 */
Array.prototype.myMap = function () {
  const result = new Array(this.length)
  const [cb, thisArg] = [].slice.call(arguments)
  if (typeof cb !== 'function') {
    throw new Error('cb must be a function')
  }
  // this 是一个数组，对数组中的每一项执行cb
  for (let i = 0; i < this.length; i++) {
    result[i] = cb.call(thisArg, this[i], i, this)
  }
  return result
}
