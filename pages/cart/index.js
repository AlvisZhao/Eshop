// pages/cart/index.js
/**
 * 1、获取用户的收货地址
 *  ** 绑定点击事件
 *  ** 调用小程序的内置api 获取用户收货地址 wx.chooseAddress(此路不通)
 *     * 获取用户对小程序所授予的获取地址权限状态 scope
 *      + 假设用户点击获取收货地址的提示框“确定” authSetting scope.address
 *        · scope值true
 *      + 用户点击获取收货地址的提示框“取消”
 *        · scope值为false
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击添加收获地址触发事件
  handelAddAddress(){
    // console.log("点击了添加收货地址");
    //2、获取收货地址
    // wx.chooseAddress({
    //   complete: (res) => {console.log(res);
    //   },
    // })
    wx.getSetting({
      complete: (res) => {console.log(res)},
    })
    
  }
})