//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    totalPrice: 0.0,
    index: 0
  },
  
  onShow: function () {
    // var shopping_list = []

    // for(var item in app.globalData.shoppingCart){
    //   shopping_list.push({
    //     food_id: app.globalData.shoppingCart[item].food_id,
    //     num: app.globalData.shoppingCart[item].amount
    //   })
    // }

    // console.log(shopping_list)

    var req_data = {
      customer_id: app.globalData.customer_id,
      restaurant_id: app.globalData.restInfo.restaurant_id,
      table_No: app.globalData.table_No,
      shopping_list: app.globalData.private_shopping_list
    }

    console.log('req_data: ', req_data)

    wx.request({
      url: app.globalData.host + '/shopping_list',
      data: req_data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        console.log(res)
        var shopping_list = JSON.parse(res.data.result)

        for (var i in shopping_list) {
          for (var j in app.globalData.restInfo.food) {
            if (shopping_list[i].food_id == app.globalData.restInfo.food[j].food_id) {
              app.globalData.shoppingCart[shopping_list[i].food_id] = {
                food_id: app.globalData.restInfo.food[j].food_id, 
                food_name: app.globalData.restInfo.food[j].food_name, 
                price: app.globalData.restInfo.food[j].price, 
                amount: shopping_list[i].num
              }
            }
          }
        }

        var shoppingCart = []
        var totalPrice = 0.0
        var table_No = app.globalData.table_No ? app.globalData.table_No : null
        
        console.log('shopping_list got from server: ', app.globalData.shoppingCart)
        console.log('private shopping list: ', app.globalData.private_shopping_list)
        for (var item in app.globalData.shoppingCart) {
          shoppingCart.push(app.globalData.shoppingCart[item])
          totalPrice += app.globalData.shoppingCart[item].price *
            app.globalData.shoppingCart[item].amount
        }

        this.setData({
          shoppingCart: shoppingCart,
          totalPrice: totalPrice,
          table_No: table_No
        })
      }
    })
  },

  settleAccounts: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },

  //点击减少按钮
  minusButtonClick: function (e){
    if (app.globalData.shoppingCart[e.target.dataset.item.food_id].amount == 1){
      var index = e.target.dataset.item.food_id;
      var temp = {};
      for (var item in app.globalData.shoppingCart) {
        if (app.globalData.shoppingCart[item].food_id != index) {
          temp[app.globalData.shoppingCart[item].food_id] = app.globalData.shoppingCart[item]
        }
      }
      app.globalData.shoppingCart = temp;
      //console.log(temp);
    }
    else{
      app.globalData.shoppingCart[e.target.dataset.item.food_id].amount--;
    }

    for (var i in app.globalData.private_shopping_list) {
      if (app.globalData.private_shopping_list[i].food_id == e.target.dataset.item.food_id) {
        if (app.globalData.private_shopping_list[i].num > 1)
          app.globalData.private_shopping_list[i].num--;
        else if (app.globalData.private_shopping_list[i].num == 1)
          app.globalData.private_shopping_list.splice(index, 1)
      }
    }

    console.log(app.globalData.private_shopping_list)
    //更新数据
    this.onShow()
  },

  //点击增加按钮
  addButtonClick:function (e){
    app.globalData.shoppingCart[e.target.dataset.item.food_id].amount++;

    var has_this_food_id = false

    for (var i in app.globalData.private_shopping_list) {
      if (app.globalData.private_shopping_list[i].food_id == e.target.dataset.item.food_id) {
        app.globalData.private_shopping_list[i].num++;
        has_this_food_id = true;
        break
      }
    }

    if (has_this_food_id == false)
      app.globalData.private_shopping_list.push({
        food_id: e.target.dataset.item.food_id,
        num: 1
      })
    //console.log(e.target.dataset.item.food_id)

    //更新数据
    this.onShow();
  }
})