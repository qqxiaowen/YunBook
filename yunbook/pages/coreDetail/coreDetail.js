// pages/coreDetail/coreDetail.js
import {fetch} from "../../utils/util.js"
Page({
  data: {
    pn:1,
    core:'',
    onoff:true
  },

  onLoad: function (options) {
  this.getCore()
  },
  // 获取数据
  getCore(){
    fetch.get('/collection', {
      pn: this.data.pn,
      size: 4
    }).then(res => {
      this.setData({
        core: res.data
      })
      console.log(res.data)
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
    }).catch(err=>{
      console.log(err)
    })
   
  },
  
  // 上拉获取更多数据
  onReachBottom(){
    // console.log(this.data.core.length/4)
    // console.log(this.data.core.length%4)
    if (this.data.onoff){
      this.setData({
        pn: this.data.pn + 1
      })
      fetch.get('/collection', {
        pn: this.data.pn,
        size: 4
      }).then(res => {
        console.log(res.data)
          this.setData({
            core: [...this.data.core, ...res.data],
          })
        if (res.data.length<4){
          this.setData({
            onoff: false
          })
        }
      })
    }
  },
  // 刷新页面
  getyemian(){
    this.setData({
      pn: 1,
      onoff: true
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