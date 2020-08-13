// pages/me/me.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    defaultAvatar: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/userAvatars/default-avatar.png?sign=6863575088391588f26e56ea19f9290e&t=1597135374',
    logged: false
  },
  // 登录状态
  checkLogin() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo == '' || userInfo == undefined) {
      let user = {}
      user.avatarUrl = 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/userAvatars/default-avatar.png?sign=6863575088391588f26e56ea19f9290e&t=1597135374'
      user.nickName = '请先登录'
      that.setData({
        userInfo: user
      })
    }
    else {
      that.setData({
        userInfo,
        logged: true
      })
    }
  },
  // 获取用户数据
  getUserInfo(e) {
    let that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res)
        app.globalData.openid = res.result.openid
        e.detail.userInfo.openid = res.result.openid
        wx.setStorageSync('userInfo', e.detail.userInfo)
        that.setData({
          userInfo: e.detail.userInfo
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})