// pages/goods_detail/index.js
/**
 * 1、点击轮播图预览大图功能
 *  ** 给轮播图绑定点击事件
 *  ** 调用小程序的API previewImage
 * 2、点击加入购物车
 *  ** 先绑定点击事件
 *  ** 获取缓存中的购物车数据 数组格式
 *  ** 先判断当前的商品是否已经存在与购物车了
 *  ** 已经存在 修改商品数据 执行购物车中商品数量++ 把数据填充会缓存中
 *  ** 不存在购物车数组中，直接给购物车数组添加一个新元素 新元素带上一个购买数量属性
 *  ** 弹出用户提示
 */
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}

  },
  //商品信息
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDeatil(goods_id);
    
  },
  async getGoodsDeatil(goods_id){
    const res=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=res;
    this.setData({
      goodsObj:{
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        //部分iPhone不支持webp图片格式
        //1.webp => 1.jpg
        goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.pics
      }
    })
  },
  //点击轮播图放大预览
  handlePreviewImage(e){
    // console.log("点击了图片");
    //先构造要预览的图片链接数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    //接受传递过来的图片URL
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  //加入购物车点击事件
  handleaddCart(){
   //1 获取缓存中的购物车数组
   let cart=wx.getStorageSync('cart')||[];
   //2 判断商品数据是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      //3 不存在，第一次添加
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo)
    }else{
      //4 已经存在数组中，执行num++
      // this.GoodsInfo.num++;
      cart[index].num++;

    }
    //把购物车数组重新添加会缓存中
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      //true防止用户手抖疯狂点击
      mask: true
    })
  }
})