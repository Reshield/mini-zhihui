// pages/detail/detail.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    commodityId: '',
    swipers: [],
    commodity: {},
    commentNum: 0,
    comment: {},
    tabItems: [
      {id: 0, title: "商品详情"},
      {id: 1, title: "参数"}
    ],
    currentId: 0,
    swiperHeight: 0,
    tabbarTop: 0,
    carNumber: 0,
    openid: '',
    isShow: false
  },
  // 切换弹出窗显示
  handleClick() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  // 添加至购物车
  addCar() {
    this.setData({
      isShow: !this.data.isShow
    })
    console.log(this.data.isShow)
    // let that = this
    // let mycommodity= this.data.commodity
    // let _openid = this.data.openid
    // console.log(mycommodity._id)
    // app.getInfoWhere('shoppingCar', {_id: mycommodity._id, _openid}, 
    //    res => {
    //      console.log(res)
    //      if(res.data.length != 0) {
    //       wx.showToast({
    //         title: '已经添加过了~',
    //       })
    //      }
    //      else {
    //       let mycar = {}
    //       let mycommodity= this.data.commodity
    //       mycar.fittings = mycommodity.fittings
    //       mycar._id = mycommodity._id
    //       mycar.name = mycommodity.name
    //       mycar.price = mycommodity.price
    //       mycar.image = mycommodity.images['0']
    //       mycar.number = 1
    //       app.addRowToSet('shoppingCar', mycar, 
    //         res => {
    //           if(res) {
    //             wx.showToast({
    //               title: '添加成功~',
    //             })
    //             that.setData({
    //               carNumber: carNumber + 1
    //             })
    //           }
    //           return
    //         },
    //         err => {
    //           console.log(err)
    //         }
    //       )
    //      }
    //    }
    // )
  },
  // 切换 tabs 
  clickTab: function(e) {
    let that = this
    if(this.data.currentId === e.currentTarget.id) {
      return false;
    }
    else {
      that.setData({
        currentId: e.currentTarget.id
      })
    }
  },
  // 获取商品信息
  getCommodity(id) {
    return new Promise((resolve, reject) => {
      app.getInfoWhere('commoditis', { _id: id },
        e => {
          if(e) {
            resolve(e)
          }
          else {
            reject()
          }
        }
      )
    })
  },
  // 获取评价
  getComment(id) {
    return new Promise((resolve, reject) => {
      app.getInfoWhere('comments', { commodityId: id},
        e => {
          resolve(e)
        }
      )
    })
  },
  // 设置高度
  setHeight() {
    wx.getSystemInfo({
      success:(res) => {
        let tabbarTop = res.windowHeight - 50
        this.setData({
          tabbarTop
        })
      },
      complete: (res) => {},
    })
  },
  // 获取评价用户信息
  getUser(e) {
    let that = this
    let comments = e.data
    let myLength = comments.length
    let comment = {}
    return new Promise((resolve, reject) => {
      comment = comments[myLength - 1]
      app.getInfoWhere('users', { _id: comment.userId}, 
        res => {
          comment.userName = res.data['0'].userName
          comment.avatar = res.data['0'].avatar
          that.setData({
            comment
          })
        }
      )
    })
  },
  // 获取购物车数量
  getCarNumber() {
    let that = this
    let _openid = this.data.openid
    app.getInfoWhere('shoppingCar', {_openid},
      res => {
        let carNumber = res.data.length
        that.setData({
          carNumber
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 获取 openid
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo != '' && userInfo != undefined) {
      that.setData({
        openid: userInfo.openid
      })
    }
    // 设置商品详情
    this.getCommodity(options.id)
    .then(res => {
      that.setData({
        commodityId: res.data['0']._id,
        commodity: res.data['0'],
        swipers: res.data['0'].images
      })
      return this.getComment(options.id)
    })
    .then(res => {
      let commentNum = res.data.length
      that.setData({
        commentNum
      })
      return this.getUser(res)
    })
    this.setHeight()
    this.getCarNumber()
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