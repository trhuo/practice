/**
 * 返回一个函数，该函数有如下特点：
 * 1.当接收到的参数数量小于原函数的形参数量，返回一个函数继续接收剩余参数；
 * 2.当接收到的参数数量等于原函数的形参数量，执行原函数
 * @param fn 需要柯里化的函数
 * @param len 所需要的参数个数，默认为原函数的形参个数
 */
function curry(fn: Function, len: number = fn.length) {
  return _curry.call(this, fn, len)
}

function _curry(fn, len, ...args) {
  return function (...params) {
    const newArgs = [...args, ...params]
    if (args.length === len) {
      // 执行原函数
      return fn.apply(this, newArgs)
    } else if (newArgs.length < len) {
      return _curry.call(this, fn, len, ...newArgs)
    }
  }
}

export default curry
