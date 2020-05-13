//0 引入用来发送请求的方法
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContentList:[],
    //左侧被点击的菜单
    currentIndex:0,
    //右侧商品内容滚动条置顶参数
    scrollTop:0
  },
  //接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    /* 
      0、web中本地存储和微信小程序中的本地存储的区别
        ** 写代码的方式不一样了
           * web中：localStorage.setItem("key","value") localStorage.getItem(""key)
           * 小程序中： wx.setStorageSync("key", "value"); wx.getStorageSync('cates');
        **  存数据时是否做类型转换
           * web：不管存入的是什么类型的数据，最终都会先调用一下toString()，把数据变成字符串在存进去
           * 小程序：不存在类型转换这个操作，存入时是什么类型的数据，获取到的就是什么类型的数据
         
      1、先判断本地存储中是否存在旧数据
      {time:Date.now(),data:[...]}
      2、没有旧数据则发送新请求
      3、有旧数据且旧数据没有过期就是用本地存储中的旧数据
    */
   //1、 获取本地存储中的数据（小程序中也存在本地存储技术）
    const Cates=wx.getStorageSync('cates');
    //2、判断
    if(!Cates){
      //不存在，发送请求获取数据
      this.getCates();
      
    }else{
      //存在旧数据，定义一个过期时间
      if(Date.now() - Cates.time > 1000 * 10){
        //重新发送请求
        this.getCates();
        
      }else{
         //可以使用旧数据
        console.log("可以使用旧数据");
        this.Cates=Cates.data;
         //构造左侧菜单数据
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        //构造右侧商品数据
        let rightContentList=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContentList
        })

      }
     
        
    }

  }, 
  //获取分类数据
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;
      
    //   //把接口数据存入本地存储中
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});


    //   //构造左侧菜单数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   //构造右侧商品数据
    //   let rightContentList=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContentList
    //   })
    // })
    //1、使用es7的async await来发送请求
    const res=await request({url:"/categories"});
    this.Cates=res;
      
    //把接口数据存入本地存储中
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});


    //构造左侧菜单数据
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    //构造右侧商品数据
    let rightContentList=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContentList
    })
  },
  //左侧菜单栏点击事件
  handleItemTap(e){
  /* 
    1、获取被点击标题的索引
    2、给data中的currentIndex赋值即可
    3、根据不同的索引渲染右侧的商品内容
  */ 
    const {index}=e.currentTarget.dataset;
    let rightContentList=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContentList,
      //重新设置右侧商品内容置顶参数为0
      scrollTop:0
    })    
  }
})