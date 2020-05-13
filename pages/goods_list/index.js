/*
 1、用户商户页面，滚动条触底开始加载下一页数据
  ** 找到滚动条触底事件——>
  ** 判断是否有下一页数据
    * 获取到总页数 -->只有总条数  总页数=Math.ceil(总条数total / 页容量pageSize)
                                      =Math.ceil(23 / 10)
                                      =3页（第一页10条，第二页10条，第三页3条）
    * 获取当前页码 =>pageNum
    * 只要判断当前页码是否为>=总页数 => 没有下一页
    * 若没有下一页数据，弹出提示框
    * 若还有下一页数据，正常加载数据  
        获取当前页码并++
        重新发送请求
        接收数据对Data中的数据进行拼接
  2、下拉刷新页面
    ** 触发下拉刷新事件   ---> 需要在json文件中开启一个配置
      * 找到触发下拉刷新事件，在其中添加逻辑代码
    ** 清空数组
    ** 将页码置为1
    ** 重新发送请求
    ** 数据请求回来后需要手动关闭刷新等待效果
        */ 
// pages/goods_list/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pageNum:1,
    pageSize:10
  },
  //总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },

  //发送异步请求获取数据
  async getGoodsList(){
    
    const res=await request({url:"/goods/search",data:this.QueryParams})
    
    //获取总条数
    const total=res.total;
    //计算总页数
    this.totalPages=Math.ceil(total / this.QueryParams.pageSize);    
    this.setData({
      //拼接数组
      goodsList:[...this.data.goodsList,...res.goods]
    })
    
    //关闭下拉刷新等待效果
    wx.stopPullDownRefresh();
  },
  //标题的点击事件，从子组件传递过来的
  handleTabsItemChange(e){
    const {index}=e.detail;
    //修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //赋值到data中
    this.setData({
      tabs
    })
  },
  //页面上滑，滚动条触底事件
  onReachBottom(){
    // console.log("页面触底");
    //判断还有没有下一页
    if(this.QueryParams.pageNum>=this.totalPages){
      //没有下一页
      // console.log("没有咯！！");    
      wx.showToast({title: '没有下一页数据了！！' });  
    }else{
      //还有下一页数据
      this.QueryParams.pageNum++;      
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh() {
    //重置数组
    this.setData({
      goodsList:[]
    })
    //2、重置页码
    this.QueryParams.pageNum=1;
    //3、重新发送请求
    this.getGoodsList();
  }
})