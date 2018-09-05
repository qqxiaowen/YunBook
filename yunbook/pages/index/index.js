//index.js
// 导入封装的fecth
import {fetch} from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
      LunBodata: [],
      mainContent:[],
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 300,
      isLoading: true
  },
 
  onLoad: function () {
    this.getData()
    this.getContent()
  },

// 得到轮播图数据
  getData(){
    fetch.get('/swiper').then(res=>{
      this.setData({
        LunBodata: res.data,
        isLoading:false
      })
      // console.log(this.data.LunBodata)
    }).catch(xb=>{
      console.log(xb)
    })
  },
// 得到首页书籍分类内容
  getContent(){
    fetch.get('/category/books').then(res=>{
      // console.log(res)
      this.setData({
        mainContent:res.data
      })
    })
  },
  // 得到轮播图每个img的书id
  jumpBook(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
  
})
