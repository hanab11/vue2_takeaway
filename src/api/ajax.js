/**
 * ajax请求函数模块
 * 返回值：promise对象，data也是promise对象
 */
import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  // 用高阶函数封装，返回值是resolve或reject的结果
  return new Promise(function (resolve, reject) {
    // 一、执行异步ajax请求（用axios）
    let promise // 准备promise对象
    if (type === 'GET') {
      let dataStr = '' // 准备拼接字符串（按query参数格式）

      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&' // 最后&结尾
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url) // 发送get请求（带参url）

    } else {
      promise = axios.post(url, data) // 发送post请求（原url和数据）
    }

    // 二、等待异步response响应（用promise的then、catch，也可以用async、await实现）
    promise.then(
      (response) => resolve(response.data) // 成功了调用resolve()返回data
    ).catch(
      (error) => reject(error) // 失败了调用reject()返回error
    )
  })
}
/* 
const response = await ajax() // 不能直接取data是因为结果不确定，可能是response、error对象
const result = response.data

const result = await ajax() // 封装的目的，直接获取结果而不是响应对象
 */