//封装接口文件
import axios from 'axios';

//创建一个请求对象
const req = axios.create({
    baseURL: 'http://192.168.124.7:3000', // 基本路径
    timeout:  10000  //ms  请求10秒 超时限制！
})

//axios的封装
//请求商家信息
export function getSeller(){
    return req.get('/api/seller')
}
//请求商品信息
export function getGoods(){
    return req.get('/api/goods')
}
//请求评价信息
export function getEvaluate(){
    return req.get('/api/ratings')
}