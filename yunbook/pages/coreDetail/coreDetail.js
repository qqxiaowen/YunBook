// pages/coreDetail/coreDetail.js
import {fetch} from "../../utils/util.js"
Page({
  data: {
    pn:1,
    core:'',
    onoff:true,
    loding:false,
    isLoding:true
  },

  // 获取数据
  getCore(){
    fetch.get('/collection', {
      pn: this.data.pn,
      size: 4
    }).then(res => {
      this.setData({
        core: res.data,
        isLoding:false
      })
     if(res.data.length == 4){
       this.setData({
         loding:true
       })
     } else if (res.data.length == 0){
       wx.showModal({
         title: '小提示',
         content: '还没有添加任何收藏，快去添加吧！',
         showCancel: false,
         success(res){
           wx.switchTab({
             url: '/pages/userCore/userCore'
           })
         }         
       })
       
     }
      console.log(this.data.loding)
      // console.log(res.data)
    })
  },
  // 点击跳转书籍详情
  jumpdetail(e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },

  // 删除单个收藏
  deleCore(e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    fetch.delete(`/collection/${id}`).then(res=>{
      console.log(res)
      wx.showToast({
        title: '删除成功',
        duration: 1000
      })
      this.getyemian()
      this.getMoreyemian()
    }).catch(err=>{
      console.log(err)
    })
   
  },
  // 获取更多数据
  getMoreyemian(){
    if (this.data.onoff) {
      this.setData({
        pn: this.data.pn + 1
      })
      fetch.get('/collection', {
        pn: this.data.pn,
        size: 4
      }).then(res => {
        this.setData({
          core: [...this.data.core, ...res.data],
        })
        console.log(res.data)
        if (res.data.length < 4) {
          this.setData({
            onoff: false
          })
        }
      })
    }
  },
  // 上拉获取更多数据
  onReachBottom(){
    this.getMoreyemian()
  },
  // 页面显示/切入前台时触发
  onLoad(){
    this.getyemian()
  },
  // 刷新页面
  getyemian(){
    this.setData({
      pn: 1,
      onoff: true,
      loding: false,
      isLoding: true
    })
    this.getCore();
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getyemian()
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   
  }
})