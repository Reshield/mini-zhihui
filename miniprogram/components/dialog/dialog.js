// components/dialog/dialog.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    commodity: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    number: 1,
    type: '',
    typeItem: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      this.triggerEvent('cancle')
    },
    numberReduce() {
      let that = this
      if(this.data.number > 1) {
        that.setData({
          number: this.data.number - 1
        })
      }
      return
    },
    numberAdd() {
      let that = this
      that.setData({
        number: this.data.number + 1
      })
    },
    chooseType(e) {
      let that = this
      let id = e.target.id
      let type = this.data.commodity.types[id]
      that.setData({
        typeItem: id,
        type
      })
    },
    addCart() {
      let that = this
      let mycommodity= this.data.commodity
      let userInfo = wx.getStorageSync('userInfo')
      let _openid = userInfo.openid
      app.getInfoWhere('shoppingCar', {_id: mycommodity._id}, 
         res => {
           console.log(res)
           if(res.data.length != 0) {
            wx.showToast({
              title: '已经添加过了~',
            })
            this.triggerEvent('handleClick')
           }
           else {
            let mycar = {}
            let mycommodity= this.data.commodity
            mycar.fittings = mycommodity.fittings
            mycar._id = mycommodity._id
            mycar.name = mycommodity.name
            mycar.price = mycommodity.price
            mycar.image = mycommodity.images['0']
            mycar.type = this.data.type
            mycar.number = this.data.number
            console.log(mycar)
            app.addRowToSet('shoppingCar', mycar, 
              res => {
                if(res) {
                  wx.showToast({
                    title: '添加成功~',
                  })
                  this.triggerEvent('handleClick')
                }
                return
              },
              err => {
                console.log(err)
              }
            )
           }
         }
      )
    }
  }
})
