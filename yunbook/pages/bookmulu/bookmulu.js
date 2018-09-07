// pages/bookmulu/bookmulu.js
import {fetch} from '../../utils/util.js'
Page({

  data: {
    bookId:'',
    bookMuli:'',
    booktitle:''
  },

 
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    // console.log(options)
    // console.log(this.data.bookId)
    this.getBookMulu()

  // 获取书名
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      this.setData({
        booktitle: res.data.title
      })
      // console.log(this.data.booktitle)
      wx.setNavigationBarTitle({
        title: this.data.booktitle,
      })
    })
  },
  getBookMulu(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      this.setData({
        bookMuli: res.data
      })
      // console.log(this.data.bookMuli)
    })
  },

 
  //  用户点击右上角分享
  onShareAppMessage: function () {
  
  }
})