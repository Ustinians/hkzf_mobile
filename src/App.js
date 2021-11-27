import React, { Component } from 'react';
// 引入常用的路由
import {Route,Link} from "react-router-dom"
// 导入需要的路由组件(页面)
import Home from "./pages/Home";
import CityList from "./pages/CityList";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 配置导航菜单 */}
        <Link to="/home">首页</Link>
        <Link to="/citylist">城市列表</Link>
        {/* 配置路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
      </div>
    )
  }
}
