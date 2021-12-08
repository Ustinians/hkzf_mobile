/**
 * 用来封装功能性函数
 */
import axios from "axios";
// 获取当前城市的函数
export const getCurrentCity = () => {
    // 1. 判断localStorage中是否有定位城市
    const localCity = JSON.parse(localStorage.getItem("hkzf_city"));
    if(!localCity){
        return new Promise((reslove,reject) => {
            // 如果内存中不存在定位城市,就获取定位城市并将其存储在内存中,然后返回该城市的数据
            // 通过IP定位获取当前城市信息
            var myCity = new window.BMapGL.LocalCity();
            myCity.get(async res => {
                try{
                    const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`);
                    // console.log(result.data.body.label);
                    // 存储到本地
                    localStorage.setItem("hkzf_city",JSON.stringify(result.data.body));
                    // 返回该城市数据
                    reslove(result.data.body);
                }catch(e){
                    // 获取定位城市失败
                    reject(e);
                }
            }); 
        })
    }
    // 如果本地存储中有
    // 因为上面处理返回值使用了Promise,为了保证返回值的统一,仍然使用Promise
    // 此处Promise不会失败,直接返回一个成功的Promise即可
    return Promise.resolve(localCity);
}