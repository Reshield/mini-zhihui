// pages/order/order.js
import { formatTime } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: null,
    tabItems: [
      {id: 0, title: "全部"},
      {id: 1, title: "待付款"},
      {id: 2, title: "待收货"},
      {id: 3, title: "待评价"}
    ],
    currentId: 0,
    noPay: [],
    noReceive: [],
    noEvaluate: [],
    allItems: [],
    swiperItem: [
      {id: 0, date: '', send: '已出库', pay: 1, receive: 0, evaluate: 0, commodities: [
        {id: 0, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/007.jpg?sign=0ddb1eb22315b7913e12fb00cf26e1e0&t=1595926017', name: '扫地机器人', property: '白色', number: 1, price: 10},
        {id: 1, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '感应夜灯', property: '白色', number: 1, price: 20},
        {id: 2, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '插线板', property: '黑色', number: 3, price: 33},
      ]},
      {id: 0, date: '', send: '未出库', pay: 0, receive: 0, evaluate: 0, commodities: [
        {id: 0, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '电水壶', property: '白色', number: 1, price: 45},
        {id: 1, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '筋膜枪', property: '白色', number: 1, price: 78},
      ]},
      {id: 0, date: '', send: '未出库', pay: 0, receive: 1, evaluate: 1, commodities: [
        {id: 0, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '扫地机器人', property: '白色', number: 1, price: 74},
        {id: 1, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '感应夜灯', property: '白色', number: 1, price: 221},
        {id: 2, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '插线板', property: '黑色', number: 1, price: 12},
      ]},
      {id: 0, date: '', send: '未出库', pay: 0, receive: 1, evaluate: 1, commodities: [
        {id: 0, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '扫地机器人', property: '白色', number: 1, price: 74},
        {id: 1, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '感应夜灯', property: '白色', number: 1, price: 221},
        {id: 2, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '插线板', property: '黑色', number: 1, price: 12},
      ]},
    ]
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
  // 获取订单高度
  swiperHigh() {
    let tabHeight = 0
    function getTabsHeight() {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery()
        query.select('.swiper-tab').boundingClientRect(res => {
          tabHeight = res.height
          resolve(tabHeight)
        }).exec()
      })
    }
    function getWindowHeight() {
      return new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success: (result) => {
            resolve(result.windowHeight)
          },
        })
      })
    }
    getTabsHeight().then(res => {
      tabHeight = res
      return getWindowHeight()
    }).then(res => {
      let swiperHeight = 0
      swiperHeight = res  - tabHeight
      let that = this
      that.setData({
        swiperHeight
      })
    })
  },
  // 设置待付款
  setArrays() {
    let noPay = []
    let noReceive = []
    let noEvaluate = []
    this.data.swiperItem.forEach(item => {
      let totalPrice = 0
      let sum = 0
      item.date = formatTime()
      item.commodities.forEach(cmd => {
        totalPrice += cmd.price * cmd.number
        sum += cmd.number
      })
      item.totalPrice = totalPrice
      item.sum = sum
      if(item.pay == 0) {
        noPay.push(item)
      }
      if(item.receive == 0) {
        noReceive.push(item)
      }
      if(item.evaluate == 0) {
        noEvaluate.push(item)
      }
    })
    let allItems = []
    allItems.push(this.data.swiperItem)
    allItems.push(noPay)
    allItems.push(noReceive)
    allItems.push(noEvaluate)
    let that = this
    that.setData({
      allItems
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setArrays()
    this.swiperHigh()
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