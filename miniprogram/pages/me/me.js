// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '王二狗',
    description: '这条狗很懒，什么都没留下',
    avatar: "https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/avatar.jpg?sign=6442385f0fcaf8c654d52b8d2f2ca084&t=1595492627",
    eNumber: 2
  },
  toOrder() {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  toEmails() {
    wx.navigateTo({
      url: '../emails/emails',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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