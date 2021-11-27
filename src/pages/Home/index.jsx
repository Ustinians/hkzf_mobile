import React, { Component } from 'react'
// 引入css样式
import "./index.css";
import { Badge, TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

export default class Home extends Component {
    state = {
        tabs : [
            {
              key: 'home',
              title: '首页',
              icon: <AppOutline />,
              badge: Badge.dot,
            },
            {
              key: 'todo',
              title: '我的待办',
              icon: <UnorderedListOutline />,
              badge: '5',
            },
            {
              key: 'message',
              title: '我的消息',
              icon: (active) =>
                active ? <MessageFill /> : <MessageOutline />,
              badge: '99+',
            },
            {
              key: 'personalCenter',
              title: '个人中心',
              icon: <UserOutline />,
            },
          ]
    }
    render() {
        const {tabs} = this.state;
        return (
            <div className="home">
                {/* 底部导航栏 */}
                <div className="home_footer">
                    <TabBar>
                        {tabs.map(item => (
                            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                        ))}
                    </TabBar>
                </div>

            </div>
        )
    }
}
