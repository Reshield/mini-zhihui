// pages/home/home.js
const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    species: "居家好物",
    commoditiesList: [],
    showSort: true,
    displaySearch: false
  },
  // 弹出层操作
  openSort: function () {
    this.setData({
      showSort: ! this.data.showSort
    })
  },
  closeSort: function () {
    this.setData({
      showSort: ! this.data.showSort
    })
  },
  // 获取商品列表
  getCommodities: function() {
    let that = this
    app.getInfoByOrder('commoditis', 'time', 'desc',
      e => {
        that.setData({
          commoditiesList: e.data,
        })
        wx.hideLoading()
      }
    )
  },
  // 跳转至详情
  toDetail(e) {
    let _id = e.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id=' + _id,
    })
  },
  showSearch() {
    this.setData({
      displaySearch: true
    })
  },
  closeSearch(e) {
    this.setData({
      displaySearch: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommodities()
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