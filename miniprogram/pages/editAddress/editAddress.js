// pages/editAddress/editAddress.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiver: '',
    phone: null,
    region: ['广东省', '广州市', '海珠区'],
    address: ''
  },
  setReceiver(e) {
    let receiver = e.detail.value
    let that = this
    that.setData({
      receiver
    })
  },
  setPhone(e) {
    let phone = e.detail.value
    let that = this
    that.setData({
      phone
    })
  },
  setAddress(e) {
    let address = e.detail.value
    let that = this
    that.setData({
      address
    })
  },
  saveAddress() {
    let region = this.data.region
    let address = this.data.address
    let receiver = this.data.receiver
    let phone = this.data.phone
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(receiver == '' || phone == null || address == '') {
      wx.showToast({
        title: '收货信息未填写完整',
      })
    }
    else if(!myreg.test(phone)){
      wx.showToast({
        title: '电话输入不正确',
      })
    }
    else {
      app.addRowToSet('address', {receiver, phone, region, address},
        res => {
          if(res) {
            wx.navigateTo({
              url: "../chooseAddress/chooseAddress",
            })
          }
        }
      )
    }
  },
  // 切换弹出窗显示
  handleClick() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  // 切换地址
  picker(e) {
    let region = e.detail
    console.log(region)
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