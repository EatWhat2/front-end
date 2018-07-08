//初始化数据
function tabbarinit() {
    return [
        {
            "current": 0,
            "pagePath": "/pages/restSystem/restSystem",
            "iconPath": "/img/icon/order.png",
            "selectedIconPath": "/img/icon/order_on.png",
            "text": "订单"
        },
        { 
            "current":0,
            "pagePath": "/pages/foodManage/foodManage",
            "iconPath": "/img/icon/food.png",
            "selectedIconPath": "/img/icon/food_on.png",
            "text": "商品"
        }
    ]

}

//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
    var that = target;
    var bindData = {};
    var otabbar = tabbarinit();
    otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
    otabbar[id]['current'] = 1;
    bindData[bindName] = otabbar
    that.setData({ bindData });
}

module.exports = {
    tabbar: tabbarmain
}