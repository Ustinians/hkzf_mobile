import React, { Component } from 'react'
import { Route } from 'react-router-dom';
// 引入css样式
import "./index.css";
import { Badge, TabBar } from 'antd-mobile'
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
              key: 'home',
              title: '首页',
              path: "/",
              icon: <i className="iconfont icon-ind" />,
              badge: Badge.dot,
            },
            {
              key: 'todo',
              title: '找房',
              path: "/list",
              icon: <i className="iconfont icon-findHouse" />,
              badge: '5',
            },
            {
              key: 'message',
              title: '资讯',
              path: "/news",
              icon: <i className="iconfont icon-infom" />,
              badge: '99+',
            },
            {
              key: 'personalCenter',
              title: '我的',
              path: "/profile",
              icon: <i className="iconfont icon-my" />,
            },
        ],
        selectedTab: "/"
    }
    // 切换路径
    changePath = (key) => {
      const {tabs }= this.state;
      const tab = tabs.find(item => item.key === key);
      this.props.history.push(tab.path);
    }
    // 确定当前高亮导航项
    findNowTab = (path) => {
      const {tabs }= this.state;
      const tab = tabs.find(item => item.path === path);
      return tab ? tab.key : "/";
    }
    UNSAFE_componentWillMount(){
      this.setState({
        selectedTab: this.findNowTab(this.props.location.pathname)
      })
    }
    render() {
        const {tabs,selectedTab} = this.state;
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
                        onChange={key => this.changePath(key)}
                      >
                          {tabs.map(item => (
                              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                          ))}
                      </TabBar>
                  </div>
                )
              }

            </div>
        )
    }
}
