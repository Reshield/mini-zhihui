// pages/chooseAddress/chooseAddress.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theShow: true,
    addressList: [],
    deColor: "#F44848",
    noColor: "#ACACAC",
  },
  setDefault(e) {
    let userInfo = wx.getStorageSync('userInfo')
    let _openid = userInfo.openid
    let addArray = this.data.addressList
    let that = this
    let i = e.target.dataset.index
    addArray.forEach((item,index) => {
      if(index == i) {
        item.default = 1
      }
      else {
        item.default = 0
      }
    })
    console.log(addArray)
    wx.cloud.callFunction({
      name: 'update',
      data: {
        setName: 'address',
        updateInfoObj: addArray
      },
      success: res => {
        console.log(res)
        that.setData({
          addressList: addArray
        })
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {
        // ...
      }
    })
    
  },
  // 获取地址
  getAddress() {
    let userInfo = wx.getStorageSync('userInfo')
    let that = this
    let _openid = userInfo.openid
    app.getInfoWhere('address', {_openid},
      res => {
        console.log(res)
        that.setData({
          addressList: res.data['0'].addressArray,
          theShow: false
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
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