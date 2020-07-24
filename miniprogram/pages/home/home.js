// pages/home/home.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    species: "居家好物",
    commoditiesList: [],
    commodityImage: "cloud://mini-zhihui-fmj55.6d69-mini-zhihui-fmj55-1302661879/commoditisImages/001.jpg",
    showSort: true
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
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  // 获取商品列表
  getCommodities: function() {
    const db = wx.cloud.database()
    db.collection('commoditis').get({
      success: res => {
        console.log(res)
        this.setData({
          commoditiesList: res.data
        })
      },
      fail: err => {
        console.error(err)
      }
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