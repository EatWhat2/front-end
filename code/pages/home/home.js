//home.js
//获取应用实例
const app = getApp()

Page({
    data: {
    },
    uesrLogin: function(e) {
        wx.navigateTo({
            url: '../userLogin/userLogin'
        })
    },
    restLogin: function(e) {
        wx.redirectTo({
            url: '../restLogin/restLogin'
        })
    }
})