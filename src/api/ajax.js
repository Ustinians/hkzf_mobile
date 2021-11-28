import axios from "axios";
/**
 * 封装一个能发送Ajax异步请求的函数模块
 */

export default function ajax(url,data = {},type = "GET"){
    return new Promise(resolve => {
        let promise;
        // 执行异步ajax请求
        if(type === "GET") {
            promise = axios.get(url,{
                params: data
            })
        }
        // 发送POST请求
        else {
            promise = axios.post(url,data);
        }
        // 如果成功了,调用reslove(value)
        promise.then(res => {
            resolve(res);
        }).catch(error => {
            console.log("请求出错了"+error.message);
        })
    })
}