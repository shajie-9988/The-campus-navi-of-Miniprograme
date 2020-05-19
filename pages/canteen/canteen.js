var name='',coord='';
var nameKey = '', coordKey = []
Page({
  onLoad:function () {
    wx.getSystemInfo({
      success:res=>{
        var infoheight = res.windowHeight - "34"
        this.setData({
          infoheight:infoheight
        })
      }
    })
  },
  data:{
    boxheadname:"食堂"
  },
  gotoRoutePage:function(e){
    console.log(e)
    var name = e.currentTarget.dataset.name;
    var coord = e.currentTarget.dataset.coord;
    this.storageNameAndCoord(name,coord);
    console.log(name,coord);
    wx.navigateTo({
      url: '/pages/route/route?statue=3',
      success: function (res) {
        console.log("成功跳转路线");
      },
      fail: function (res) {
        console.log("失败跳转路线,请刷新重试");
      }
    })
  },
  storageNameAndCoord:function(name,coord){
    wx.setStorage({
      data: name,
      key: 'nameKey',
    }),
    wx.setStorage({
      data: coord,
      key: 'coordKey',
    })
  },
  data: {
    canteenArray: [{
      name: '园丁食堂',
      coord: '36.72755095442708,101.75124075954861',
      id: 0,
      img:"../../img/bulidingImg/yuandingshitang.png"
    }, {
      name: '长悦食堂',
      coord: '36.731011349,101.748860674',
      id: 1,
      img:"../../img/bulidingImg/cahngyueshitang.png"
    }, {
      name: '学生食堂',
      coord: '36.732072698,101.747091349',
      id: 2,
      img:"../../img/bulidingImg/xueshengshitang.png"
    }, {
      name: '锦绣餐厅',   
      coord: '36.731296,101.748818',
      id: 3,
      img:"../../img/bulidingImg/jingxiucanting.png"
    }, {
      name: '清真食堂',
      coord: '36.73217122395833,101.74722384982638',
      id: 4,
      img:"../../img/bulidingImg/qingzhengshitang.png"
    }]
   ,
  }
})