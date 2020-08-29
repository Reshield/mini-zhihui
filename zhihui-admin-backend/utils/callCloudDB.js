const fs = require('fs')
const getAccessToken = require('./getAccessToken.js')
const koa2Req = require('koa2-request');

const callCloudDB = async(ctx, fnName, query = {}) => {
  const ACCESS_TOKEN = await getAccessToken()
  const options = {
    method: 'POST',
    uri: `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
    body: {
      query,
      env: ctx.state.env,
    },
    json: true // Automatically stringifies the body to JSON
  }

  return await koa2Req(options)
    .then((res) => {
        let errcode = res.body.errcode
        if(errcode == 0) {
          return JSON.parse(res.body.data)
        }
        else {
          console.log(res.body.errcode)
        }
    })
    .catch(function (err) {
        console.log(err);
    })

}

module.exports = callCloudDB