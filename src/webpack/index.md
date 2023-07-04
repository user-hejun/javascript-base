# webpack

## 构建流程
一. 运行流程
webpack 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来
在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条webpack机制中，去改变webpack的运作，使得整个系统扩展性良好
从启动到结束会依次执行以下三大步骤：
+ 初始化流程：从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
+ 编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
+ 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

## 热更新如何实现
HMR全称 Hot Module Replacement，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用
+ 通过webpack-dev-server创建两个服务器：提供静态资源的服务（express）和Socket服务
+ express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
+ socket server 是一个 websocket 的长连接，双方可以通信
+ 当 socket server 监听到对应的模块发生变化时，会生成两个文件.json（manifest文件）和.js文件（update chunk）
+ 通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）
+ 浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新

## webpack proxy 原理，为什么能解决跨域
webpack proxy，即webpack提供的代理服务
基本行为就是接收客户端发送的请求后转发给其他服务器

其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）

想要实现代理首先需要一个中间服务器，webpack中提供服务器的工具为webpack-dev-server

### 工作原理
proxy工作原理实质上是利用http-proxy-middleware 这个http代理中间件，实现请求转发给其他服务器


## wepbakc 优化前端的手段
+ JS代码压缩
+ CSS代码压缩
+ Html文件代码压缩
+ 文件大小压缩
+ 图片压缩
+ Tree Shaking
+ 代码分离
+ 内联 chunk
+ gzip 压缩


## 提高webpack的构建速度
1. 优化手段
+ 优化 loader 配置
+ 合理使用 resolve.extensions
+ 优化 resolve.modules
+ 优化 resolve.alias
+ 使用 DLLPlugin 插件
+ 使用 cache-loader
+ terser 启动多线程
+ 合理使用 sourceMap

#优化loader配置