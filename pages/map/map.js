// pages/EduBase/EduBase.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaid:"",
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
    markers: [],
    //经度
    longitude: "101.75087727864583",
    //纬度
    latitude: "36.72783582899306",
    list:"",
    listALL:[{
      listname:"食堂",
      id:0,
      sum:4,
      canteenarray: [{
        name: '园丁食堂',
        lat: '36.727554',
        lng: '101.751225',
        id: 0
      }, {
        name: '长悦食堂',
        lat: '36.730876',
        lng: '101.748736',
        id: 1
      }, {
        name: '学生食堂',
        lat: '36.732436',
        lng: '101.747073',
        id: 2
      }, {
        name: '锦绣餐厅',   
        lat: '36.731296',
        lng: '101.748818',
        id: 3
      },{
        name: '清真食堂',
        lat: '36.73217122395833',
        lng: '101.74722384982638',
        id: 4,
      }]
    },{
      listname:"教学楼",
      id:1,
      sum:13,
      teacharray: [{
        id:0,
        name: '综合楼 (星华楼)',
        lat: 36.728429, lng: 101.751305,
      }, {
        id:1,
        name: '农牧楼 (静远楼)',
        lat:36.724095,lng:101.750382,
      }, {
        id:2,
        name: '财经学院楼 (尚真楼)',
        lat:36.726313,lng:101.748816,
      }, {
        id:3,
        name: '理工楼 (缕金楼)',
        lat:36.726434,lng:101.752260,
      }, {
        id:4,
        name: '医学院基础医学教学楼',
        lat:36.724073,lng:101.748231,
      }, {
        id:5,
        name: '信息化技术中心 (知远楼)',
        lat:36.729204,lng:101.752198,
      }, {
        id:6,
        name: '地质系&计算机楼 (融馨楼)',
        lat:36.725341,lng:101.74946,
      }, {
        id:7,
        name: '藏医学院',
        lat:36.733277,lng:101.750967,
      }, {
        id:8,
        name: '农牧实验楼 (尚原楼)',
        lat:36.725565,lng:101.752265,
      }, {
        id:9,
        name: '机械工程学院 (智行楼)',
        lat:36.723676,lng:101.745727,
      }, {
        id:10,
        name: '化工实验楼 (雨化楼)',
        lat:36.728267,lng:101.752219,
      },{id:11,
        name:"新地质系楼",
        lat:"36.724459906684025",lng:"101.74563557942709",
      },{
        id:12,
        name:"化工学院",
        lat:"36.72550130208333",lng:"101.74507731119792",
      }]
    },{
      listname:"宿舍楼",
      id:2,
      sum:20,
      dorarray:[{
        id: 0,
        name: '学生宿舍1号楼',
        lat: '36.726981',
        lng: '101.750008',
      }, {
        id: 1,
        name: '学生宿舍2号楼',
        lat: '36.727422',
        lng: '101.750565',
      }, {
        id: 2,
        name: '学生宿舍3号楼',
        lat: '36.728354',
        lng: '101.750564',
      }, {
        id: 3,
        name: '学生宿舍6号楼',
        lat: '36.730328',
        lng: '101.747847',
      }, {
        id: 4,
        name: '学生宿舍7号楼',
        lat: '36.731051',
        lng: '101.747847',
      }, {
        id: 5,
        name: '学生宿舍8号楼',
        lat: '36.731670',
        lng: '101.747847',
      }, {
        id: 6,
        name: '学生宿舍9号楼',
        lat: '36.731670',
        lng: '101.747847',
      }, {
        id: 7,
        name: '学生宿舍10号楼',
        lat: '36.731189',
        lng :'101.746006',
      }, {
        id: 8,
        name: '学生宿舍11号楼',
        lat: '36.731601',
        lng: '101.746006',
      }, {
        id: 9,
        name: '学生宿舍12号楼',
        lat: '36.731988',
        lng: '101.746006',
      }, {
        id: 10,
        name: '学生宿舍13号楼',
        lat: '36.732356',
        lng: '101.746006',
      }, {
        id: 11,
        name: '学生宿舍14号楼',
        lat: '36.732719',
        lng:'101.746006',
      }, {
        id: 12,
        name: '学生宿舍15号楼',
        lat: '36.732773',
        lng: '101.746006',
      }, {
        id: 13,
        name: '学生宿舍16号楼',
        lat: '36.732736',
        lng: '101.747847',
      }, {
        id: 14,
        name: '学生宿舍17号楼',
        lat: '36.733184',
        lng: '101.747847',
      }, {
        id: 15,
        name: '学生宿舍18号楼',
        lat: '36.733170',
        lng: '101.744946',
      }, {
        id: 16,
        name: '学生宿舍19号楼',
        lat: '36.733184',
        lng: '101.747847',
      }, {
        id: 17,
        name: '学生宿舍20号楼',
        lat: '36.730724',
        lng: '101.744914',
      }, {
        id: 18,
        name: '学生宿舍21号楼',
        lat: '36.731210',
        lng: '101.744916',
      }, {
        id: 19,
        name: '学生宿舍22号楼',
        lat: '36.731210',
        lng: '101.744916',
      }]
    },{
      listname:"其他",
      id:3,
      otherarray: [{
        id:"0",
        name: '图书馆',
        lat: '36.727574',
        lng:'101.746787',
      }, {
        id:"1",
        name: '行政楼A区',
        lat: '36.727414',
        lng: '101.753602'
      }, {
        id:"2",
        name: '行政楼B区',
        lat: '36.727153',
        lng: '101.753081',
      }, {
        id:"3",
        name: '行政楼C区',
        lat: '36.728195',
        lng: '101.753315',
      }, {
        id:"4",
        name: '洗浴中心（长悦商务中心）',
        lat: '36.733122',
        lng: '101.749613',
      }, {
        id:'5',
        name: '创新大厦',
        lat: '36.729131',
        lng: '101.753035',
      }, {
        id:"6",
        name: '国家重点实验室',
        lat: '36.725715',
        lng: '101.745215',
      }, {
        id:"7",
        name: '科技馆',
        lat: '36.726286',
        lng: '101.750566',
      }, {
        id:"8",
        name: '农林科学院',
        lat: '36.724378',
        lng: '101.752364',
      }, {
        id:"9",
        name: '求实楼',
        lat: '36.72664822048611',
        lng: '101.75329481336806',
      }, {
        id:"10",
        name: '专家公寓',
        lat: '36.726799',
        lng: '101.754142',
      },{
        id:"11",
        name:"小岛楼(档案馆)",
        lat:"36.72870171440972",
        lng: "101.75305121527778",
      }]
    }],
  },
  navitosearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  onLoad: function (options) {
    wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: res => {
      console.log(res)
      this.setData({
        latitude:res.latitude,
        longitude:res.longitude,
      })
    }
    })
  },
  buttontap:function(){//获取当前位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: res => {
        console.log(res)
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      }
    })
  },
  callBtp: function (e) {
    console.log(e)
  },
  goto: function (e) {//显示某一分类的的所有坐标并在地图上显示标记
    var app = getApp();
    console.log(e)
    wx.showLoading({
      title: '加载中',
    })
    console.log(e.currentTarget.dataset.id)//当前点击分类ID
    //当点击ID=0分类时执行
    this.setData({
      markers:[]
    })
    if (e.currentTarget.dataset.id == 0) { 
      var mar = e.currentTarget.dataset.canteenarray;
      var markers = [];
      console.log(mar)
      for (var j = 0; j < mar.length; j++) {
        markers.push({
          iconPath: "../../img/marker-xxx.png", 
          id: mar[j]['id'], 
          latitude: mar[j]['lat'],
          longitude: mar[j]['lng'],
          width: 30,
          height: 30, 
          callout: { 
            content: mar[j]['name'],
            color: 'black',
            bgColor: 'white',
            fontSize: 20,
            width:120,
            height:38,
            padding:9,
            borderRadius: 20,
            textAlign:"center"  },
        })
      }
      this.setData({
        markers:markers
      })
      wx.hideLoading();
      console.log(this.data.markers);
      this.gotoschoolcenter();
    }
    if (e.currentTarget.dataset.id == 1) { 
      var mav = e.currentTarget.dataset.teacharray;
      var markers = [];
      console.log(mav)
      for (var v = 0; v < e.currentTarget.dataset.sum; v++) {
        markers.push({
          iconPath: "../../img/marker-xxx.png", 
          id: mav[v]['id'], 
          latitude: mav[v]['lat'],
          longitude: mav[v]['lng'],
          width: 30,
          height: 30, 
          callout: { 
            content: mav[v]['name'], 
            color: 'black',
            bgColor: 'white',
            fontSize: 20,
            width:120,
            height:38,
            padding:9,
            borderRadius: 20,
            textAlign:"center" },
        })
      }
      this.setData({
        markers:markers
      })
      
      wx.hideLoading();
      console.log(this.data.markers)
      this.gotoschoolcenter();
    }
    if (e.currentTarget.dataset.id == 2) { 
      var mat = e.currentTarget.dataset.dorarray;
      var markers = [];
      console.log(mat)
      for (var t = 0; t < mat.length; t++) {
        markers.push({
          iconPath: "../../img/marker-xxx.png", 
          id: mat[t]['id'], 
          latitude: mat[t]['lat'],
          longitude: mat[t]['lng'],
          width: 30,
          height: 30, 
          callout: { 
            content: mat[t]['name'],
            color: 'black',
            bgColor: 'white',
            fontSize: 20,
            width:120,
            height:38,
            padding:9,
            borderRadius: 20,
            textAlign:"center" },
        })
      }
      this.setData({
        markers:markers
      })
      
      wx.hideLoading();
      console.log(this.data.markers)
      this.gotoschoolcenter();
    }
    if (e.currentTarget.dataset.id == 3) { 
      var man = e.currentTarget.dataset.otherarray;
      var markers = [];
      console.log(man)
      for (var n = 0; n < man.length; n++) {
        markers.push({
          iconPath: "../../img/marker-xxx.png", 
          id: man[n]['id'], 
          latitude: man[n]['lat'],
          longitude: man[n]['lng'],
          width: 30,
          height: 30,
          callout: { 
            content: man[n]['name'], 
            color: 'black',
            bgColor: 'white',
            fontSize: 20,
            width:120,
            height:38,
            padding:9,
            borderRadius: 20,
            textAlign:"center" 
          },
        })
      }
      this.setData({
        markers:markers
      })
      wx.hideLoading();
      console.log(this.data.markers)
      this.gotoschoolcenter();
    }
  },
  gotoschoolcenter:function () {
    this.setData({
      latitude:36.72774495442708,
      longitude:101.75050075954861
    })
  },
  onShareAppMessage:function (options) {
  }
})