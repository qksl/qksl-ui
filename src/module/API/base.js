/*
 * @Description: 基础API类
 * @Date: 2019-05-31 18:24:22
 * @Author: 郑道杨
 * @LastEditors: 郑道杨
 * @LastEditTime: 2019-06-27 20:49:58
 */
import Vue from 'vue'
import axios from 'axios'
import $router from '@/router'
import { getType } from '@/module/tools'

// import vue from 'vue'
// import router from '@/router'
// 添加请求拦截器(由于axios默认发送application/json数据，现有后端不支持，所以在直接请求java接口时，需添加拦截器，处理数据后发送请求
// ) axios.interceptors.request.use((config) => {   // 在发送请求之前,格式化参数，增加token let
// data = config.data   if (data) {     config.data = urlEncode(data, true)  }
// return config }, (error) => {   return Promise.reject(error) })
const vueProto = Vue.prototype
const baseUrl = '' // 获取配置文件中的Url
const timeout = 30000 // 超时时间

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前,格式化参数，增加token
  // console.log(config)
  let data = config.data
  if (data) {
    // config.data = urlEncode(data, true)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // console.log('拦截器')
  // Do something with response data
  return response
}, function (error) {
  console.log('拦截器报错', Object.keys(error), error.response)
  if (error.response.status === 401) {
    localStorage.setItem('Authorization', '')
    localStorage.setItem('userName', '')
    $router.push({ name: 'login' })
  } else {
    vueProto.$Message.error(`错误码: ${error.response.status}, ${error.response.statusText}`)
  }
  // Do something with response error
  return Promise.reject(error)
})

class Base {
  constructor () {
    // 后期需删除，该方式不优雅
    this.Authorization = localStorage.getItem('Authorization') || ''
    this.userName = localStorage.getItem('userName') || ''
  }
  /**
   * ajax主函数
   *
   * @param {Object} opt 请求参数，同axios option参数
   * @returns
   *
   * @memberOf api
   */
  async ajax (url, opt) {
    // 重置登录态
    if (!localStorage.getItem('Authorization')) {
      this.Authorization = ''
      this.userName = ''
    }
    opt.app = opt.app || '/v1/passport'
    // 需要登录并且没登录
    const options = Object.assign({
      timeout,
      url: baseUrl + opt.app + url,
      withCredentials: true,
      headers: {
        Authorization: this.Authorization
      }
    }, opt)

    // console.log('地址：', url)
    // console.log('请求方式：', options.method)
    // console.log('入参：', options.method === 'get' ? options.params : options.data)
    return new Promise((resolve, reject) => {
      // if (PLATFORM_NAME === '') { reject('请在API模块中设置PLATFORM_NAME，与后端保持一致') }
      axios(options).then(res => {
        // DEBUG 1 打开 0 关闭
        // console.log('地址：', url)
        // console.log('请求方式：', options.method)
        // console.log('入参：', options.method === 'get' ? options.params : options.data)
        // console.log('响应：', res.data)
        // console.log('===============')

        // 校验返回值结构
        if (typeof res.data !== 'object') {
          reject(new Error('返回值格式不正确'))
        }

        // if (!res.data.result) {
        //   console.log('去登陆')
        // } else {
        resolve(res.data)
        // }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }

  /**
   * get方法
   *
   * @param {String} url 接口地址
   * @param {Object} [params={}] 请求参数，默认为空对象
   * @param {Object} [options={}] 其它配置，同axios option 参数
   * @returns
   *
   * @memberOf api
   */
  get (url, params = {}, options = {}) {
    params._t = new Date().getTime()

    const opt = Object.assign({
      method: 'get',
      params
    }, options)

    return this.ajax(url, opt)
  }

  /**
   * post方法
   *
   * @param {String} url 接口地址
   * @param {Object} [data={}] 请求参数，默认为空对象
   * @param {Object} [options={}] 其它配置，同axios option 参数
   * @returns
   *
   * @memberOf api
   */
  post (url, data = {}, options = {}) {
    data._t = new Date().getTime()

    const opt = Object.assign({
      method: 'post',
      data
    }, options)

    return this.ajax(url, opt)
  }

  form (url, data = {}, options = {}) {
    let oForm
    if (getType(data) === 'FormData') {
      oForm = data
    } else {
      oForm = new FormData()
      Object.keys(data).forEach(attr => {
        if (data[attr]) oForm.append(attr, data[attr])
      })
    }

    const opt = Object.assign({
      method: 'post',
      'Content-Type': 'multipart/form-data',
      data: oForm
    }, options)
    return this.ajax(url, opt)
  }
}

export default Base

// function urlEncode (param, encode) {
//   if (param === null) return ''
//   var paramArr = []
//   for (let key in param) {
//     paramArr.push(`${key}=${((encode === null || encode) ? encodeURIComponent(param[key]) : param[key])}`)
//   }
//   return paramArr.join('&')
// }
