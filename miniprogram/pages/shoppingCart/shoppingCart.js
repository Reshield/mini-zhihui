// pages/shoppingCart/shoppingCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodities: [
      {
        id:1,
        name: "UNPO筋膜枪",
        image: "https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/001.jpg?sign=6e9c3fdfa1f6476c36dc53f831456138&t=1595321961",
        price: 429,
        number: 1
      },
      {
        id:2,
        name: "UNPO筋膜枪2",
        image: "https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/002.jpg?sign=d8c7c425efa7506de0b32efef499ab2b&t=1595323450",
        price: 429,
        number: 1
      },
      {
        id:3,
        name: "UNPO筋膜枪3",
        image: "https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/003.jpg?sign=3714acf877cfa273b0722543e3ab020a&t=1595323464",
        price: 429,
        number: 1
      },
      {
        id:4,
        name: "UNPO筋膜枪4",
        image: "https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/004.jpg?sign=45d3ff7e4cddef2ca4c128c78cc364dc&t=1595323475",
        price: 429,
        number: 1
      },
    ],
    total: null,
    coupon: 0,
    finally: null,
    selectAll: true
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
    console.log(this.data.selectAll)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.totalPrice()
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