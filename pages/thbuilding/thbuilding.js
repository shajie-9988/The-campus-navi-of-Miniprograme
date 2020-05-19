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
  gotoRoutePage:function(e){
    console.log(e)
    var that = this;
    var name = e.currentTarget.dataset.name;
    var coord = e.currentTarget.dataset.coord;
    that.storageNameAndCoord(name,coord);
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
    teachArray: [{
      id:0,
      name: '综合楼 (星华楼)',
      coord: '36.728408,101.751300',
      latitude: 36.728429, longitude: 101.751300,
      img:"../../img/bulidingImg/zonghelou.jpg"
    }, {
      id:1,
      name: '农牧楼 (静远楼)',
      desc:'农牧学院办公室',
      coord: '36.724095,101.750382',
      latitude:36.724095,longitude:101.750382,
      img:"../../img/bulidingImg/nongmulou.png"
    }, {
      id:2,
      name: '财经学院楼 (尚真楼)',
      desc:'财经学院办公室（南侧）',
      coord: '36.726313,101.748816',
      latitude:36.726313,longitude:101.748816,
      img:"../../img/bulidingImg/caijingxueyuan.png"
    }, {
      id:3,
      name: '理工楼 (缕金楼)',
      desc:'工科类实验室与测绘类仪器发放处',
      coord: '36.726434,101.752260',
      latitude:36.726434,longitude:101.752260,
      img:"../../img/bulidingImg/ligonglou.png"
    }, {
      id:4,
      name: '医学院基础医学教学楼',
      desc:'主要教学楼',
      coord: '36.724073,101.748231',
      latitude:36.724073,longitude:101.748231,
      img:"../../img/bulidingImg/yixueyuan.png"
    }, {
      id:5,
      name: '信息化技术中心 (知远楼)',
      desc:'上机实验楼之一，校园卡事务办理处',
      coord: '36.729204,101.752198',
      latitude:36.729204,longitude:101.752198,
      img:"../../img/bulidingImg/xinxizhongxin.png"
    }, {
      id:6,
      name: '(旧)地质系&计算机楼 (融馨楼)',
      desc:'大学物理/地质类实验室 含机房',
      coord: '36.725341,101.749465',
      latitude:36.725341,longitude:101.74946,
      img:"../../img/bulidingImg/jiudizhilou.png"
    }, {
      id:7,
      name: '藏医学院',
      desc:'藏医学院',
      coord: '36.733277,101.750967',
      latitude:36.733277,longitude:101.750967,
      img:"../../img/bulidingImg/zangyixueyuan.png"
    }, {
      id:8,
      name: '农牧实验楼 (尚原楼)',
      desc:'生态环境学院/农牧实验场所',
      coord: '36.725565,101.752265',
      latitude:36.725565,longitude:101.752265,
      width: 30, height: 30,
      img:"../../img/bulidingImg/nongkeyuan.png"
    }, {
      id:9,
      name: '机械工程学院 (智行楼)',
      desc:'金工实习场所',
      coord: '36.723676,101.745727',
      latitude:36.723676,longitude:101.745727,
      width: 30, height: 30,
      img:"../../img/bulidingImg/jixiegongchengxueyuan.png"
    }, {
      id:10,
      name: '化工实验楼 (雨化楼)',
      desc:'化工实验室所在',
      coord: '36.728267,101.752219',
      latitude:36.728267,longitude:101.752219,
      img:"../../img/bulidingImg/laohuayuan.png"
    },{
      id:11,
      name:"新地质系楼",
      coord:"36.724459906684025,101.74563557942709",
      latitude:"36.724459906684025",longitude:"101.74563557942709",
      img:"../../img/bulidingImg/xindizhilou.png"
    },{
      id:12,
      name:"化工学院",
      coord:"36.72550130208333,101.74507731119792",
      latitude:"36.72550130208333",longitude:"101.74507731119792",
      img:"../../img/bulidingImg/huagongxueyuan.png"
    }]
  }
})