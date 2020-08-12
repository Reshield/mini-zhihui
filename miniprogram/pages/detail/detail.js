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
    tabbarTop: 0
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
  // 设置高度
  setHeight() {
    // function getBoxHeight() {
    //   return new Promise((resolve, reject) => {
    //     const query = wx.createSelectorQuery()
    //     query.select('#abc').boundingClientRect(res => {
    //       console.log(res)
    //       resolve(res)
    //     }).exec()
    //   })
    // }
    // getBoxHeight()
    // .then(res => {
    //   console.log('555 ' + res)
    // })
    wx.getSystemInfo({
      success:(res) => {
        console.log(res.windowHeight)
        let tabbarTop = res.windowHeight - 50
        this.setData({
          tabbarTop
        })
      },
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
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