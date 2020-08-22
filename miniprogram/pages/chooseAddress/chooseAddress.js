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
    

    let arr = getCurrentPages() // 获取当前页面栈的数据
    let lastPage = (arr.length >= 2) ? arr[arr.length - 2] : undefined // 获取上一个页面的数据【监听到上一个页面】
    if (!!lastPage && lastPage.route == 'pages/settlement/settlement') {
      /* 
      这里我们就拿到了上一个页面的页面对象, 这里其实我们就可以使用lastPage做很多事情了, 
      例如直接操作lastPage.data, 修改上一个页面的数据  
      或者调用这个页面内的方法,
      我上一个页面预留了一个更新方法, 所以这里就直接用上一个页面调用数据刷新的方法, 我这里给赋值, 就可以携带数据回上一个页面了
      */
      lastPage.getChooseAddress(myAddress) // 这里的 getChooseAddress 是上一个页面的函数

      // 返回上一个页面
      wx.navigateBack()      
    }
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