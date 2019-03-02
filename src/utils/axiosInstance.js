import axios from 'axios';
const message = require('antd/lib/message');
const that = this;
function getAxios(url,method,data,success,fail){
  //获取token
  let arr,token,reg=new RegExp("(^| )"+'token'+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
     token = unescape(arr[2])
   }


  let axiosInstance = axios.create();
  axiosInstance.defaults.withCredentials = true;
  axiosInstance.defaults.timeout = 10000;
  if(!token){
    window.location.href='/login';
  }
  if(method=='post'){
    axiosInstance.post(url,data,{
      headers:{
        Authorization:token
      }
    })
    .then((response)=> {
      if(response.data.code==200){     
        success&&success(response.data);       
      }else{
        fail&&fail(response.data);
        // message.error(data.msg);
      }     
    })
    .catch(function (error) {
      console.log(error);
    });
  }else if(method=='get'){
    axiosInstance.get(url,{
      headers:{
        Authorization:token
      }
    })
    .then((response)=> {
      if(response.data.code==200){     
        success&&success(response.data);       
      }else{
        fail&&fail(response.data);
        // message.error(data.msg);
      }     
    })
    .catch(function (error) {
      console.log(error);
    });
  }else if(method=='patch'){
    axiosInstance.patch(url,data,{
      headers:{
        Authorization:token
      }
    })
    .then((response)=> {
      if(response.data.code==200){     
        success&&success(response.data);       
      }else{
        fail&&fail(response.data);
        // message.error(data.msg);
      }     
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else if(method=='delete'){
    axiosInstance.delete(url,{
      headers:{
        Authorization:token
      }
    })
    .then((response)=> {
      if(response.data.code==200){     
        success&&success(response.data);       
      }else{
        fail&&fail(response.data);
        // message.error(data.msg);
      }     
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  


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
}

 module.exports = getAxios;