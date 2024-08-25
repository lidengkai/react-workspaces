import { API } from '~/config'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  jsonToString,
  objectToFormData,
  objectToUrlSearch,
} from '~/utils/formatter'
import { SerializedError } from '@reduxjs/toolkit'

export type Opts<K extends keyof typeof APP_API> = AxiosRequestConfig & {
  /** 地址类型，根据类型决定前缀 */
  prefixType?: K
  /** body格式，默认为json */
  contentType?: 'json' | 'search' | 'form'
}

const instance = axios.create({
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.response.use(function (response) {
  const { baseURL } = response.config
  const result = response.data
  switch (baseURL) {
    case API[1]: {
      {
        if (result?.status === 1) {
          return response
        }
        throw {
          response,
          data: {
            code: result?.status,
            message: result?.message,
            stack: jsonToString(result),
          } as SerializedError,
        }
      }
    }
  }
  throw { response }
})

/** 请求接口 */
const request = <K extends keyof typeof APP_API = 1>(opts: Opts<K>) => {
  const { prefixType = 1, contentType = 'json', ...params } = opts
  if (!params.baseURL) {
    params.baseURL = API[prefixType]
  }
  if (params.data instanceof FormData) {
    params.headers = {
      ...params.headers,
      'Content-Type': 'multiple/form-data; charset=UTF-8',
    }
  } else {
    if (contentType === 'search') {
      params.headers = {
        ...params.headers,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
      params.data = objectToUrlSearch(params.data, false)
    } else if (contentType === 'json') {
      params.headers = {
        ...params.headers,
        'Content-Type': 'application/json; charset=UTF-8',
      }
    } else if (contentType === 'form') {
      params.data = objectToFormData(params.data)
      params.headers = {
        ...params.headers,
        'Content-Type': 'multiple/form-data; charset=UTF-8',
      }
    }
  }
  return new Promise<Api.Result[K]>((resolve, reject) => {
    instance
      .request(params)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) {
          return
        }
        if (process.env.NODE_ENV === 'development' || $APP_ENV !== 'prod') {
          logError(opts, error?.response)
        }
        if (error?.response?.status === 401) {
          location.replace('#/login')
          return
        }
        reject(error?.response?.data)
      })
  })
}

const logError = (opts: Opts<any>, response: AxiosResponse | undefined) => {
  const { method = 'GET', baseURL = '', url = '', params, data } = opts
  const tag = `[${method!.toLocaleUpperCase()}:${response?.status ?? ''}]`
  let completeURL = ''
  if (/https?:\/\//.test(baseURL)) {
    completeURL += baseURL
  } else {
    completeURL += location.origin + location.pathname.replace(/\/[^\/]*$/, '')
    completeURL += /^\//.test(baseURL) ? baseURL : '/' + baseURL
  }
  completeURL += /^\//.test(url) ? url : '/' + url
  const search = objectToUrlSearch(params)
  window.console.error(tag + completeURL + search, data, response?.data)
}

export default request
