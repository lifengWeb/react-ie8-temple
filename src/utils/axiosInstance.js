import axios from 'axios';
let axiosInstance = axios.create();
axiosInstance.defauls.baseURL = 'http://medical.artloveasy.com';
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.timeout = 10000
axiosInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axiosInstance