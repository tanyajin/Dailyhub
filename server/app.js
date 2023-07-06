const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require('cors');
const app = express();

//全局中间件
//cors中间件来处理跨域请求
app.use(cors())
//logger中间件来记录HTTP请求的日志信息
app.use(logger('dev'));
//解析请求体中的JSON数据，转换为js对象中间件
app.use(express.json());
//解析请求体中的URL编码，转换为js对象中间件
app.use(express.urlencoded({ extended: false }));
//解析请求体中的cookie，转换为js对象中间件
app.use(cookieParser());
//指定静态文件的目录路径
app.use(express.static(path.join(__dirname, 'public')));

//路由中间件
//将路由处理程序与指定的路径前缀关联起来。
//这意味着所有以/api/v1开头的请求将由./src/v1/routes模块处理。
app.use('/myroom', require('./src/routes'));

module.exports = app;