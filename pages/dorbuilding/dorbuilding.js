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
  data:{
    dorArray: [{
    id: 0,
    name: '1号楼:农牧学院&计算机系(男生)',
    class: 0,
    coord: '36.726981,101.750008',
    latitude: 36.72698 ,longitude: 101.750008,
    width: 30, height: 30
  }, {
    id: 1,
    name: '2号楼:医学院&地质系(男生)',
    class: 0,
    coord: '36.727422,101.750565',
    latitude: 36.72742 ,longitude: 101.750565,
    alpha:1,width: 30, height: 30
  }, {
    id: 2,
    name: '3号楼:农牧学院(女生)',
    class: 1,
    coord: '36.728354,101.750564',
    latitude: 36.7283541,longitude: 101.750564,
    alpha:1, width: 30, height: 30
  }, {
    id: 3,
    name: '6号楼:土木工程系(男生)',
    class: 0,
    coord: '36.730328,101.747847',
    latitude: 36.730328 ,longitude: 101.747847,
    alpha:1,width: 30, height: 30
  }, {
    id: 4,
    name: '7号楼:水利电力学院(男生)',
    class: 0,
    coord: '36.731051,101.747847',
    latitude: 36.73105 ,longitude: 101.747847,
    alpha:1, width: 30, height: 30
  }, {
    id: 5,
    name: '8号楼:昆仑学院&水利水电(女生)',
    class: 1,
    coord: '36.731670,101.747847',
    latitude: 36.731670,longitude: 101.747847,
    alpha:1, width: 30, height: 30
  }, {
    id: 6,
    name: '9号楼:水利电力学院&土木工程学院(男生)',
    class: 0,
    coord: '36.731670,101.747847',
    latitude: 36.732315 ,longitude: 101.747847,
    alpha:1,width: 30, height: 30
  }, {
    id: 7,
    name: '10号楼:财经学院(女生)',
    class: 1,
    coord: '36.731189,101.746006',
    latitude: 36.731189,longitude: 101.746006,
    alpha:1, width: 30, height: 30
  }, {
    id: 8,
    name: '11号楼:财经学院(女生)',
    class: 1,
    coord: '36.731601,101.746006',
    latitude: 36.731601,longitude: 101.746006,
    alpha:1, width: 30, height: 30
  }, {
    id: 9,
    name: '12号楼:医学院(女生)',
    class: 1,
    coord: '36.731988,101.746006',
    latitude: 36.731988,longitude: 101.746006,
    alpha:1,width: 30, height: 30
  }, {
    id: 10,
    name: '13号楼:财经学院(男生)',
    class: 0,
    coord: '36.732356,101.746006',
    latitude: 36.73235,longitude: 101.746006,
    alpha:1,width: 30, height: 30
  }, {
    id: 11,
    name: '14号楼:计算机系&机械工程学院(男生)',
    class: 0,
    coord: '36.732719,101.746006',
    latitude: 36.732719,longitude: 101.746006,
    alpha:1,width: 30, height: 30
  }, {
    id: 12,
    name: '15号楼:机械工程学院(男生)',
    class: 0,
    coord: '36.732773,101.746006',
    latitude: 36.733149,longitude: 101.746006,
    alpha:1, width: 30, height: 30
  }, {
    id: 13,
    name: '16号楼:土木工程学院&水利电力学院(女生)',
    class: 0,
    coord: '36.732736,101.747847',
    latitude: 36.732736,longitude: 101.747847,
    alpha:1,width: 30, height: 30
  }, {
    id: 14,
    name: '17号楼:藏医学院&生态学院(男生)',
    class: 0,
    coord: '36.733184,101.747847',
    latitude: 36.733184, longitude: 101.747847,
    alpha: 1, width: 30, height: 30
  }, {
    id: 15,
    name: '18号楼:化工学院(男生)',
    class: 0,
    coord: '36.733170,101.744946',
    latitude: 36.73317, longitude: 101.744946,
    alpha:1,width: 30, height: 30
  }, {
    id: 16,
    name: '19号楼:生态学院(女生)',
    coord: '36.732779,101.744937',
    latitude: 36.732779, longitude: 101.744937,
    alpha:1, width: 30, height: 30
  }, {
    id: 17,
    name: '20号楼:地质工程系&化工学院(女生)',
    coord: '36.730724,101.744914',
    latitude: 36.730724, longitude: 101.744914,
    width: 30, height: 30
  }, {
    id: 18,
    name: '21号楼:藏医学院(女生)',
    class: 1,
    coord: '36.731210,101.744916',
    latitude: 36.731210,longitude: 101.744914,
    alpha:1, width: 30, height: 30
  }, {
    id: 19,
    name: '22号楼:研究生宿舍(男女混住)',
    class: 3,
    coord: '36.731210,101.744916',
    latitude: 36.731636,longitude: 101.744914,
    alpha:1, width: 30, height: 30
  }],
  }
})