//index.js
// 导入封装的fecth
import {fetch ,login} from '../../utils/util.js'
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
      isLoading: true,
      // 上拉相关
      offon:true,
      pn:1

  },
 
  onLoad: function () {
    this.getData()
    this.getContent()
    login()
  },

// 得到轮播图数据
  getData(){
    fetch.get('/swiper').then(res=>{
      this.setData({
        LunBodata: res.data,
        isLoading:false
      })
      // console.log(this.data.LunBodata)
    })
  },
// 得到首页书籍分类内容
  getContent(){
    fetch.get('/category/books').then(res=>{
      // console.log(res.data)
      this.setData({
        mainContent:res.data,
        isLoading: false
      })
    })
  },
  // 得到轮播图每个img的书id
  jumpBook(e){
    // console.log(e.currentTarget.dataset)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },


  // 得到更多的书籍分类
  getMoreContent(){
    return fetch.get('/category/books',{
      pn:this.data.pn
    })
  },

  // 监听上拉事件
  onReachBottom(){
    if (this.data.offon){

      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        // console.log(res.data)
        this.setData({
          mainContent: [...this.data.mainContent, ...res.data]
        })
        if (res.data.length<2){
          this.setData({
            offon:false
          })
        }
      })
    }
  },
  // 监听下拉事件
  onPullDownRefresh(){
    this.setData({
      isLoading:true
    })
    Promise.all([this.getContent(),this.getData()]).then(()=>{
      // console.log('刷新了')
      wx.stopPullDownRefresh()
      this.setData({
        pn: 1,
        offon: true
      })
    }).catch(err=>{

    })
    
  },
  // 转发
  onShareAppMessage(){
    return{
      title:'Web小书库',
      path:'/pages/index/index',
      imageUrl:'/static/img/YunBook_logo.png'
    }
  }

  
})
