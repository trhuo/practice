var EventEmitter = function () {
  this.events = {}
}

/**
 * 注册事件
 */
EventEmitter.prototype.on = function (event, cb) {
  if (Array.isArray(event)) {
    event.forEach((item) => {
      this.on(item, cb)
    })
  } else {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(cb)
  }
}

/**
 * 触发事件
 */
EventEmitter.prototype.emit = function (event) {
  const cbs = this.events[event]
  const args = [].slice.call(arguments, 1)
  if (cbs && cbs.length) {
    cbs.forEach((cb) => {
      cb.apply(this, args)
    })
  }
}
/**
 * 注册一个一次性事件
 */
EventEmitter.prototype.once = function (event, cb) {
  function on() {
    this.off(event, on) // 从注册事件中销毁这个事件回调
    cb.apply(this, arguments)
  }
  on.fn = cb
  this.on(event, on)
}
/**
 * 删除 key 为 event 中的 cb
 */
EventEmitter.prototype.off = function (event, cb) {}
