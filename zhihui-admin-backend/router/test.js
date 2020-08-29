const Router = require('@koa/router')
const router = new Router
const callCloudDB = require('../utils/callCloudDB.js')


// app.use(router.routes())
// app.use(router.allowedMethods()) // 允许路由的get post等方法

router.get('/test', async (ctx, next) => {
  const query = `
  db.collection('address').get()
  `
  let res = await callCloudDB(ctx, 'databasequery', query)
  ctx.body = res
})

module.exports = (app) => {
  app.use(router.routes(), router.allowedMethods())
}