import React, { Component } from 'react'
import { Route } from 'react-router-dom';
// 引入css样式
import "./index.css";
import { TabBar } from 'antd-mobile'
// 引入子组件
import Index from "../Index";
import List from "../List";
import News from "../News";
import Profile from "../Profile";
import Map from "../Map";

export default class Home extends Component {
    state = {
        tabs : [
            {
              key: '/',
              title: '首页',
              path: "/",
              icon: <i className="iconfont icon-ind" />
            },
            {
              key: '/list',
              title: '找房',
              path: "/list",
              icon: <i className="iconfont icon-findHouse" />
            },
            {
              key: '/news',
              title: '资讯',
              path: "/news",
              icon: <i className="iconfont icon-infom" />
            },
            {
              key: '/profile',
              title: '我的',
              path: "/profile",
              icon: <i className="iconfont icon-my" />
            },
        ],
        selectedTab: this.props.location.pathname
    }
    // 切换路径
    changePath = (key) => {
      this.props.history.push(key);
    }
    componentDidUpdate(prevProps){
      if(prevProps.location.pathname !== this.props.location.pathname){
        this.setState({
          selectedTab: this.props.location.pathname
        })
      }
    }
    render() {
        const {tabs,selectedTab} = this.state;
        console.log(selectedTab);
        return (
            <div className="home">
              <Route path="/" exact component={Index}></Route>
              <Route path="/list" component={List}></Route>
              <Route path="/news" component={News}></Route>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/map" component={Map}></Route>
              {/* 底部导航栏 */}
              {
                this.props.location.pathname === "/map" ? "" : (
                  <div className="home_footer">
                      <TabBar
                        defaultActiveKey={selectedTab}
                        activeKey={selectedTab}
                        onChange={key => this.changePath(key)}
                      >
                          {tabs.map(item => (
                              <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
                          ))}
                      </TabBar>
                  </div>
                )
              }

            </div>
        )
    }
}
/**
 * 解决路由切换时的高亮问题
 * 思路: 在路由切换时,也执行菜单高亮的逻辑代码
 * 1. 添加componentDidUpdate钩子函数
 * 2. 在钩子函数中判断路由地址是否切换
 * 2. 在路由地址切换的时候,让相应的菜单高亮
 */