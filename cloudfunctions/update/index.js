// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 let {_id, setName, updateInfoObj} = event
 console.log(_id)
 console.log(updateInfoObj)
  try {
    return await db.collection(setName).doc(_id)
    .update({
      data: updateInfoObj
    })
    .then(res => {
      console.log('555')
      console.log(res)
      return res
    })
  } catch(e) {
    console.log(e)
    console.error(e)
  }

}
