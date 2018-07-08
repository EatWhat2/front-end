//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取用户信息 todo

    /*
    // 获取商家信息
    wx.request({
      url: 'http://localhost:8888/restaurant_id=1',
      // url: 'http://192.168.137.248:8888/restaurant_name=zyf',
      data: {},
      method: 'GET',
      header: {}, // 设置请求的 header 默认是application/json 
      success: res => {
        console.log(res)
        this.globalData.restInfo = res.data.result
        // 由于 获取商家信息 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        // restaurant简写成rest
        if (this.restInfoReadyCallback) {
          this.restInfoReadyCallback(res)
        }
      }
    })
    */
  },
  globalData: {
    userInfo: null,
    shoppingCart: {},
    // host: "http://172.20.10.3:8888"
    host: "http://localhost:8888"
    //restInfo: null
    // { food_id: {food_id:1, food_name: "", price: 0.0, amount: 1}, food_id:{food_id:1, food_name: "", price: 0.0, amount: 1}}
    // restInfo: {
    //   "restaurant_name": "123",
    //   "restaurant_id": 1,
    //   "phone": 10000,
    //   "food": [
    //     {
    //       "food_id": 1,
    //       "food_type": "staple",
    //       "food_name": "麻辣香锅",
    //       "price": 2005.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "1"
    //     },
    //     {
    //       "food_id": 2,
    //       "food_type": "staple",
    //       "food_name": "台湾卤肉饭",
    //       "price": 13.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "2"
    //     },
    //     {
    //       "food_id": 3,
    //       "food_type": "snack",
    //       "food_name": "薯条",
    //       "price": 8.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "3"
    //     },
    //     {
    //       "food_id": 4,
    //       "food_type": "snack",
    //       "food_name": "鸡翅",
    //       "price": 10.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "4"
    //     }
    //     ,
    //     {
    //       "food_id": 5,
    //       "food_type": "snack",
    //       "food_name": "鸡翅1",
    //       "price": 11.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "4"
    //     }
    //     ,
    //     {
    //       "food_id": 6,
    //       "food_type": "snack",
    //       "food_name": "鸡翅2",
    //       "price": 12.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "4"
    //     },
    //     {
    //       "food_id": 7,
    //       "food_type": "drink",
    //       "food_name": "可乐1",
    //       "price": 12.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "4"
    //     },
    //     {
    //       "food_id": 8,
    //       "food_type": "drink",
    //       "food_name": "可乐2",
    //       "price": 12.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "4"
    //     },
    //     {
    //       "food_id": 9,
    //       "food_type": "drink",
    //       "food_name": "可乐3",
    //       "price": 12.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "4"
    //     },
    //     {
    //       "food_id": 10,
    //       "food_type": "drink",
    //       "food_name": "可乐4",
    //       "price": 12.0,
    //       "num": 10,
    //       "image_url": "/img/1.jpg",
    //       "detail": "4"
    //     }
    //   ]
    // }
  }
})