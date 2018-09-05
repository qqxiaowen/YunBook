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
    font:40
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

      this.setData({
        // article:data,
        article: res.data.article.content,
        isLoading:false
      })
    })
  },

    // 得到书目录
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        bookMuli: res.data
      })
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
    // 根据新的章节id去冲亲请求数据
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
  

  //  用户点击右上角分享
  onShareAppMessage: function () {
  
  }
})