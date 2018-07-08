// page.js
//获取应用实例
const app = getApp()

Page({
  data: {
    msg: "食咩阿"
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  toOrderPage: function (e) {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  //单击改变分栏的显示状态
  backgroundClick: function (e) {
    console.log('backgroundClick', e)
    console.log('toggle', e.target.dataset.toggle)
    if (e.target.dataset.toggle == undefined) {
      this.data.foodList[e.target.dataset.index].toggle = true;
      for (var i = 0; i < this.data.foodList.length; i++) {
        if (i != e.target.dataset.index) {
          this.data.foodList[i].toggle = undefined;
        }
      }
      this.setData({
        foodList: this.data.foodList
      })
    }
    this.setData({
      toView: e.target.dataset.foodtype
    })
  },
  onLoad: function () {
    if (app.globalData.restInfo) {
      this.setData({
        restInfo: app.globalData.restInfo,
        restaurant_name: app.globalData.restInfo.restaurant_name
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.restInfoReadyCallback = res => {
        this.setData({
          restInfo: res.restInfo,
          restaurant_name: app.globalData.restInfo.restaurant_name
        })
      }
    }

    console.log(this.data.restaurant_name)

    var foodList = []
    var foodType = []
    var foodTypeIndex = {}
    var k = 1

    for (var i = 0, l = this.data.restInfo.food.length; i < l; i++) {
      if (!foodTypeIndex[this.data.restInfo.food[i].food_type]) {
        foodType.push(this.data.restInfo.food[i].food_type)
        foodTypeIndex[this.data.restInfo.food[i].food_type] = k
        k++
      }
    }
    for (var i = 0, l = foodType.length; i < l; i++) {
      foodList.push({ "foodType": foodType[i], item: [] })
    }
    for (var i = 0, l = this.data.restInfo.food.length; i < l; i++) {
      foodList[foodTypeIndex[this.data.restInfo.food[i].food_type] - 1].item.push(
        this.data.restInfo.food[i]
      )
    }
    foodList[0].toggle = true;
    this.setData({
      restInfo: {
        restaurantID: this.data.restInfo.restaurant_id,
        restaurantPhone: this.data.restInfo.phone,
      },
      foodList: foodList,
      foodType: foodType,
      toView: foodType[0]
    })
    console.log(foodList)
    console.log(foodType)
  },
  addButtonClick: function (e) {
    if (!app.globalData.shoppingCart[e.target.dataset.item.food_id])
      app.globalData.shoppingCart[e.target.dataset.item.food_id] = {
        food_id: e.target.dataset.item.food_id,
        food_name: e.target.dataset.item.food_name,
        price: e.target.dataset.item.price,
        amount: 1
      }
    else
      app.globalData.shoppingCart[e.target.dataset.item.food_id].amount++

    var has_this_food_id = false
    for (var i in app.globalData.private_shopping_list) {
      if (app.globalData.private_shopping_list[i].food_id == e.target.dataset.item.food_id) {
        app.globalData.private_shopping_list[i].num++
        has_this_food_id = true  
        break
      }
    }

    if (has_this_food_id == false)
      app.globalData.private_shopping_list.push({
        food_id: e.target.dataset.item.food_id, 
        num: 1
      })
    
    console.log('public shopping list: ', app.globalData.shoppingCart)
    console.log('private shopping list: ', app.globalData.private_shopping_list)
  }
})