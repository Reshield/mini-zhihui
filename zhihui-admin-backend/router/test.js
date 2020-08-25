const Router = require('@koa/router')
const router = new Router
const callCloudDB = require('../utils/callCloudDB.js')


// app.use(router.routes())
// app.use(router.allowedMethods()) // 允许路由的get post等方法

router.get('/test', async (ctx, next) => {
  console.log('555')
  const query = `
  db.collection('address').get()
  `
  const res = await callCloudDB(ctx, 'databasequery', query)
  console.log(res.data)
  ctx.body = '恭喜 __小简__ 你成功登陆了'
})

module.exports = (app) => {
  app.use(router.routes(), router.allowedMethods())
}