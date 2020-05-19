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
    var that = this
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
    othersArray: [{
      name: '图书馆',
      coord: '36.727574,101.746787',
      img:"../../img/bulidingImg/tushuguan.png"
    }, {
      name: '行政楼A区',
      coord: '36.727414,101.753602',
      img:"../../img/bulidingImg/xingzhengloua.png"
    }, {
      name: '行政楼B区',
      coord: '36.727153,101.753081',
      img:"../../img/bulidingImg/xingzhengloub.png"
    }, {
      name: '行政楼C区',
      coord: '36.728195,101.753315',
      img:"../../img/bulidingImg/xingzhenglouc.png"
    }, {
      name: '洗浴中心（长悦商务中心）',
      coord: '36.733122,101.749613',
      img:"../../img/bulidingImg/xiyuzhongxin.png"
    }, {
      name: '创新大厦',
      coord: '36.729131,101.753035',
      img:"../../img/bulidingImg/chuangxindasha.png"
    }, {
      name: '国家重点实验室',
      coord: '36.725715,101.745215',
      img:"../../img/bulidingImg/guozhongshiyanshi.png"
    }, {
      name: '科技馆',
      coord: '36.726286,101.750566',
      img:"../../img/bulidingImg/kejiguan.png"
    }, {
      name: '农林科学院',
      coord: '36.724378,101.752364',
      img:"../../img/bulidingImg/nonglinkexueyuan.png"
    }, {
      name: '求实楼',
      coord: '36.72664822048611,101.75329481336806',
      img:"../../img/bulidingImg/qiushilou.png"
    }, {
      name: '专家公寓',
      coord: '36.726799,101.754142',
      img:"../../img/bulidingImg/zhuanjiagongyu.png"
    },{
      name:"小岛楼(档案馆)",
      coord:"36.72870171440972,101.75305121527778",
      img:"../../img/bulidingImg/danganguan.png"
    }],
  },
})