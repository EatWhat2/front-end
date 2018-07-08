//restLogin.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    formSubmit: function (e) {
        console.log(e.detail.value)
        wx.request({
            url: app.globalData.host + "/restaurant_login",
            data: {
                restaurant_id: e.detail.value.restaurant_id,
                password: e.detail.value.password
            },
            method: 'POST',
            header: {}, // 设置请求的 header 默认是application/json
            success: res => {
                console.log(res)
                if (res.data.state == 200) {
                    app.globalData.restInfo = res.data.result
                    app.globalData.orders = res.data.orders
                    console.log(app.globalData.restInfo)
                    wx.redirectTo({
                        url: '../restSystem/restSystem'
                    })
                }
                else {
                    wx.showToast({
                        title: '密码错误或用户不存在',
                        icon: 'none',
                        duration: 1000,
                        mask: true
                    })
                }
            }
        })
    }
})