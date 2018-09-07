import {fetch} from '../../utils/util.js'

Page({

  data: {
    bookId:"",
    bookInfor:"",
    updataData:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 得到书的id
    this.setData({
      bookId: options.id
    })
    this.getData()
  },

  // 根据书的id去请求该书的详情页
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
      // 处理更新时间
      let timeold = new Date(res.data.createTime).getTime()
      let timenow = new Date().getTime()
      let timecha = (timenow - timeold)/1000
      let time=""

      if(timecha<60){
        time = Math.floor(timecha)+"秒"
      }else if (timecha < 3600) {
        time = Math.floor(timecha / 60) + "分"
      }else if (timecha < 3600 * 24) {
        time = Math.floor(timecha / 3600) + "小时"
      }else if (timecha < 3600 * 24 * 30) {
        time = Math.floor(timecha / 3600 / 24) + "天"
      }else {
        time = Math.floor(timecha / 3600 / 24 / 30) + "月"
      }
      

      this.setData({
        bookInfor: res,
        updataData:time
      })
    })
  },
  // 点击阅读跳转到该书的目录
  jumpbookMulu() {
    wx.navigateTo({
      url: `/pages/bookmulu/bookmulu?id=${this.data.bookId}`
    })
  },
  // 转发
  onShareAppMessage(res) {
    if(res.from === 'button'){
      // console.log('点击按钮分享')
    }
    return {
      title: this.data.bookInfor.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl: this.data.bookInfor.data.img
    }
  },

  // 点击收藏该书 
  getShouCang(){

    let bookInfor = this.data.bookInfor
    if (bookInfor.isCollect == 0) {
      fetch.post('/collection', {
        bookId: this.data.bookId
      }).then(res => {
        wx.showToast({
          title: '收藏成功',
          duration: 1000
        })
        // console.log(bookInfor)
        bookInfor.isCollect = 1
        this.setData({
          bookInfor
        })
      })
    }else{
      wx.showToast({
        title: '已经收藏过啦',
        duration: 1000
      })
    }
  },
  
})