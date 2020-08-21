// pages/chooseAddress/chooseAddress.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theShow: true,
    addressList: [],
    addressId: '',
    deColor: "#F44848",
    noColor: "#ACACAC",
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    deleteIndex: null
  },
  // 设置默认
  setDefault(e) {
    wx.showLoading({
      title: '加载中',
    })
    let _id = this.data.addressId
    let addArray = this.data.addressList
    let that = this
    let i = e.target.dataset.index
    let newObject = {}
    addArray.forEach((item,index) => {
      if(index == i) {
        item.ifDefault = 1
      }
      else {
        item.ifDefault = 0
      }
    })
    newObject.addressArray = addArray
    wx.cloud.callFunction({
      name: 'update',
      data: {
        _id: _id,
        setName: 'address',
        updateInfoObj: newObject
      },
      success: res => {
        console.log(res)
        that.setData({
          addressList: addArray
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {
        // ...
      }
    })
    
  },
  // 删除地址
  deleteAddress(e) {
    console.log(e.currentTarget.dataset.index)
    let that = this
    that.setData({
      dialogShow: true,
      deleteIndex: e.currentTarget.dataset.index
    })
  },
  tapDialogButton(e) {
    let that = this
    console.log(e.detail.index)
    if(e.detail.index == 0) {
      that.setData({
        dialogShow: false
      })
    }
    else {
      wx.showLoading({
        title: '请稍等',
      })
      let newObject = {}
      let newArray = []
      let _id = this.data.addressId
      let deleteIndex = this.data.deleteIndex
      this.data.addressList.forEach((item, index) => {
        if(index != deleteIndex) {
          newArray.push(item)
        }
      })
      newObject.addressArray = newArray
      wx.cloud.callFunction({
        name: 'update',
        data: {
          _id: _id,
          setName: 'address',
          updateInfoObj: newObject
        },
        success: res => {
          console.log(res)
          if(res) {
            wx.hideLoading()
            that.setData({
              addressList: newObject.addressArray,
              dialogShow: false
            })
          }
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  // 选中地址
  chooseAddress(e) {
    let index = e.currentTarget.dataset.index
    let myAddress = this.data.addressList[index]
    wx.navigateTo({
      url: '../settlement/settlement?address=' + JSON.stringify(myAddress),
    })
  },
  // 获取地址
  getAddress() {
    wx.showLoading({
      title: '请稍等',
    })
    let userInfo = wx.getStorageSync('userInfo')
    let that = this
    let _openid = userInfo.openid
    app.getInfoWhere('address', {_openid},
      res => {
        wx.hideLoading()
        that.setData({
          addressId: res.data['0']._id,
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