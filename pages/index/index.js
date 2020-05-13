//0 引入用来发送请求的方法
import { request } from "../../request/index.js"
//Page Object
Page({
  
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    cateList:[],
    //楼层数据
    floorList:[]
  },
  //页面开始加载时就会触发的
  onLoad: function(options){
   this.getSwiperList();
   this.getCateList();
   this.getFloorList();
  },
  //获取轮播图数据方法
  async getSwiperList(){
     // 1、发送异步请求获取轮播图数据
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     // console.log(result); 
    //     this.setData({
    //       swiperList:result.data.message
    //     })        
    //   }
    // });
    // request({url:"/home/swiperdata"})
    // .then(result=>{
    //   this.setData({
    //           swiperList:result
    //         })   
    // })
    const res=await request({url:"/home/swiperdata"})
    this.setData({
      swiperList:res
    })  
  },
  //获取导航图标方法
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        cateList:result
      })   
    })
  },//获取楼层数据方法
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result
      })   
    })
  }
});