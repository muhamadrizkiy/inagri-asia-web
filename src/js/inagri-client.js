/**
 * Created by muhamadrizki on 25/07/17.
 */

import axios from 'axios'
import { webStorage } from './utils'

const API_BASE = 'https://api.svara.id/v1/';

export default {
  loginApp () {
    return new Promise((resolve, reject) => {
      const credential = {
        username: 'svara-debug',
        password: 'svara-debug',
      };
      axios.post(`${API_BASE}apps/auth/login`, credential).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loginAccount (credential) {
    return new Promise((resolve, reject) => {
      this.loginApp().then((token) => {
        axios.post(`${API_BASE}auth/login?jwt=${token.accessToken}`, credential).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        })
      }).catch((error) => {
        reject(error)
      })
    })
  },
  registerAccount (account) {
    return new Promise((resolve, reject) => {
      this.loginApp().then((token) => {
        account.userParam = {
          appId: token.appId
        };
        axios.post(`${API_BASE}auth/signup?jwt=${token.accessToken}`, account).then((response) => {
          if (response.data.id === undefined)
            reject(response.data)
          else
            resolve(response.data)
        }).catch((error) => {
          reject(error)
        })
      }).catch((error) => {
        reject(error)
      })
    })
  },
  apiGet (url, params = {}) {
    let _params = Object.assign(params);
    _params.jwt = webStorage.getItem('token');
    return axios.get(API_BASE + url, {
      params: _params
    })
  },
  apiPost (url, data, config = {}) {
    let _params = {
      jwt: webStorage.getItem('token')
    };
    return axios.post(API_BASE + url, data, {
      params: _params,
      ...config
    })
  },
  apiPut (url, data) {
    let _params = {
      jwt: webStorage.getItem('token')
    };
    return axios.put(API_BASE + url, data, {
      params: _params
    })
  },
  apiDelete (url) {
    let _params = {
      jwt: webStorage.getItem('token')
    };
    return axios.delete(API_BASE + url, {
      params: _params
    })
  },
  apiHead (url, params = {}) {
    let _params = Object.assign(params);
    _params.jwt = webStorage.getItem('token');
    return axios.head(API_BASE + url, {
      params: _params
    })
  },
}