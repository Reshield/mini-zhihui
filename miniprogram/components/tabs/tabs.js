// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    windowHeight: {
      type: Number,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabItems: [
      {id: 0, title: "全部"},
      {id: 1, title: "待付款"},
      {id: 2, title: "待收货"},
      {id: 3, title: "待评价"}
    ],
    currentId: 0,
    swiperItem: [
      {id: 0, date: Date(), send: '未出库', pay: 1, receive: 0, evaluate: 0, commodities: [
        {id: 0, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/007.jpg?sign=0ddb1eb22315b7913e12fb00cf26e1e0&t=1595926017', name: '扫地机器人', property: '白色', number: 1, price: 10},
        {id: 1, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '感应夜灯', property: '白色', number: 1, price: 20},
        {id: 2, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '插线板', property: '黑色', number: 1, price: 33},
      ]},
      {id: 0, date: Date(), send: '已出库', pay: 0, receive: 0, evaluate: 0, commodities: [
        {id: 0, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '电水壶', property: '白色', number: 1, price: 45},
        {id: 1, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '筋膜枪', property: '白色', number: 1, price: 78},
      ]},
      {id: 0, date: Date(), send: '已出库', pay: 0, receive: 1, evaluate: 1, commodities: [
        {id: 0, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '扫地机器人', property: '白色', number: 1, price: 74},
        {id: 1, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '感应夜灯', property: '白色', number: 1, price: 221},
        {id: 2, image: 'https://6d69-mini-zhihui-fmj55-1302661879.tcb.qcloud.la/commoditisImages/006.jpg?sign=5643b1b1f352587d390be127ac9cdf6f&t=1595926033', name: '插线板', property: '黑色', number: 1, price: 12},
      ]},
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    }
  }
})
