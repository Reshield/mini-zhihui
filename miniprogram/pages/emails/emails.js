// pages/emails/emails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emailsData: [],
    slideButtons: []
  },
  // 获取用户消息数据
  getEmails() {
    const emailsData = [
      {
        id: 1,
        title: '为何撤销美国驻成都总领事馆？外交部回应',
        detail: '汪文斌表示，7月21日，美方单方面挑起事端，突然要求中方关闭驻休斯敦总领事馆，严重违反国际法和国际关系基本准则及中美领事条约的有关规定，严重破坏中美关系。中方上述举措是对美方无理行径的正当和必要反应，符合国际法和国际关系基本准则，符合外交惯例。',
        kind: 'system',
        date: new Date()
      },
      {
        id: 2,
        title: '清华大学录取通知书，刷屏了！',
        detail: '据说设计灵感源自清华校歌“水木清华众秀钟”插图选用众多清华标志性建筑进行融合绘制清华学堂、二校门、大礼堂、紫荆花、荷花等诸多清华元素都呈现其中',
        kind: 'people',
        date: new Date()
      },
      {
        id: 3,
        title: '微信又添新功能！这个微信群可以学英语，而且全程免费',
        detail: '为确保每个学员都能获得及时的指导和教学反馈，每个学习群都会配备至少1位专业老师（专八水平）。①扫码进群后，会有老师发送课程介绍和上课链接，并告诉你如何领取配套复习资料。②每节课结束，主讲老师会布置作业，学员完成作业发群里，老师会进行指导。在英语学习上有任何疑难困惑都可以随时向老师请教。除了专业老师的1对1服务以外，在群内还有各梯度水平的英语学习者，你可以和大家分享学习心得，缓解学习压力，不断提升进步。',
        kind: 'ad',
        date: new Date()
      },
    ]
    
    emailsData.forEach(item => {
      item.detail = item.detail.substr(0, 20) + '......'
      switch (item.kind) {
        case 'system':
          item.color = '#2A82E4'
          break;
        case 'people':
          item.color = '#FF8000'
          break;
        case 'ad':
          item.color = '#ED3203'
          break;
      }
    })

    const slideButtons = [
      {
        text: '已读',
        src: '/page/weui/cell/icon_love.svg', // icon的路径
      },
      {
        type: 'warn',
        text: '删除',
        extClass: 'test',
          src: '/page/weui/cell/icon_del.svg', // icon的路径
      }
    ]
    this.setData({
      emailsData,
      slideButtons
    })
  },
  slideButtonTap(e) {
    console.log('slide button tap', e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEmails()
    
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