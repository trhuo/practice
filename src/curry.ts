/**
 * 返回一个函数，该函数有如下特点：
 * 1.当接收到的参数数量小于原函数的形参数量，返回一个函数继续接收剩余参数；
 * 2.当接收到的参数数量等于原函数的形参数量，执行原函数
 */
function curry(fn, ...args) {
  return args.length < fn.length
    ? (...newArgs) => curry(fn, ...args, ...newArgs)
    : fn(...args)
}

export default curry
