var name="",coord="";
var QQMapWX = require('../../components/tx-SDK/qqmap-wx-jssdk.js');
 // 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'G6HBZ-E47RJ-GYIFX-KL6BD-ZMP6H-XYBML'
});
//当前页面所有定义的变量
var p1Key='',p2Key='';
var latitude=0,longitude=0;
var aimlatitude=0,aimlongitude=0;
var aimLocation='',currentLocation='';
var aimLoc='',currentLoc='';
var currentLati=0,currentLong=0;
var GoToname="",GoTonameKey="";
var disdKey='',diswKey=''
var steps=[],stepsKey=""
Page({
  data: {
    condition:"true",
    markers:[],
    latitude:0,
    longitude:0,
    aimlatitude:0,
    aimlongitude:0,
    name:"",
    coord:"",
    currentLati:0,
    currentLong:0,
    currentLocation:'',
    currentLatitude:0,
    currentLongitude:0,
    destination:"",
  },
  backToCenter:function () {//将获取的用户坐标传递至视图层
    wx.getLocation({
      type: 'gcj02',
      success:res=>{
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude,
        })
      }
    })
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success:res=>{
        var infoheight = res.windowHeight-"145"
        this.setData({
          infoheight:infoheight
        })
        console.log(infoheight)
      }
    })
    console.log(options)
    this.setData({
      aimLocation:""
    })
    var statue = options.statue
    var addr1 = options.searchInfoaddr
    var addr2 = options.searchaddr
    console.log(addr1,"传递成功")
    if(statue == 1){
      //用户自行输入进行跳转
      wx.getStorage({
        key:"searchLocInfoKey",
        success:res=>{
          var aimcoordinfo = res.data
          console.log(aimcoordinfo,"by用户输入")
          aimlatitude = parseFloat(aimcoordinfo.split(',')[0])
          aimlongitude = parseFloat(aimcoordinfo.split(',')[1])
          this.setData({
            latitude:aimlatitude,
            longitude:aimlongitude,
            aimLocation:aimlatitude+","+aimlongitude,
            address:addr1
          })
        }
      })
      wx.getStorage({
        key: 'searchLocNameInfoKey',
        success: res => {
        //取出数据中的name
          name = res.data;
          this.setData({
            name:name
          })
          this.saveGoTOname(name)
          console.log(name,'by用户输入')
        }
      })
    }
    if(statue == 2){
      //用户点击检索列表进行跳转
      wx.getStorage({
        key:"searchLocKey",
        success:res=>{
          var aimcoord = res.data
          console.log(aimcoord,"by用户选择")
          aimlatitude = parseFloat(aimcoord.split(',')[0])
          aimlongitude = parseFloat(aimcoord.split(',')[1])
          this.setData({
            latitude:aimlatitude,
            longitude:aimlongitude,
            aimLocation:aimlatitude+","+aimlongitude,
            address:addr2
          })
        }
      })
      wx.getStorage({
        key: 'searchLocNameKey',
        success: res => {
        //取出数据中的name
          name = res.data;
          this.setData({
            name:name
          })
          this.saveGoTOname(name)
          console.log(name,'by用户选择')
        },
      })
    }
    if(statue == 3){
      //用户点击文档进行跳转
      wx.getStorage({
        key:"coordKey",
        success:res=>{
          coord = res.data
          console.log(coord,"文档跳转")
          aimlatitude = parseFloat(coord.split(',')[0])
          aimlongitude = parseFloat(coord.split(',')[1])
          this.setData({
            aimLocation:coord,
            latitude:aimlatitude,
            longitude:aimlongitude,
          })
          console.log(aimlatitude,aimlongitude,"目的地坐标")
        }
      })
      //获取目的地名字
      wx.getStorage({
        key: 'nameKey',
        success: res => {
        //取出数据中的name
          name = res.data;
          this.setData({
            name:name
          })
          this.saveGoTOname(name)
          console.log(name,'文档跳转')
        },
      })
    }
    //获取当前位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: res => {
        currentLati = res.latitude,
        currentLong = res.longitude,
        console.log(currentLati,currentLong,"用户当前位置")
        this.setData({
          currentLatitude:currentLati,
          currentLongitude:currentLong,
          currentLocation:res.latitude+','+res.longitude,
          markers:[{
            iconPath:"../../img/des.png",
            id: 0,
            latitude: currentLati,
            longitude: currentLong,
            width: 30,
            height: 30
          },{
            iconPath:"../../img/orgin.png",
            id:1,
            callout: {
              content: name,
              color: 'black',
              bgColor: 'white',
              fontSize: 20,
              width:120,
              height:38,
              padding:9,
              borderRadius: 20,
              textAlign:"center" 
            },
            latitude: aimlatitude,
            longitude: aimlongitude,
            width: 30,
            height: 30
          }]
        })
      }
    }),
    wx.getSystemInfo({
      success:res=>{
        console.log(res.windowHeight)
        this.setData({
          infoheight:res.windowHeight*4/5+"px"
        })
      }
    })
  },
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',
      from: e.detail.value.currentLocation,
      to: e.detail.value.aimLocation, 
      success: function (res) {
        var stepsarray = res.result.routes
        console.log(stepsarray,"driving")
        var steps = stepsarray[0].steps
        console.log(steps,"stepsd")
        _this.savestepsd(steps)
        var ret = res;
        var disd = ret.result.routes[0].steps
        var sumd = 0
        var coors = ret.result.routes[0].polyline, p1 = [];
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          p1.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        for (var d = 0;d<disd.length;d++){
          sumd = sumd + disd[d].distance
        }
        console.log(sumd)
        _this.savedisd(sumd)
        var polyline1=[{
          points: p1,
          color: '#00FF00',
          width: 6
        }]
        _this.saveP1(polyline1)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          condition:"false",
          steps:stepsarray,
          polyline1: [{
            points: p1,
            latitude:p1[0].latitude,
            longitude:p1[0].longitude,
            color: '#00FF00',
            width: 6
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function () {
      }
    }),
    qqmapsdk.direction({
      mode: 'walking',
      from: e.detail.value.currentLocation,
      to: e.detail.value.aimLocation, 
      success: function (res) {
        var stepsarray = res.result.routes
        console.log(stepsarray,"walking")
        var ret = res;
        var disw = ret.result.routes[0].steps
        var sumw = 0
        var coors = ret.result.routes[0].polyline, p2 = [];
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          p2.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        for (var w = 0;w<disw.length;w++){
          sumw = sumw + disw[w].distance
        }
        console.log(sumw)
        _this.savedisw(sumw)
        var polyline2=[{
          points: p2,
          color: '#00FF00',
          width: 6
        }]
        _this.saveP2(polyline2)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          condition:"false",
          steps:stepsarray,
          polyline2: [{
            latitude:p2[0].latitude,
            longitude:p2[0].longitude,
            points: p2,
            color: '#00FF00',
            width: 6
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function () {
      }
    })
    
    wx.navigateTo({
      url: '/pages/navipage/navipage',
    })
  },
  data:{
    scale:16,
    current:"true",
    masterList: [{
      name: '园丁食堂',
      coord: '36.727554,101.751225',
      id: 0
    }, {
      name: '长悦食堂',
      coord: '36.730876,101.748736',
      id: 1
    }, {
      name: '学生食堂',
      coord: '36.732436,101.747073',
      id: 2
    }, {
      name: '锦绣餐厅',
      coord: '36.731296,101.748818',
      id: 3
    }, {
      name: '棠梨路',
      coord: '36.731296,101.748818',
      id: 4
    },{
      id: 5,
      name: '学生宿舍1号楼',
      coord: '36.726981,101.750008',
      cast: '农牧学院&计算机系（男生）',
    }, {
      id: 6,
      name: '学生宿舍2号楼',
      coord: '36.727422,101.750565',
      cast: '医学院&地质系（男生）',
    }, {
      id: 7,
      name: '学生宿舍3号楼',
      coord: '36.728354,101.750564',
      cast: '农牧学院（女生）', 
    }, {
      id: 8,
      name: '学生宿舍6号楼',
      coord: '36.730328,101.747847',
      cast: '土木工程系（男生）',
    }, {
      id: 9,
      name: '学生宿舍7号楼',
      coord: '36.731051,101.747847',
      cast: '水利电力学院（男生）',
    }, {
      id: 10,
      name: '学生宿舍8号楼',
      coord: '36.731670,101.747847',
      cast: '昆仑学院&水利水电（女生）',
    }, {
      id: 11,
      name: '学生宿舍9号楼',
      coord: '36.731670,101.747847',
      cast: '水利电力学院&土木工程学院（男生）',
    }, {
      id: 12,
      name: '学生宿舍10号楼',
      coord: '36.731189,101.746006',
      cast: '财经学院（女生）', 
    }, {
      id: 13,
      name: '学生宿舍11号楼',
      coord: '36.731601,101.746006',
      cast: '财经学院（女生）', 
    }, {
      id: 14,
      name: '学生宿舍12号楼',
      coord: '36.731988,101.746006',
      cast: '医学院（女生）',
    }, {
      id: 15,
      name: '学生宿舍13号楼',
      coord: '36.732356,101.746006',
      cast: '财经学院（男生）',
    }, {
      id: 16,
      name: '学生宿舍14号楼',
      coord: '36.732719,101.746006',
      cast: '计算机系&机械工程学院（男生）',
    }, {
      id: 17,
      name: '学生宿舍15号楼',
      coord: '36.732773,101.746006',
      cast: '机械工程学院（男生）', 
    }, {
      id: 18,
      name: '学生宿舍16号楼',
      coord: '36.732736,101.747847',
      cast: '土木工程学院&水利电力学院（女生）',
    }, {
      id: 19,
      name: '学生宿舍17号楼',
      coord: '36.733184,101.747847',
      cast: '藏医学院&生态学院（男生)',
    }, {
      id: 20,
      name: '学生宿舍18号楼',
      coord: '36.733170,101.744946',
      cast: '化工学院（男生）',
    }, {
      id: 21,
      name: '学生宿舍19号楼',
      cast: '生态学院（女生）',
      coord: '36.732779,101.744937',
    }, {
      id: 22,
      name: '学生宿舍20号楼',
      coord: '36.730724,101.744914',
      alpha:1, cast: '地质工程系&化工学院（女生）',
    }, {
      id: 23,
      name: '学生宿舍21号楼',
      coord: '36.731210,101.744916',
      cast: '藏医学院（女生）',
    }, {
      id: 24,
      name: '学生宿舍22号楼',
      coord: '36.731210,101.744916',
      cast: '研究生宿舍（男女混住）',
    },{
      id:25,
      name: '图书馆',
      coord: '36.727574,101.746787'
    }, {
      id:26,
      name: '行政楼A区',
      coord: '36.727414,101.753602'
    }, {
      id:27,
      name: '行政楼B区',
      coord: '36.727153,101.753081'
    }, {
      id:128,
      name: '行政楼C区',
      coord: '36.728195,101.753315'
    }, {
      id:29,
      name: '洗浴中心（长悦商务中心）',
      coord: '36.733122,101.749613'
    }, {
      id:30,
      name: '创新大厦',
      coord: '36.729131,101.753035'
    }, {
      id:31,
      name: '国家重点实验室',
      coord: '36.725715,101.745215'
    }, {
      id:32,
      name: '科技馆',
      coord: '36.726286,101.750566'
    }, {
      id:33,
      name: '农林科学院',
      coord: '36.724378,101.752364'
    }, {
      id:34,
      name: '丁香园住宅小区',
      coord: '36.730822,101.754248'
    }, {
      id:35,
      name: '专家公寓',
      coord: '36.726799,101.754142'
    },{
      id:36,
      name: '综合楼 (星华楼)',
      desc:'土木工程学院办公室,马克思主义学院',
      coord: '36.729108,101.751981',
    }, {
      id:37,
      name: '农牧楼 (静远楼)',
      desc:'农牧学院办公室',
      coord: '36.724095,101.750382',
    }, {
      id:38,
      name: '财经学院楼 (尚真楼)',
      desc:'财经学院办公室（南侧）',
      coord: '36.726313,101.748816',
    }, {
      id:39,
      name: '理工楼 (缕金楼)',
      desc:'工科类实验室与测绘类仪器发放处',
      coord: '36.726434,101.752260',
      latitude:36.726434,longitude:101.752260,
      width: 30, height: 30,
    }, {
      id:40,
      name: '医学院基础医学教学楼',
      desc:'主要教学楼',
      coord: '36.724073,101.748231',
    }, {
      id:41,
      name: '信息化技术中心 (知远楼)',
      desc:'上机实验楼之一，校园卡事务办理处',
      coord: '36.729204,101.752198',
    }, {
      id:42,
      name: '地质系&计算机楼 (融馨楼)',
      desc:'大学物理/地质类实验室 含机房',
      coord: '36.725341,101.749465',
    }, {
      id:43,
      name: '藏医学院',
      desc:'藏医学院',
      coord: '36.733277,101.750967',
    }, {
      id:44,
      name: '农牧实验楼 (尚原楼)',
      desc:'生态环境学院/农牧实验场所',
      coord: '36.725565,101.752265',
    }, {
      id:45,
      name: '机械工程学院 (智行楼)',
      desc:'金工实习场所',
      coord: '36.723676,101.745727',
    }, {
      id:46,
      name: '化工实验楼 (雨化楼)',
      desc:'化工实验室所在',
      coord: '36.728267,101.752219',
    },{
      id:47,
      name:'测试地点',
      coord:'26.43500,110.85900',
    }]
  },
  gotodetail(res){
    console.log(res)
  },
  onUnload() {
    var res = getCurrentPages()
    console.log(res)
    var xxx = res[res.length-1]
    xxx.setData({
      aimLocation:"",
      markers:[]
    })
    console.log("缓存数据已清除")
  },
  saveP2:function (polyline2) {
    wx.setStorage({
      data: polyline2,
      key: 'p2Key',
    })
  },
  saveP1:function (polyline1) {
    wx.setStorage({
      data: polyline1,
      key: 'p1Key',
    })
  },
  savedisw:function(disw){
    wx.setStorage({
      data: disw,
      key: 'diswKey',
    })
  },
  savedisd:function(disd){
    wx.setStorage({
      data: disd,
      key: 'disdKey',
    })
  },
  savestepsd:function(steps){
    wx.setStorage({
      data: steps,
      key: 'stepsKey',
    })
  },
  binddetail:function () {
    wx.showModal({
      title:"T_T",
      content: '该功能暂未开放',
    })
  },
  bindaround:function () {
    wx.showModal({
      title:"T_T",
      content: '该功能暂未开放',
    })
  },
  onShareAppMessage:function (options) {
    return{
      path:"/pages/map/map"
    }
  },
  saveGoTOname:function(GoToname){
    wx.setStorage({
      data: GoToname,
      key: 'GoTonameKey',
    })
  }
})