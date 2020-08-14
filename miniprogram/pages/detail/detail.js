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
    detailHeight: 0,
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
            console.log(e)
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
  // 设置高度
  setTabbrHeight() {
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
  setSwiperHeight(e) {
    let that = this
    let imgNumber = e.data['0'].images.length
    let myimage = e.data['0'].images['0']
    let oimage = ''
    // 截取云存储图片路径
    for(let i=0; i<myimage.length; i++) {
      if(myimage[i] == '?') {
        oimage = myimage.substring(0, i)
        break
      }
    }
    // 设置 swiper 宽高比与图片宽高比一致
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: oimage,
        success(img) {
          let imgWidth = img.width
          let imgHeight = img.height
          wx.getSystemInfo({
            success(res) {
              let winWidth = res.windowWidth
              let swiperHeight = winWidth / imgWidth * imgHeight

              // 设置商品详情的 swiper 高度
              let detailHeight = swiperHeight * imgNumber
              that.setData({
                swiperHeight,
                detailHeight
              })
              resolve(e)
            }
          })
        },
        fail(err) {
          console.log(err)
          reject()
        }
      })
    })
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
      return this.setSwiperHeight(res)
      
    })
    .then(res => {
      return this.getComment(options.id)

      
    })
    .then(res => {
      let commentNum = res.data.length
      that.setData({
        commentNum
      })
      return this.getUser(res)
    })
    this.setTabbrHeight()
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