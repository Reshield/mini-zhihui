// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchWord:'',
    searchBox: [
      {
        id: 1,
        title: 'AAA'
      },
      {
        id: 2,
        title: 'BBB'
      },
      {
        id: 1,
        title: 'CCC'
      },
      {
        id: 1,
        title: 'DDD'
      },
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取搜索词
    listenerSearchInput: function (e) {
      // console.log(e.detail.value)
      getCurrentPages()["0"].setData({
        searchWord: e.detail.value
      })
    },
    // 点击查找按钮
    toSearch: function(e){
      const myWord = getCurrentPages()["0"].data.searchWord
      app.getInfoWhere('fruit-board', { name : myWord },
        e => {
          if (e.data.length <= 0){
            wx.showToast({
              title: '没有喔~',
            })
          }
          else{
            getCurrentPages()["0"].setData({
              fruitInfo: e.data,
              activeTypeId: -1
            })
          }
        }
      )
    },
    closeSearch() {
      this.triggerEvent('closeSearch', 123)
    }
  }
})
