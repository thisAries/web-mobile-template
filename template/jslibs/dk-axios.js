/* eslint-disable no-param-reassign,consistent-return */
/**
 * Created by IvanCai on 2017/4/19.
 */
import axios from 'axios'
import utils from './dk-utils'
import { apiDomain } from '../configs/enviroment'

const dkAxios = axios.create({
  baseURL: apiDomain,
  timeout: 10000, // 设置超时时间
})
dkAxios.interceptors.request.use((config) => {
  window.showLoading()
  config.headers = { token: utils.getCookie('access_token') }
  return config;
}, error => Promise.reject(error));


dkAxios.interceptors.response.use((response) => {
  window.hideLoading()
  return response
}, (error) => {
  window.hideLoading()
  const { status, data } = error.response
  switch (status) {
    case 401:
      break
    case 412:
      break
    default:
      return Promise.reject(data);
  }
});
export default dkAxios
