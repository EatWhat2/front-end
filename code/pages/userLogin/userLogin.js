//userLogin.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '食咩阿',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUrlFromQR(e) {
    wx.scanCode({
      success: (res) => {
        this.setData({
          qrcode_detail: JSON.parse(res.result),
        })

        console.log(res)
        // 判断res.result中是否包括table_No
        /* 
         * TODO -- customer_id应该在用户登录小程序时获取
         */
        app.globalData.customer_id = this.data.qrcode_detail.customer_id
        this.data.req_url = app.globalData.host

        if (this.data.qrcode_detail.table_No) {
          this.data.req_url = this.data.req_url + "/table_order?" + "table_No=" + this.data.qrcode_detail.table_No
          app.globalData.table_No = this.data.qrcode_detail.table_No
        } else {
          this.data.req_url = this.data.req_url + "/takeout_order?"
        }

        this.data.req_url = this.data.req_url + "&restaurant_id=" + this.data.qrcode_detail.restaurant_id + "&customer_id=" + app.globalData.customer_id

        console.log(app.globalData.table_No)
        console.log(this.data.req_url)

        // 用url访问服务器，获取商家信息
        wx.request({
          url: this.data.req_url,
          data: {},
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          }, // 设置请求的 header 默认是application/json 
          success: res => {
            console.log(res)
            app.globalData.restInfo = res.data.result
            // 恢复餐桌的购物车列表
            app.globalData.private_shopping_list = JSON.parse(app.globalData.restInfo.private_shopping_list)

            if (app.globalData.restInfo.public_shopping_list) {
              for (var i in app.globalData.restInfo.public_shopping_list) {
                for (var j in app.globalData.restInfo.food) {
                  if (app.globalData.restInfo.public_shopping_list[i].food_id == app.globalData.restInfo.food[j].food_id) {
                    app.globalData.shoppingCart[app.globalData.restInfo.public_shopping_list[i].food_id] = {
                      food_id: app.globalData.restInfo.food[j].food_id, 
                      food_name: app.globalData.restInfo.food[j].food_name, 
                      price: app.globalData.restInfo.food[j].price, 
                      amount: app.globalData.restInfo.public_shopping_list[j].num
                    }
                  }
                }
              }
              app.globalData.restInfo.public_shopping_list = null
              app.globalData.restInfo.private_shopping_list = null
            }

            console.log(app.globalData.restInfo)

            // 由于 获取商家信息 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            // restaurant简写成rest
            if (this.restInfoReadyCallback) {
              this.restInfoReadyCallback(res)
            }
          }
        })

        wx.switchTab({
          url: '../menu/menu'
        })
      }
    })
  }
})
