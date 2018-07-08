//restSystem.js
//获取应用实例
const app = getApp()
var template = require('../template/template.js');

Page({
    data: {
    },
    onLoad: function () {
        template.tabbar("tabBar", 0, this)//1表示第二个tabbar
        // console.log('1', app.globalData.orders)
        this.setData({
            orders: app.globalData.orders
        })
        var orders = []

        for (var i in this.data.orders) {
            var temp = []
            for (var j in this.data.orders[i].food) {
                for (var k in app.globalData.restInfo.food) {
                    if (this.data.orders[i].food[j].food_id == app.globalData.restInfo.food[k].food_id) {
                        temp.push({
                            food_name: app.globalData.restInfo.food[k].food_name,
                            price: app.globalData.restInfo.food[k].price,
                            num: this.data.orders[i].food[j].num
                        })
                    }
                }
            }
            orders.push({
                food: temp,
                table_No: this.data.orders[i].table_No,
                date: this.data.orders[i].date,
                price: this.data.orders[i].price
            })
        }
        this.setData({
            orders: orders
        })
    },
    refreshOrders: function(e) {
        wx.request({
            url: app.globalData.host + '/order_refresh?restaurant_id=' + app.globalData.restInfo.restaurant_id,
            data: {},
            method: 'GET',
            header: {},
            success: res => {
                if (res.data.orders)
                    app.globalData.orders = res.data.orders
                
                this.onLoad()
            }
        })
    }
})