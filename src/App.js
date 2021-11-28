import React, { Component } from 'react';
// 引入常用的路由
import {Route} from "react-router-dom"
// 导入需要的路由组件(页面)
import Home from "./pages/Home";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 配置路由 */}
        <Route path="/" component={Home}></Route>
      </div>
    )
  }
}
