// pages/book/book.js
import { fetch } from '../../utils/util.js'
const app = getApp()

Page({
  data: { 
    // 书章节的id
    bookchapter:'',
    // 书的id
    bookId:'',
    // markdown数据
    article:'',
    // 书目录
    bookMuli:'',
    // 是否显示菜单
    isShow:false,
    isLoading: true,
    font:40,
    index:''
  },

  onLoad: function (options) {
    // console.log(options) 
    this.setData({
      bookchapter: options._id,
      bookId: options.bookId
    })
    this.getbookcont()
    this.getCatalog()
  },
  
  // 取得mardown数据
  getbookcont(){
    fetch.get(`/article/${this.data.bookchapter}`).then(res=>{
      // console.log(res.data.title)
      wx.setNavigationBarTitle({
        title: res.data.title
      })

      this.setData({
        // article:data,
        article: res.data.article.content,
        index: res.data.article.index,
        isLoading:false,
      })
    })
  },

    // 得到书目录
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        bookMuli: res.data
      })
      // console.log(res.data)
    })
  },
  // 点击菜单去弹出菜单
  toggleCatalog(){
    this.setData({
      isShow: !this.data.isShow,
    })
  },


  // 点击目录上的其他章节，跳转
  handleGet(e){
    const id = e.currentTarget.dataset.id
    this.setData({
      // 改变现在章节的id
      bookchapter: id,
      isShow: !this.data.isShow,
      isLoading: true
    })
    // 根据新的章节id去重新请求数据
    this.getbookcont()
  },

  // 点击增大字体
  toFontsAdd(){
    this.setData({
      font:this.data.font +2
    })
  },
  // 点击缩小字体
  toFontsRud(){
    if (this.data.font<=26){
      wx.showModal({
        title: '小提示',
        content: '字体太小，对眼镜不好喲',
        showCancel:false
      })
    }else{
      this.setData({
        font:this.data.font-2
      })
    }
  },
  // 实现点击下一章
  NextChapter(){
    // console.log(this.data.index)
    // console.log(this.data.bookMuli[this.data.index])
    if (this.data.bookMuli[this.data.index + 1]){
      this.setData({
        bookchapter: this.data.bookMuli[this.data.index + 1]._id,
        isLoading: true
      })
      this.getbookcont()
    }else{
      wx.showModal({
        title: '小提示',
        content: '已经是最后一章啦',
        showCancel: false
      })
    }
  },

  // 点击实现上一章
  PrevChapter(){
    if (this.data.index - 1 < 0) {
      wx.showModal({
        title: '小提示',
        content: '已经是第一章啦',
        showCancel: false
      })
    }else{
      this.setData({
        bookchapter: this.data.bookMuli[this.data.index - 1]._id,
        isLoading: true
      })
      this.getbookcont()
    }
  },
  

  //  用户点击右上角分享
  onShareAppMessage: function () {
  
  }
})