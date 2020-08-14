// components/dialog/dialog.js
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
      console.log(e)
      let id = e.target.id
      that.setData({
        typeItem: id
      })
    },
    addCart() {
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
    }
  }
})
