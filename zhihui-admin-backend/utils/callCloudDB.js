const fs = require('fs')
const getAccessToken = require('./getAccessToken.js')
const koa2Req = require('koa2-request');

const callCloudDB = async(ctx, fnName = {}) => {
  const ACCESS_TOKEN = await getAccessToken()
  const options = {
    method: 'POST',
    uri: `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
    body: {
        env: ctx.state.env,
    },
    json: true // Automatically stringifies the body to JSON
  }

  return await koa2Req(options)
    .then((res) => {
        return res
    })
    .catch(function (err) {
        console.log(err);
    })

}

module.exports = callCloudDB