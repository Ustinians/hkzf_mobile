import React, { Component } from 'react';
// 引入常用的路由
import {Route} from "react-router-dom"
// 导入需要的路由组件(页面)
import Home from "./pages/Home";
import Map from "./pages/Map";
import CityList from "./pages/CityList";
import Search from "./pages/Search";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        {/* 配置路由 */}
        <Route path="/" exact component={Home}></Route>
        <Route path="/map" component={Map}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/search" component={Search}></Route>
      </div>
    )
  }
}
