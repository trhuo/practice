const isFn = (param) => typeof param === 'function'

enum Status {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

type ConstructorParam = (
  resolve: (val?: any) => any,
  reject: (val?: any) => any
) => any

type FulfilledFn = (val?: any) => any

type RejectedFn = (err?: any) => any

class MyPromise {
  private status: Status
  private value: any
  private fulfilledQueues: Array<any>
  private rejectedQueues: Array<any>
  constructor(handler: ConstructorParam) {
    if (!isFn(handler)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    // 状态
    this.status = Status.PENDING
    // 返回值
    this.value = undefined
    // 成功回调函数队列
    this.fulfilledQueues = []
    // 失败回调函数队列
    this.rejectedQueues = []
    try {
      handler(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {}
  }
  /**
   * resolve 执行函数
   * @param val resolve 数据
   */
  resolve(val?: any) {
    const run = () => {
      if (this.status !== Status.PENDING) return
      // 依次执行成功队列中的函数，清空队列
      const runFulfilled = (val) => {
        let cb
        while ((cb = this.fulfilledQueues.shift())) {
          cb(val)
        }
      }
      // 依次执行失败队列中的函数，清空队列
      const runRejected = (err) => {
        let cb
        while ((cb = this.rejectedQueues.shift())) {
          cb(err)
        }
      }
      // 如果参数为 MyPromise 对象，则必须等待参数 MyPromise 对象状态改变后，当前 MyPromise 对象才会改变，且状态取决于参数对象状态
      if (val instanceof MyPromise) {
        val.then(
          (val) => {
            this.value = val
            this.status = Status.FULFILLED
            runFulfilled(val)
          },
          (err) => {
            this.value = err
            this.status = Status.REJECTED
            runRejected(err)
          }
        )
      } else {
        this.value = val
        this.status = Status.FULFILLED
        runFulfilled(val)
      }
    }
    setTimeout(run, 0)
  }
  /**
   * reject 执行函数
   * @param err 异常信息
   */
  reject(err?: any) {
    if (this.status !== Status.PENDING) return
    const run = () => {
      this.status = Status.REJECTED
      this.value = err
      let cb
      while ((cb = this.rejectedQueues.shift())) {
        cb(err)
      }
    }
    setTimeout(run, 0)
  }
  /**
   * MyPromise then 方法，返回一个 MyPromise 对象
   * @param onFulfilled
   * @param onRejected
   */
  then(onFulfilled: FulfilledFn, onRejected?: RejectedFn) {
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      const fulfilled = (value) => {
        try {
          if (!isFn(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            const res = onFulfilled(value)
            if (res instanceof MyPromise) {
              // 当前回调函数返回的是 MyPromise 对象
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }
      // 封装一个失败时执行的函数
      const rejected = (err) => {
        try {
          if (!isFn(onRejected)) {
            onRejectedNext(err)
          } else {
            const res = onRejected(err)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }
      switch (this.status) {
        // 当状态为 pending 时，将 then 方法回调函数加入到执行队列等待执行
        case Status.PENDING:
          this.fulfilledQueues.push(fulfilled)
          this.rejectedQueues.push(rejected)
          break
        // 当状态已经改变时，立即执行对应的回调函数
        case Status.FULFILLED:
          fulfilled(this.value)
          break
        case Status.REJECTED:
          rejected(this.value)
          break
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态 resolve 方法
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve) => resolve(value))
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value))
  }
  static all(list: Array<any>) {
    return new MyPromise((resolve, reject) => {
      // 返回值的集合
      let values = []
      let count = 0
      for (const [index, promise] of list.entries()) {
        this.resolve(promise).then(
          (res) => {
            values[index] = res
            count++
            if (count === list.length) resolve(values)
          },
          (err) => {
            reject(err) // 有一个被 reject，整体就变 rejected
          }
        )
      }
    })
  }
  static race(list: Array<any>) {
    return new MyPromise((resolve, reject) => {
      for (const p of list) {
        // 只要有一个实例率先改变状态，新的 MyPromise 状态就跟着改变
        this.resolve(p).then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }
  finally(cb) {
    return this.then(
      (value) => MyPromise.resolve(cb()).then(() => value),
      (reason) =>
        MyPromise.resolve(cb()).then(() => {
          throw reason
        })
    )
  }
}
