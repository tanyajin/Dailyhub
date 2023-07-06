#!/usr/bin/env node

/**
 * Module dependencies.
 */

//引入所需的模块和依赖项
//从 ../app 相对路径中导入的 Express 应用程序实例。
const app = require('../app');
//debug 是调试模块，用于输出调试信息。
const debug = require('debug')('server:server');
//http 是 Node.js 内置的 HTTP 模块。
const http = require('http');

//新增依赖
//引入dotenv 模块，用于加载环境变量。
const dotenv = require('dotenv');
//引入 Mongoose 库，它是一个 Node.js 的 MongoDB 驱动程序
//用于在 Node.js 应用程序中与 MongoDB 数据库进行交互。
const mongoose = require('mongoose');

//通过调用 dotenv.config() 方法，它会根据项目根目录下的 .env 文件来加载环境变量。
dotenv.config();


/**
 * Get port from environment and store in Express.
 */

//确定要监听的端口号。normalizePort 函数将传入的端口值进行解析和规范化，如果无法解析为有效的端口号，则使用默认值 '3000'。然后，将确定的端口号设置为 Express 应用程序实例的属性 'port'。
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
//创建了一个 HTTP 服务器实例，并将 Express 应用程序实例 app 作为参数传递给 http.createServer 方法。
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

//修改

/*
使用 mongoose.connect 方法连接到 MongoDB 数据库，连接的 URL 从环境变量 MONGODB_URL 中获取。如果连接成功，然后调用 server.listen 方法开始监听指定的端口号。
*/

//如果连接失败，则打印错误信息并通过 process.exit(1) 终止应用程序。
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log(`Mongodb connected ${process.env.MONGODB_URL}`)
}).catch(err => {
  console.log(err);
  process.exit(1);
})


/**
 * Normalize a port into a number, string, or false.
 */

/*
这是一个辅助函数 normalizePort，用于解析和规范化传入的端口值。它将传入的值解析为整数，并进行一些条件判断来确保得到有效的端口号。
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}