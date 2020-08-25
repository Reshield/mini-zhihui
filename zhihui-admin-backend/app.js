const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const app = new Koa();
// 云环境 ID
const ENV = 'mini-zhihui-fmj55'
const test = require('./router/test.js')

// 具体参数我们在后面进行解释
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
        return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:9527'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 接收post参数解析
app.use(koaBody({
  multipart: true, // 前端的post参数能传到后端
}))

app.use(async (ctx, next) => {
  console.log('全局中间件')
  // ctx.body = 'Hello Wolrd'
  ctx.state.env = ENV
  await next()
})

test(app)

app.listen(3000, () => {
  console.log('服务开启在3000端口')
})
module.exports = app