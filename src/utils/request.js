import axios from 'axios'
import * as local from '@/utils/local'
import router from '../router'
import store from '@/store'
import * as env from './env'
import {
  getToken
} from '@/utils/auth'

import {
  Notification,
  MessageBox,
  Message
} from 'element-ui'

let cancel
const promiseArr = {}
const CancelToken = axios.CancelToken

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // console.log('axios interceptors: ', response)
  let errorMessage = ''
  if (typeof response.data !== 'object') {
    return response.data
  }
  if (response.data.code != 1000) {
    errorMessage = response.data.message || '系统繁忙，请稍后重试'
  }
  if (errorMessage) {
    Notification({
      title: '错误',
      message: errorMessage,
      type: 'error'
    })
    return Promise.reject(response.data)
  }
  return response.data;
}, error => {
  if (error && error.response) {
    if (error.response.data.type === 'application/json') {
      var reader = new FileReader()
      reader.onload = (e) => {
        const errMsg = JSON.parse(e.target.result)
        error.message = errMsg.failureReason
        Notification({
          title: '错误',
          message: error.message,
          type: 'error'
        })
      }
      reader.readAsText(error.response.data)
      return Promise.reject(error.response)
    }
    error.message = error.response.data.message
    // switch (error.response.status) {
    //   case 400:
    //     // error.message = '错误请求'
    //     break

    //   default:
    //     error.message = `连接错误${error.response.status}`
    // }
  } else {
    error.message = '连接到服务器失败'
  }

  Notification({
    title: '错误',
    message: error.message,
    type: 'error'
  })

  if (error.response.status == 401) {
    router.replace({
      path: '/401',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  // 授权超时
  if (error.response.status == 401009) {
    local.remove()
    router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }

  return Promise.reject(error.response)
})

// axios.defaults.baseURL = env.VUE_APP_ADMIN_API
axios.defaults.baseURL = env.VUE_APP_ADMIN_API
axios.defaults.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
axios.defaults.timeout = 600000

// 拼接参数
const formatParam = (params) => {
  if (!params) return ''

  let result = ''
  Object.keys(params).map((key, index) => {
    const val = params[key]
    if ((typeof (val) === 'object') && val.constructor == Array) {
      for (let i = 0; i < val.length; i++) {
        const element = val[i]
        if (typeof (element) !== 'undefined' && element != null && element !== '') {
          result += result.length <= 0
            ? `?${key}=${element}`
            : `&${key}=${element}`
        }
      }
    } else if (typeof (val) !== 'undefined' && val != null && val !== '') {
      result += result.length <= 0
        ? `?${key}=${val}`
        : `&${key}=${val}`
    }
  })

  return result
}

export default {
  get(url, param, responseType = 'application/json',
    timeout = 60000) {
    url += formatParam(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        // params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(function(error) {
        reject(error)
      })
    })
  },
  post(url, param, responseType = 'application/json',
    timeout = 60000) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        data: param,
        // params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(function(error) {
        reject(error)
      })
    })
  },
  put(url, param, responseType = 'application/json', timeout = 60000) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delete(url, param, responseType = 'application/json',
    timeout = 60000) {
    url += formatParam(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(function(error) {
        reject(error)
      })
    })
  }
}
