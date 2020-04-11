var QQMapWX = require('../../service/qqmap-wx-jssdk.js');
var qqmapsdk;
var key = 'G6HBZ-E47RJ-GYIFX-KL6BD-ZMP6H-XYBML'
Page({
    data:{
      latitude:36.72167,
      longitude:101.75000,
      mapw:'100%',
      maph:'0',
      scale:'1',
      //makers:[{
       // iconPath:'/img/marker.jpg',
        //id:0,
       // latitude:36.72167,
       // longitude:101.75000
     // }]
    },
    onLoad: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: key
        })
        wx.getSystemInfo({//获取手机宽度与高度
          success:res => {
            var mapw = res.windowWidth
            var maph = res.windowHeight
            this.setData({
              maph:maph + 'px',
              controls:[{
                id:1,
                position:{
                  left:10,
                  top:30,
                  height:10
                },
                clickable:true
              }]
            })
          }
        })
    },
    onShow:function(){
      qqmapsdk.search({
        keyword:'酒店',
        success: res => {
          console.log(res)
        },
        fail: res => {
          console.log(res)
        },
        complete:res =>{
          console.log(res)
        }
      })
    },
    bindControlTap:function(e){
      console.log(e,controlId)
    },
    buttontap:function(){//获取当前位置
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success:res => {
          const latitude = res.latitude
          const longitude = res.longitude
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          })
        }
       })
    }
})
