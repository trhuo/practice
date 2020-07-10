Function.prototype.myCall = function (context) {
  // context 可以是 null，此时使用window去执行
  // var context = context || window
  context.fn = this
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  var result = eval('context.fn(' + args + ')')
  // 记得要删除属性
  delete context.fn
  return result
}

Function.prototype.myApply = function (context: any, arr?: Array<any>) {
  // var context = context || window
  context.fn = this
  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for (var i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result
}

/**
 * 自定义实现 bind
 * bind方法：返回一个函数，这个函数执行的时候以 bind 方法传入的第一个参数作为执行上下文，之后的一系列参数将会在传递的实参前作为它的参数
 */
Function.prototype.myBind = function (context) {
  var fn = this
  var bindArgs = [].slice.call(arguments, 1)
  return function () {
    // 要考虑作为构造函数调用的情况
    var args = [].slice.call(arguments)
    return fn.apply(context, bindArgs.concat(args))
  }
}
