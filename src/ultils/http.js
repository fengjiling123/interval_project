import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import history from './history';

export const baseURL = '';

function getToken (name = 'token') {
  return window.localStorage.getItem(name)
}

let instance = axios.create({
  baseURL,
  // transformRequest: [data => JSON.stringify(data)],
  transformRequest: [function (data) {
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
  }],
  transformResponse: [data => data],
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': getToken(),
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  validateStatus: function (status) {
    // return status >= 200 && status < 300; // default
    // 暂未考虑请求出错的情况
    return true;
  },
  responseType: 'json'
});

instance.interceptors.request.use(config => {
  return config;
})

instance.interceptors.response.use(
  res => {
    if (res.config.responseType === 'blob') return res;
    if (res.data && res.data.code == 200) {
      return res;
    } else {
      if (res.data.code == 210) {
        history.push("/login");
      }
      message.error(res.data.msg);
      return Promise.reject(res.data);
    }
  },
  error => {
    return Promise.reject(error);  // 返回接口返回的错误信息
  });

let request = {};

request.get = (url, params = {}, config = {}) => {
  config.headers = {
    'Authorization': getToken()
  }
  return instance.get(url, {
    params,
    ...config
  }).then(res => res.data);
}

request.post = (url, data = {}, config = {}) => {
  config.headers = {
    ...config.headers,
    'Authorization': getToken()
  }
  return instance.post(url, data, config).then(res => config.responseType === 'blob' ? res : res.data);
}


request.del = (url, data = {}, config = {}) => {
  config.headers = {
    'Authorization': getToken()
  }
  return instance.delete(url, {
    data,
    ...config
  }).then(res => res.data);
}

request.put = (url, data, config = {}) => {
  config.headers = {
    'Authorization': getToken()
  }
  return instance.put(url, data, {
    ...config
  }).then(res => res.data);
}

export default request;

