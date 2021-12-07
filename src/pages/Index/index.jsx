import React, { Component } from 'react'
// 引入样式
import "./index.css";
import "../../assets/fonts/iconfont.css"
// 引入Antd组件
import {Swiper, Grid } from "antd-mobile";
import axios from "axios";
// 导入如片
import nav_1 from "../../assets/image/nav-1.png";
import nav_2 from "../../assets/image/nav-2.png";
import nav_3 from "../../assets/image/nav-3.png";
import nav_4 from "../../assets/image/nav-4.png";


// 0b42f7973e101e66d916ef0db63d8e52
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
        ],
        // 租房小组数据
        groups:[],
        // 最新资讯数据
        news:[],
        location:"",
        // 当前城市信息
        curCityName:"上海"
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
    // 获取租房小组
    async getGroups(){
        const res = await axios.get("http://localhost:8080/home/groups",{
            params: {
                area: "AREA|88cff55c-aaa4-e2e0"
            }
        });
        this.setState({
            groups: res.data.body
        })
    }
    // 获取最新资讯
    async getNews(){
        const res = await axios.get("http://localhost:8080/home/news");
        this.setState({
            news: res.data.body
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
    // 渲染租房小组
    renderGroup = () => {
        const {groups} = this.state;
        return groups.map(item => (
            <Grid.Item key={item.id}>
                <div className="group_item">
                    <div className="desc">
                        <h2 className="group_title">{item.title}</h2>
                        <p className="group_desc">{item.desc}</p>
                    </div>
                    <img className="group_img" src={`http://localhost:8080${item.imgSrc}`} alt="img"></img>
                </div>
            </Grid.Item>
        ))
    }
    // 渲染最新资讯
    renderNews = () => {
        const {news} = this.state;
        return news.map(item => (
            <Grid.Item key={item.id}>
                <div className="news_item">
                    <div className="imgwrap">
                        <img className="news_img" src={`http://localhost:8080${item.imgSrc}`} alt="img"></img>
                    </div>
                    <div className="desc">
                        <h3 className="news_title">{item.title}</h3>
                        <div className="news_desc">
                            <span className="news_from">{item.from}</span>
                            <span className="news_date">{item.date}</span>
                        </div>
                    </div>
                </div>
            </Grid.Item>
        ))
    }
    async UNSAFE_componentWillMount(){
        // 获取轮播图数据
        this.getSwipers();
        // 获取租房小组数据
        this.getGroups();
        // 获取最新资讯数据
        this.getNews();
        let _this = this;
        await window.AMap.plugin('AMap.Weather',() => {
            //创建天气查询实例
            var weather = new window.AMap.Weather();
            //执行实时天气信息查询
            weather.getLive('成都市', function(err, data) {
                console.log(err, data);
                if(!err){
                    // 在render挂载之前获取到实时天气
                    // _this.setState({weather:data.weather,address:data.province+"省"+data.city})
                    console.log(data);
                    _this.setState({
                        location: data.city
                    })
                }
                else{
                    console.log('获取天气信息失败')
                }
            });
        });
        // 通过IP定位获取当前城市信息
        var myCity = new window.BMapGL.LocalCity();
        myCity.get(async res => {
            // console.log(res);
            const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`);
            // console.log(result.data.body.label);
            this.setState({
                curCityName:result.data.body.label
            })
        }); 
    }
    render() {
        const {curCityName} = this.state;
        return (
            <div className="index">
                {/* 轮播图 */}
                <div className="swiper">
                    <Swiper autoplay>
                        {
                            this.renderSwipers()
                        }
                    </Swiper>
                    {/* 顶部搜索框 */}
                    <div className="search_box">
                        {/* 左侧白色区域 */}
                        <div className="search">
                            {/* 位置选择区域 */}
                            <div 
                                className="location"
                                onClick={() => {this.props.history.push("/citylist")}}
                            >
                                <span className="name">{curCityName}</span>
                                <i className="iconfont icon-arrow"></i>
                            </div>
                            {/* 搜索区域 */}
                            <div 
                                className="form"
                                onClick={() => {this.props.history.push("/search")}}
                            >
                                <i className="iconfont icon-seach"></i>
                                <span className="text">请输入小区或地址</span>
                            </div>
                        </div>
                        {/* 右侧地图图标 */}
                        <div 
                            className="map_icon"
                            onClick={() => {this.props.history.push("/map")}}
                        >
                            <i className="iconfont icon-map"></i>
                        </div>
                    </div>
                </div>

                {/* 菜单选择项 */}
                <Grid columns={this.state.menu.length} gap={8}>
                    {this.renderMenu()}
                </Grid>
                {/* 租房小组 */}
                <div className="group">
                    <h3 className="title">
                        租房小组
                        <span className="more">更多</span>
                    </h3>
                    <Grid columns={2} gap={8}>
                        {this.renderGroup()}
                    </Grid>
                </div>
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="title">最新资讯</h3>
                    <Grid columns={1}>
                        {
                            this.renderNews()
                        }
                    </Grid>
                </div>
            </div>
        )
    }
}
