// pages/shoppingCart/shoppingCart.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodities: [],
    total: null,
    coupon: 0,
    finally: null,
    selectAll: true,
    scrollHeight: 100,
    cartHeight: 200,
    priceHeight: 100,
    showCar: false
  },
  // 监听横向滚动条滑动
  scroll(e) {

  },
  // 商品购买数量操作
  numberAdd(e) {
    const index = e.currentTarget.dataset.index
    this.data.commodities[index].number ++
    const newArray = this.data.commodities
    this.setData({
      commodities: newArray
    })
    this.totalPrice()
  },
  numberReduce(e) {
    const index = e.currentTarget.dataset.index
    const myNumber = this.data.commodities[index].number
    if(myNumber > 1) {
      this.data.commodities[index].number --
      const newArray = this.data.commodities
      this.setData({
        commodities: newArray
      })
      this.totalPrice()
    }
    return
  },
  // 价钱计算
  totalPrice() {
    let totalNumber = 0
    this.data.commodities.forEach(item => {
      totalNumber += item.number * item.price
    })
    this.setData({
      total: totalNumber
    })
    this.finallyPrice()
  },
  finallyPrice() {
    let finallyNumber = this.data.total - this.data.coupon
    this.setData({
      finally: finallyNumber
    })
  },
  // 全选状态操作
  selectAll() {
    this.setData({
      selectAll: ! this.data.selectAll
    })
  },
  // 设置高度
  setHeight() {
    let that = this
    wx.getSystemInfo({
      success (res) {
       let scrollHeight = res.windowHeight * 0.5
       let cartHeight = scrollHeight - 10
       let priceHeight = res.windowHeight * 0.3
       that.setData({
         scrollHeight,
         cartHeight,
         priceHeight
       })
      },
      fail(err) {
        console.log(err)
      } 
    })
  },
  // 获取购物车信息
  getCarInfo() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo != '' || userInfo != undefined) {
      let _openid = userInfo.openid
      app.getInfoWhere('shoppingCar', {_openid}, 
        res => {
          that.setData({
            showCar: true,
            commodities: res.data
          })
        }
      )
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarInfo()
    this.totalPrice()
    this.setHeight()
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