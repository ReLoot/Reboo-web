import axios from 'axios'
import apis from './api'
import store from '@/store'
// import {showTipsMsg} from '@/utils/message'

var http = axios.create({
  baseURL: '/',
  timeout: 60000
})

http.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  config.headers['Authorization'] = 'Bearer '+store.getters['common/token']
  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
    if (response && response.data.code == '401') {
      store.dispatch('user/cleanAccount')
      store.commit('common/authentication', false)
      const warnning = 'Authentication failed'
      // showTipsMsg(warnning)
      throw new Error(warnning)
    }
    return response
  }, function (error) {
    return Promise.reject(error)
  }
)

const httpHandler = {
  get (url, param={}, name) {
    store.dispatch('common/addLoading', name)
    return new Promise((resolve, reject) => {
      http({ method: 'get', url: url, params: param, body: param })
        .then(result => {
            store.dispatch('common/deleteLoading', name)
            if (result.status === 200)
              resolve(result.data)
            else
              reject(result.data)
        }).catch(err => {
          store.dispatch('common/deleteLoading', name)
          reject(err)
        })
    })
  },
  post (url, param = {}, name) {
    return new Promise((resolve, reject) => {
      store.dispatch('common/addLoading', name)
      http({ method: 'post', url: url, data: param })
        .then(({status, data}) => {
            store.dispatch('common/deleteLoading', name)
            if (status === 200)
              resolve(data)
            else
              reject(data)
        }).catch(err => {
            store.dispatch('common/deleteLoading', name)
            reject(err)
        })
    })
  },
  put (url, param = {}, name) {
    return new Promise((resolve, reject) => {
      http({ method: 'put', url: url, data: param })
        .then(({status, data}) => {
            if (status === 200)
              resolve(data)
            else
              reject(data)
        }).catch(err => {
            reject(err)
        })
    }) 
  }
}

const cus_http = (name, params) => {
    let tag_api = apis[name], 
        methods = tag_api['methods'],
        url = tag_api['url']
    return httpHandler[methods](url, params, name)
}




export default cus_http
