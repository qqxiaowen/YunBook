// pages/userCore/userCore.js
import {fetch} from '../../utils/util.js'
Page({

  data: {
    userinfo:'',
    corenum:''
  },

  onLoad: function () {
    wx.getUserInfo({
      success:res=>{
        // console.log(res)
        this.setData({
          userinfo: res.userInfo
        })
      }
    })
  },
  // 显示页面会触发
  onShow(){
    // 获取收藏数
      fetch.get('/collection/total').then(res => {
        // console.log(res)
        this.setData({
          corenum: res.data
        })
      })
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})