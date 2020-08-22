// pages/shoppingCart/shoppingCart.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodities: [],
    willBuy: null,
    cartCount: 0,
    total: null,
    coupon: 0,
    finally: null,
    selectAll: true,
    scrollHeight: 100,
    cartHeight: 200,
    priceHeight: 100,
    footerHeight: 50,
    showCar: false,
    _openid: '',
  },
  toSettlement() {
    // 暂时默认购物车内的商品都要前往支付
    let that = this
    let willBuy = this.data.commodities
    let myArray = []

    willBuy.forEach(item => {
      let myitem = {}
      myitem._id = item._id
      myitem.name = item.name
      myitem.price = item.price
      myitem.image = app.cutImgUrl(item.image)
      myitem.type = item.type
      myitem.fittings = item.fittings
      myitem.number = item.number
      myArray.push(myitem)
    })

    let o = JSON.stringify(myArray)
    wx.navigateTo({
      url: '../settlement/settlement?commodityArray=' + o,
    })
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
        let footerHeight = res.windowHeight * 0.08
        that.setData({
          scrollHeight,
          cartHeight,
          priceHeight,
          footerHeight
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
    let _openid = this.data._openid
    app.getInfoWhere('shoppingCar', {_openid}, 
      res => {
        that.setData({
          showCar: true,
          commodities: res.data,
          cartCount: res.data.length
        })
      }
    )
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
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    let _openid = userInfo.openid
    if(_openid != '' && _openid != undefined) {
      this.getCarInfo()
      this.totalPrice()
      this.setHeight()
      that.setData({
        showCar: true,
        _openid
      })
    }
    else {
      return
    }
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