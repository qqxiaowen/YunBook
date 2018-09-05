// pages/bookmulu/bookmulu.js
import {fetch} from '../../utils/util.js'
Page({

  data: {
    bookId:'',
    bookMuli:''
  },

 
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    // console.log(this.data.bookId)
    this.getBookMulu()
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