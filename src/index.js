import React from 'react';
import ReactDOM from 'react-dom';
// 导入样式
import './index.css';
// 导入字体图标库
import "./assets/fonts/iconfont.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
// 引入路由
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
