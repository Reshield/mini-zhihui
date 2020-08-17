//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'mini-zhihui-fmj55',
        traceUser: true,
      })
    }
    this.globalData = {
      openid: ''
    }
  },
  // ---------- 常用函数 ----------
  // ---------- 截掉云存储图片？后面的路径 ----------
  cutImgUrl: function(imgUrl, callback ) {
    let oimage = ''
    for(let i=0; i<imgUrl.length; i++) {
      if(imgUrl[i] == '?') {
        oimage = imgUrl.substring(0, i)
        break
      }
    }
    return oimage
  },
  // ---------- 数据库操作 ----------
  // 排序后取出数据
  getInfoByOrder: function (setName, ruleItem, orderFuc,callback) {
    const db = wx.cloud.database()
    db.collection(setName)
      .orderBy(ruleItem, orderFuc)
      .get()
      .then(callback)
      .catch(console.error)
  },

  // 根据条件取获数据
  getInfoWhere: function(setName, ruleObj, callback) {
    const db = wx.cloud.database()
    db.collection(setName).where(ruleObj)
      .get({
        success: callback,
        fail: console.error
      })
  },
  // 往集合增加数据
  addRowToSet: function(setName,infoObject,callback){
    const db = wx.cloud.database()
    db.collection(setName).add({
      data: infoObject,
      success:callback,
      fail: console.error
    })
  },
  // 根据条件删除数据
  deleteInfoWhere: function(setName, ruleObj, callback) {
    const db = wx.cloud.database()
    db.collection(setName).where(ruleObj)
      .remove()
      .then(callback)
      .catch(console.error)
  }
})
