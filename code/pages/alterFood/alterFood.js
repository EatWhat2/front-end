//restSystem.js
//获取应用实例
const app = getApp()

Page({
    data: {
        is_add_food: false
    },
    onLoad: function(option) {
        console.log(option)
        this.setData({
            food: app.globalData.restInfo.food,
            is_add_food: option.is_add_food
        })

        for (var i in this.data.food) {
            if (String(this.data.food[i].food_id) == option.food_id) {
                this.setData({
                    index: i,
                    item: {
                        food_id: option.food_id,
                        food_name: this.data.food[i].food_name,
                        price: this.data.food[i].price,
                        food_type: this.data.food[i].food_type,
                        num: this.data.food[i].num,
                        image_url: this.data.food[i].image_url,
                        detail: this.data.food[i].detail
                    }
                })
                console.log(this.data.index)
                console.log(this.data.item)
                break
            }
        }
        
    },
    formSubmit: function(e) {
        this.setData({
            item: {
                food_id: e.detail.value.food_id,
                food_name: e.detail.value.food_name,
                price: e.detail.value.price,
                food_type: e.detail.value.food_type,
                num: e.detail.value.num,
                image_url: e.detail.value.image_url,
                detail: e.detail.value.detail
            }
        })

        if(this.data.is_add_food == "true")
            this.data.food.push(this.data.item)
        else
            this.data.food[this.data.index] = this.data.item

        console.log(this.data.is_add_food)
        console.log(this.data.food)

        wx.request({
            url: app.globalData.host + '/restaurant_food',
            data: {
                restaurant_id: app.globalData.restInfo.restaurant_id,
                food: this.data.food
            },
            method: 'POST',
            header: {},
            success: res => {
                console.log(res)
                if (res.data.state == 200) {
                    app.globalData.restInfo.food = this.data.food
                    wx.showToast({
                        title: '修改成功',
                        icon: 'none',
                        duration: 1000,
                        mask: true
                    })
                    console.log(this.data.food)     
                } else {
                    wx.showToast({
                        title: '修改失败',
                        icon: 'none',
                        duration: 1000,
                        mask: true
                    })
                }
                wx.redirectTo({
                    url: '../foodManage/foodManage'
                }) 
            }
        })
    },
    deleteFood: function(e) {
        this.data.food.splice(this.data.index, 1)

        wx.request({
            url: app.globalData.host + '/restaurant_food',
            data: {
                restaurant_id: app.globalData.restInfo.restaurant_id,
                food: this.data.food
            },
            method: 'POST',
            header: {},
            success: res => {
                if (res.data.state == 200) {
                    app.globalData.restInfo.food = this.data.food
                    wx.showToast({
                        title: '删除成功',
                        icon: 'none',
                        duration: 1000,
                        mask: true
                    })
                    console.log(this.data.food)     
                } else {
                    wx.showToast({
                        title: '删除失败',
                        icon: 'none',
                        duration: 1000,
                        mask: true
                    })
                }
                wx.redirectTo({
                    url: '../foodManage/foodManage'
                })      
            }
        })
    }
})