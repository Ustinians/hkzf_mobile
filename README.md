# React好客租房mobile项目
## 项目准备
### 项目介绍
技术栈
* React核心库: `react`,`react-dom`,`react-router-dom`
* 脚手架: `create-reqct-app`
* 数据请求: `axios`
* UI组件库: `antd-mobile`
* 其他组件库: `react-virtualized`,`formik + yup`,`react-spring` 等
* 百度地图API
### 项目搭建
1. 本地接口部署(数据库,接口)
    - 创建并导入数据
        + 启动phpStudy
        + 打开Navicat for MySQL
        + 创建数据库
          ![hkzf_SQL](https://pic.imgdb.cn/item/61a0d3d22ab3f51d91b225fe.jpg)
        + 运行SQL文件
          ![runSQL](https://pic.imgdb.cn/item/61a0d4442ab3f51d91b25354.jpg)
          刷新后即可看见数据库
          ![data](https://pic.imgdb.cn/item/61a0d4ae2ab3f51d91b27e7c.jpg)
    - 启动接口: 在API目录中执行`npm start`运行数据库
      ![files](https://pic.imgdb.cn/item/61a0d5212ab3f51d91b2b037.jpg)
      ![db_success](https://pic.imgdb.cn/item/61a0d60c2ab3f51d91b311d6.jpg)
    - 测试接口: 接口地址http://localhost:8080
2. 使用脚手架初始化项目
```
create-react-app 项目名称
```
## React Router
* 引入路由组件
```js
import Home from "./pages/Home";
import CityList from "./pages/CityList";
```
* 配置路由页面(v5)
```js
<Route path="/home" component={Home}></Route>
<Route path="/citylist" component={CityList}></Route>
```
* 配置路由导航菜单(v5)
```js
<Link to="/home">首页</Link>
<Link to="/citylist">城市列表</Link>
```
## 项目基础样式(初始化)配置
```css
/* 全局样式配置 */
html,
body {
  height: 100%;
  font-family: "Microsoft YaHei";
  color: #333;
  background-color: #fff;
}
* {
  box-sizing: border-box;
}
```