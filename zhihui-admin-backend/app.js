const Koa = require('koa');
const Router = require('@koa/router')
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router()

// 云环境 ID
const ENV = 'mini-zhihui-fmj55'

// 跨域  允许前端跨域
// app.use(cors({
//   origin: ['http://localhost:9528'],
//   credentials: true
// }))

// 接收post参数解析
app.use(koaBody({
  // 前端的post参数能传到后端
  multipart: true,
}))

app.use(async (ctx, next) => {
  console.log('全局中间件')
  // ctx.body = 'Hello Wolrd'
  ctx.state.env = ENV
  await next()
})

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

const callCloudDB = require('./utils/callCloudDB')

// const getAddress = async (ctx, next) => {
//   const res = await callCloudDB(ctx, 'address')
//   console.log(res)
// }

// getAddress()

app.use(router.routes())
// 允许路由的get post等方法
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('服务开启在3000端口')
})