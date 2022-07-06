import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { message } from 'antd'
import { filterObject, objToUrlParams } from '@/utils/common'

let service: AxiosInstance

/** @description 根据状态码拿到错误信息 */
function getErrMsg(status: number) {
  const msgMap = new Map([
    [400, '错误请求'],
    [401, '请求未授权'],
    [404, '请求路径错误'],
    [500, '服务器异常'],
  ])
  return msgMap.get(status)
}
function http(Config: AxiosRequestConfig) {
  service = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    ...Config,
  })

  /** @description 请求拦截 */
  service.interceptors.request.use(
    (config) => {
      config.method = config.method?.toLocaleLowerCase() || 'get'
      config.headers = config.headers || {}
      config.headers.AuthorizationToken = localStorage.getItem('token') || ''
      // 处理请求参数
      if (config.method === 'post') {
        config.data = config.data || {}
        const contentType = (config.headers['Content-Type'] || '') as string
        if (contentType.includes('json')) {
          config.transformRequest = [
            (data) => data && JSON.stringify(filterObject(data)),
          ]
        } else if (contentType.includes('urlencoded')) {
          config.transformRequest = [(data) => data && objToUrlParams(data)]
        }
      } else if (config.method === 'get') {
        config.params = {
          ...config.params,
          ...config.data,
        }
        config.paramsSerializer = (data) => data && objToUrlParams(data)
      }
      config.withCredentials = !!config.withCredentials
      return config
    },
    (err) => {
      Promise.reject(err)
    }
  )

  service.interceptors.response.use(
    (response) => {
      const data = response.data
      if (data.code === 21000) {
        message.error('登陆已过期')
      } else if (!data || (data.code && data.code !== 0)) {
        message.error(response.data.msg || '请求数据异常，请稍后再试')
      }
    },
    (err) => {
      const status = err.response.status
      const errMsg = getErrMsg(status) || '服务异常'
      if (`${err.message}`.indexOf('timeout') !== -1) {
        message.error('网络超时')
      } else {
        message.error(errMsg)
      }
      return Promise.reject(err)
    }
  )
}

const POST = (url: string, data = {}, config = {}) => {
  http(config)
  return service.post(url, data)
}

const GET = (url: string, data = {}, config = {}) => {
  http(config)
  return service.get(url, {
    params: data,
  })
}

const PUT = (url: string, data = {}, config = {}) => {
  http(config)
  return service.put(url, data)
}

const DELETE = (url: string, data = {}, config = {}) => {
  http(config)
  return service.put(url, { data })
}

const request = {
  POST,
  GET,
  PUT,
  DELETE,
}

export default request
