import axios from "axios";

const instance = axios.create({
    baseURL: "http://47.108.150.32:8099/laboratory",
    // headers:{
    //     'Access-Control-Allow-Origin':"*",
    //     'Content-Type':"application/octet-stream"
    // },
    timeout: 20000,
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (config && config.headers) { // 多一步判断
            config.headers['x-token'] = token
        }
        return config
    }, err => {
        return Promise.reject(err)
    });

// 响应拦截器

instance.interceptors.response.use(res => {
    return res.data
}, err => {
    return Promise.reject(err)
})



export default instance