import {fetch} from '../../utils/util.js'
Page({

  data: {
    mycoll:''
  },

  onLoad: function (options) {
    fetch.get('/readList').then(res=>{
      console.log(res)
        this.setData({
          mycoll:res.data
        })
      })   
  },


    // 用户点击右上角分享
  onShareAppMessage: function () {
  
  }
})