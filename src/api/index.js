// 定义接口请求文件
import ajax from "./ajax";
const BASE = "http:localhost:8080";

export const getSwiper = () => ajax(BASE+"/home/swiper");