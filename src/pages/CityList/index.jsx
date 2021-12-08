import React, { Component } from 'react'
import axios from "axios";
import {NavBar} from "antd-mobile";
import {getCurrentCity} from "../../utils/index";
// 导入react-virtualized中的List组件
import {List} from 'react-virtualized';
import "./index.css"

// List data as an array of strings
const list = Array(100).fill("react-virtualized");
  
function rowRenderer({
    key, // Unique key within array of rows
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在list中是否可见
    style, // 样式对象(指定每一项的样式)
    // 作用:指定每一行的位置
}) {
    return (
      <div key={key} style={style}>
        {list[index]}
      </div>
    );
}

// 定义一个数据格式化的方法
const formatCityData = (list) => {
    const cityList = {};
    // 1. 遍历list数组
    list.forEach(item => {
        // 2. 分类(获取每一个城市的首字母)
        const first = item.short.substr(0,1);
        // 3. 判断cityList中是否有该分类
        if(cityList[first]){
            // 4. 如果有,直接push到该分类中
            cityList[first].push(item);
        }
        else{
            // 5. 如果没有,就先创建一个数组,将当前城市信息添加到数组中
            cityList[first] = [item];
        }
    })
    // 获取索引数据
    // 将cityList的索引按照升序排序并存储在cityIndex中
    const cityIndex = Object.keys(cityList).sort(); // 按照升序排列
    return {
        cityList,
        cityIndex
    }
}

export default class CityList extends Component {
    back = () => {
        this.props.history.goBack();
    }
    // 获取城市列表数据的方法
    getCityLisy = async () => {
        const result = await axios.get('http://localhost:8080/area/city?level=1');
        console.log(result);
        const {cityList,cityIndex} = formatCityData(result.data.body);
        // 获取热门城市列表数据并将其添加到cityList和cityIndex中
        const hotRes = await axios.get("http://localhost:8080/area/hot");
        console.log(hotRes);
        cityList['hot'] = hotRes.data.body;
        cityList['#'] = await getCurrentCity();
        cityIndex.unshift('hot');
        cityIndex.unshift('#');
        console.log(cityList);
        console.log(cityIndex);
    }
    componentDidMount(){
        this.getCityLisy();
    }
    render() {
        return (
            <div className="citylist">
                {/* 城市列表界面 */}
                {/* 顶部导航栏区域 */}
                <div className="citylist_top">
                    <NavBar back='返回' onBack={this.back}>
                        城市选择
                    </NavBar>
                </div>
                <List
                    width={300}
                    height={300} // 列表的宽度和高度
                    rowCount={list.length}
                    rowHeight={20} // 每一行的高度
                    rowRenderer={rowRenderer}
                />,
            </div>
        )
    }
}
