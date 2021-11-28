import React, { Component } from 'react'
// 引入样式
import "./index.css";
// 引入Antd组件
import {Swiper, Grid } from "antd-mobile";
import axios from "axios";
// 导入如片
import nav_1 from "../../assets/image/nav-1.png";
import nav_2 from "../../assets/image/nav-2.png";
import nav_3 from "../../assets/image/nav-3.png";
import nav_4 from "../../assets/image/nav-4.png";


export default class Index extends Component {
    state = {
        swipers: [],
        menu: [
            {
                id: "001",
                title:"整租",
                img: nav_1,
                path:"/list"
            },
            {
                id: "002",
                title:"合租",
                img: nav_2,
                path:"/list"
            },
            {
                id: "003",
                title:"地图找房",
                img: nav_3,
                path:"/map"
            },
            {
                id: "004",
                title:"去出租",
                img: nav_4,
                path: "/profile"
            }
        ]
    }
    // 获取轮播图
    async getSwipers(){
        const res = await axios.get("http://localhost:8080/home/swiper");
        // console.log(res);
        const result = res.data.body;
        this.setState({
            swipers: result
        })
    }
    // 渲染轮播图
    renderSwipers = () => {
        const {swipers} = this.state;
        return swipers.map(item => (
            <Swiper.Item key={item.id}>
                <a
                    key={item.id}
                    href="/"
                    style={{
                        display:"inline-block",
                        width:"100%",
                        height:"205px"
                    }}
                >
                    <img 
                        src={`http://localhost:8080${item.imgSrc}`} 
                        alt="img"
                        style={{width:"100%",verticalAlign:"top"}}
                    ></img>
                </a>
            </Swiper.Item>
        ))
    }
    // 渲染选择菜单
    renderMenu = () => {
        const {menu} = this.state;
        return menu.map(item => (
            <Grid.Item
                key={item.id}
                onClick={() => {
                    this.props.history.push(item.path);
                }}
            >
                <div className="menu_item">
                    <img className="menu_item_img" src={item.img} alt="menu_item"></img>
                    <h2 className="menu_item_title">{item.title}</h2>
                </div>
            </Grid.Item>
        ))
    }
    UNSAFE_componentWillMount(){
        this.getSwipers();
    }
    render() {
        return (
            <div className="index">
                {/* 轮播图 */}
                <Swiper autoplay>
                    {
                        this.renderSwipers()
                    }
                </Swiper>
                {/* 菜单选择项 */}
                <Grid columns={this.state.menu.length} gap={8}>
                    {this.renderMenu()}
                </Grid>
            </div>
        )
    }
}
