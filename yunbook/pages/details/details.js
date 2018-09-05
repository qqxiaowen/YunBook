import {fetch} from '../../utils/util.js'

Page({

  data: {
    bookId:"",
    bookInfor:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 得到轮播图上书的id
    this.setData({
      bookId: options.id
    })
    this.getData()
  },

  // 根据书的id去请求该书的详情页
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      // console.log(res)
      this.setData({
        bookInfor: res
      })
      // console.log(this.data.bookInfor)
    })
  },
  // 点击阅读跳转到该书的目录
  jumpbookMulu() {
    wx.navigateTo({
      url: `/pages/bookmulu/bookmulu?id=${this.data.bookId}`
    })
  }

})