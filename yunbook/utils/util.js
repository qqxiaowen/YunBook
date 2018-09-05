const basUrl = 'https://m.yaojunrong.com';

const fetch= {
  http(url,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: basUrl+url,
        data,
        header: {
          'content-typr': 'application/json'
        },

        success(ok) {
          resolve(ok.data)
        },
        fail(xb) {
          reject(console.log(xb))
        }
      })
    })

  },

  get(url,data){
    return this.http(url,data)
  }
}

exports.fetch = fetch;