const basUrl = 'https://m.yaojunrong.com';

const fetch= {
  http(url, method,data){
    return new Promise((resolve,reject)=>{
      let Token = wx.getStorageSync('Token')
      let token = wx.getStorageSync('token')
      let header = {
        'content-typr': 'application/json'
      }
      if (Token){
        header.Token = Token
      }else if(token){
        header.token = token
      }
      wx.request({
        url: basUrl+url,
        data,
        method,
        header,
        success(res) {
          // console.log(1)
          // console.log(res)
          if(res.header.Token){
            wx.setStorageSync('Token', res.header.Token)
          } else if (res.header.token){
            wx.setStorageSync('token', res.header.token)
          }
          resolve(res.data)
        },
        fail(xb) {
          reject(console.log(xb))
        }
      })
    })

  },

  get(url,data){
    return this.http(url, 'GET',data)
  },
  post(url,data){
    return this.http(url,'POST',data)
  },

  delete(url,data){
    return this.http(url, 'DELETE', data)
  }
  
}

const login= ()=>{
  wx.login({
    success(res) {
      fetch.post('/login', {
        code: res.code,
        appid: 'wx15d5afaf897921cf',
        secret: '58e904e68f75155e0967fa52b0c1de5d'
      }).then(res => {
        console.log(res)
      })
    }
  })
}
 

exports.login = login;
exports.fetch = fetch;