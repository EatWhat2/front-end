//foodManage.js
//获取应用实例
const app = getApp()
var template = require('../template/template.js');

Page({
    data: {

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
        template.tabbar("tabBar", 1, this)//1表示第二个tabbar

        if (app.globalData.restInfo) {
          this.setData({
            restInfo: app.globalData.restInfo,
            restaurant_name: app.globalData.restInfo.restaurant_name
          })
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
      changeButtonClick: function (e) {
        console.log(e.target.dataset.item.food_id)
        wx.redirectTo({
            url: '../alterFood/alterFood?food_id='+ e.target.dataset.item.food_id + '&is_add_food=false'
        })
      },
      addButtonClick: function (e) {
        wx.redirectTo({
          url: '../alterFood/alterFood?is_add_food=true'
        })
      }
})