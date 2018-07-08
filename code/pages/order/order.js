// page.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    totalPrice: 0.0,
    userInfo: {},
    uesrDetailInfo: {},
    array: ['在线支付', '货到付款'],
    objectArray: [
      {
        id: 0,
        name: '在线支付'
      },
      {
        id: 1,
        name: '货到付款'
      }
    ],
    index: 0
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userDetailInfo: {name: "张三", phone: "10000", address: "中山大学"}
      })
    }
    if (app.globalData.table_No) {
      this.setData({
        table_No: app.globalData.table_No
      })
    }
    var total_price = 0.0;
    const shop_list = this.data.shopList;
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onShow: function () {
    var shoppingCart = []
    var totalPrice = 0.0
    console.log(app.globalData.shoppingCart)
    for(var item in app.globalData.shoppingCart){
      shoppingCart.push(app.globalData.shoppingCart[item])
      totalPrice += app.globalData.shoppingCart[item].price *  
                    app.globalData.shoppingCart[item].amount
    }

    this.setData({
      shoppingCart: shoppingCart,
      totalPrice: totalPrice
    })
  },
  submitOrder: function () {
    var shoppingCart = []
    var date = new Date()
    for(var i = 0, l = this.data.shoppingCart.length; i < l; i++){
      shoppingCart.push(
        {
          food_id: this.data.shoppingCart[i].food_id,
          num: this.data.shoppingCart[i].amount
        }
      )
    }
    
    var request = {
      customer_id: app.globalData.customer_id,
      restaurant_id: app.globalData.restInfo.restaurant_id,
      date: util.formatTime(date),
      price: this.data.totalPrice,
      food: shoppingCart
    }

    if (app.globalData.table_No) {
      request.table_No = app.globalData.table_No
    }
    console.log(request)

    wx.request({
      url: app.globalData.host + "/table_order",
      data: request,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    })
  }
})