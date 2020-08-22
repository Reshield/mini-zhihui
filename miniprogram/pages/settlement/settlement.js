// pages/settlement/settlement.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    commodities: [],
    footerHeight: 50,
    totalPrice: 0
  },
  toAddress() {
    wx.setStorage({
      key:"commodities",
      data: this.data.commodities,
      success: res => {
        wx.navigateTo({
          url: '../chooseAddress/chooseAddress',
        })
      },
      fail: err => {
        return
      }
    })
  },
  // 获取 chooseAddress 选择的地址数据
  getChooseAddress(newAddress) {
    this.setData({
      address: newAddress
    })
  },
  // 获取购物车传进来的商品
  getCommodities(oArray) {
    let totalPrice = 0
    let that = this
    oArray.forEach(item => {
      totalPrice += item.price * item.number
    })
    that.setData({
      commodities:oArray,
      totalPrice
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    let myArray = JSON.parse(options.commodityArray)
    self.getCommodities(myArray)
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