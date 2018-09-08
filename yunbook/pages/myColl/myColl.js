import {fetch} from '../../utils/util.js'
Page({

  data: {
    mycoll:'',
    isLoading: true
  },

  onLoad: function (options) {
  },
  // 获取数据
  getData() {
    fetch.get('/readList').then(res => {
      // console.log(res)
      if(!res.data){
        wx.showModal({
          title: '小提示',
          content: '还没有阅读任何书籍，快去阅读吧！',
          showCancel: false,
          success(res) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        })
      }else{
        let arr = [...res.data]
        // 处理查看时间
        let timenow = new Date().getTime()
        for (let i = 0; i < arr.length; i++) {

          let timeold = new Date(arr[i].updatedTime).getTime()
          let timecha = (timenow - timeold) / 1000
          let time = ""
          if (timecha < 60) {
            time = Math.floor(timecha) + "秒"
          } else if (timecha < 3600) {
            time = Math.floor(timecha / 60) + "分"
          } else if (timecha < 3600 * 24) {
            time = Math.floor(timecha / 3600) + "小时"
          } else if (timecha < 3600 * 24 * 30) {
            time = Math.floor(timecha / 3600 / 24) + "天"
          } else {
            time = Math.floor(timecha / 3600 / 24 / 30) + "月"
          }
          arr[i].lastlook = time;
          // 看书进度
          arr[i].jindu = Math.ceil((arr[i].title.index + 1) * 100 / (arr[i].title.total))
        }
        this.setData({
          mycoll: arr,
          isLoading: false
        })
        console.log(this.data.mycoll)
      }

    })   

  },

  // 点击跳转详情页面
  gumpDetail(e){
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  // 点击继续阅读
  gumpContinue(e){
    console.log(e.currentTarget)
    let id = e.currentTarget.dataset.id
    let bookid = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: `/pages/book/book?_id=${id}&bookId=${bookid}`,
    })
  },
  //  页面变化时，触发 
  onShow(){
    this.getData()
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.getData()
    wx.stopPullDownRefresh()
  },

    // 用户点击右上角分享
  onShareAppMessage: function () {
  
  }
})