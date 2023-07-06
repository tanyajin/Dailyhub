import axios from 'axios'
import queryString from 'query-string'

//后端地址
const baseUrl = 'http://127.0.0.1:5000/myroom';
// 获取存储在localStorage中的token
const getToken =()=> localStorage.getItem('token');

const axiosClient = axios.create({
    baseURL: baseUrl,
    // 设置参数序列化函数
    paramsSerializer: params => queryString.stringify({params})
})
// 请求拦截器，用于在发送请求之前对请求进行处理
axiosClient.interceptors.request.use(async config =>{
    return {
        ...config,
        headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    }
})
// 响应拦截器，用于在接收到响应后对响应进行处理
axiosClient.interceptors.response.use(response =>{
    if(response&& response.data){
        return response.data
    }
    return response;
},err =>{
    if(!err.response){
        console.error(err)
        return alert (err)
    }
    throw err.response
})

export default axiosClient
