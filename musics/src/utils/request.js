/*
 * @Author: 李晓丹 
 * @Date: 2019-09-03 16:30:09 
 * @Last Modified by: guowujuan
 * @Last Modified time: 2019-09-06 15:57:39
 */

import axios from 'axios'
// import router from '@/router/index'

var instance = axios.create(); //创建axios的实例  
// 全局拦截

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 是不是登录和注册接口  /api/login  返回值为boolean
    let notTokenUrl = ['/api/login','/api/registry'];
    // 发送请求之前
    return notTokenUrl.includes(config.url) ? config : {
        ...config,
        headers:{
            ...config.headers,
          token:window.localStorage.getItem('token') //登录成功 token 存储到localStorage    ---
        }
    };
  }, function (error) {
    // 若请求错误
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 若响应数据
    return response
  }, function (error) {
      
      let {status} =  error.response;

      console.log(error.response)

      if(status < 500){
         switch (status) {
             case 422:
                 alert("参数有误")
                 break;
             case 401:
                alert("没有权限");
                router.push('/login')
                break;
             default:
                 break;
         }
      }else{
         alert("服务器端错误")
      }
    // 若响应错误
    return Promise.reject(error);
  });

  export default {
      post(url,data){
        return instance.post(url,data)
      },
      get(url,data){
        return instance.get(url,{params:data})
      }
  }