const TOKEN = 'token'

App({ 
  onLoad:function(){
    //先从缓冲中取出token
    const token = wx.getStorageSync(TOKEN)

    //判断token是否有值
    if (token && token.length !== 0) {//已经有token，验证token是否过期
      //验证token是否过期
      this.check_token(token)
    }else{//没有token的话进去登录操作
      this.login()
    }
   
    
  },
  check_token(token){
    console.log('执行了验证token操作')
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method:'post',
      header:{
        token
      },
      success:res => {
        if(!res.data.errCode){
          console.log('token有效')
          this.globaData.token = token;
        }else{
          this.login()
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
  },


   //登录操作
   login(){
    console.log('执行了登录操作')
    wx.login({
      //code只要5分钟有效期
      success: res => {
        const code = res.code;
        //将code发送给我们的服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: res => {
            //取出token
            const token = res.data.token;
            //将token保存在globaDate中
            this.globaData.token = token;
            //进行本地存储
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  }
})
