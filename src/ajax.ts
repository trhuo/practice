// 自己实现一个 ajax
interface AjaxOptions {
  url: string
  method?: string
  data?: any
  headers?: object
  responseType?: string
}
const ajax = function ({
  url,
  method = 'get',
  data,
  responseType,
}: AjaxOptions) {
  return new Promise((resolve, reject) => {
    // 定义一个 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest()
    // 设置请求地址和方法
    xhr.open(method, url, true)
    // 请求状态改变时的回调
    xhr.onreadystatechange = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.onerror = function () {
      reject(new Error(this.statusText))
    }
    xhr.responseType = responseType
    xhr.setRequestHeader('Accept', 'application/json')
    // 发送请求
    xhr.send(data)
  })
}

export default ajax
