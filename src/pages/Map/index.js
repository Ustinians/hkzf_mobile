import React, { Component } from 'react';
import {NavBar} from "antd-mobile";
import "./index.css"

export default class Map extends Component {
    componentDidMount(){
        // 初始化地图实例
        // 再react脚手架中,全局对象需要使用window来访问,否则将会造成ESLint校验错误
        // ... container这个必须是id选择器,不能是类选择器...
        var map = new window.BMapGL.Map("container");
        // 设置中心点坐标
        var point = new window.BMapGL.Point(116.404, 39.915);
        // 初始化地图,设置展示级别
        map.centerAndZoom(point, 15); 
    }
    back = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="map">
                {/* 顶部导航区域 */}
                <div className="map_top">
                    <NavBar back='返回' onBack={this.back}>
                        标题
                    </NavBar>
                </div>

                {/* 地图容器元素 */}
                <div id="container">

                </div>
            </div>
        )
    }
}
