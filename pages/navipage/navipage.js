var p1=[],p1Key="";
var p2=[],p2Key="";
var xlatitude=0,xlongitude=0;
var points=[]
var poly=[]
var diswKey='',disdKey=''
var time='',distants=''
var stepsKey=''
Page({
  data:{
    condition:true,
    conditionView:false,
    poly:[],
    switchkey:true,
    currentIndex:0,
    goandto:[{
      id:0,
      img:"../../img/walking.png"
    },{
      id:1,
      img:"../../img/bz-driving--o.png"
    }]
  },
  onLoad:function(){
    console.log("已进行渲染")
    wx.getSystemInfo({
      success:res=>{
        var bt =  res.windowHeight - "220"
        console.log(bt)
        this.setData({
          bottomheight:bt
        })
      }
    })
    var that = this
    wx.showModal({
      title:"欢迎使用kirito小程序",
      content:"即将为您生成路线",
      success(res){
        if(res.confirm){
          that.loadroute()
        }else if(res.cancel){
          wx.navigateBack({
            delta:1
          })
        }
      }
    })

  },
  loadroute: function () {
    wx.getStorage({
      key:'diswKey',
      success:res=>{
        var disw = res.data
        var fen =disw/80 - disw % 80 / 80
        console.log(fen,"分钟")
        var xiaoshi = (fen - fen % 60) / 60
        var xiaoshifen = fen%60
        var gongli = (disw - disw%1000)/1000 +(disw%1000-disw%100)/1000
        if (fen >= 60){
          this.setData({
            time:xiaoshi+'小时' + xiaoshifen+'分钟',
          })
        }
        if(fen < 60){
          this.setData({
            time:fen+'分钟',
          })
        }
        if(disw >=1000){
          this.setData({
            distants:gongli + '公里'
          })
        }
        if(disw <1000){
          this.setData({
            distants:disw + "米"
          })
        }
      }
    })
    wx.getStorage({
      key: 'GoTonameKey',
      success:res=>{
        var content = res.data
        this.setData({
          needto:content
        })
      }
    })
    wx.getStorage({
      key:"p2Key",//walking
      success:res=>{
        var p2 = res.data
        var i = p2[0].points.length - "1"
        console.log(i,"坐标长度")
        console.log(p2,"navipagep2")///
        this.setData({
          poly:p2,
          xlatitude:p2['0'].points['0'].latitude,
          xlongitude:p2['0'].points['0'].longitude,
          markers:[{
            iconPath:"../../img/qidian.png",
            id: 0,
            latitude: p2['0'].points['0'].latitude,
            longitude: p2['0'].points['0'].longitude,
            width: 30,
            height: 30
          },{
            iconPath:"../../img/zhongdian.png",
            id: 0,
            latitude: p2['0'].points[i].latitude,
            longitude: p2['0'].points[i].longitude,
            width: 30,
            height: 30
          }]
        })
      }
    })
  },
  goto:function(event){
    wx.showLoading({
      title:'正在加载'
    })
    var cnt = event.currentTarget.dataset.index
    this.setData({
      currentIndex:cnt
    })
    if (cnt == 0){
      wx.getStorage({
        key:'diswKey',
        success:res=>{
          var disw = res.data
          var fenw =disw/80 - disw % 80 / 80
          console.log(fenw,"分钟")
          var xiaoshiw = (fenw - fenw % 60) / 60
          var xiaoshifenw = fenw%60
          var gongliw = (disw - disw%1000)/1000 +(disw%1000-disw%100)/1000
          if (fenw >= 60){
            this.setData({
              time:'',
              time:xiaoshiw+'小时' + xiaoshifenw+'分钟',
            })
          }
          if(fenw < 60){
            this.setData({
              time:'',
              time:fenw+'分钟',
            })
          }
          if(disw >=1000){
            this.setData({
              distants:'',
              distants:gongliw + '公里'
            })
          }
          if(disw <1000){
            this.setData({
              distants:'',
              distants:disw + "米"
            })
          }
        }
      })
      wx.getStorage({
        key:"p2Key",//walking
        success:res=>{
          var p2 = res.data
          var n = p2[0].points.length - "1"
          console.log(n,"坐标长度")
          console.log(p2,"navipagep2")///
          this.setData({
            poly:p2,
            xlatitude:p2['0'].points['0'].latitude,
            xlongitude:p2['0'].points['0'].longitude,
            markers:[{
              iconPath:"../../img/qidian.png",
              id: 0,
              latitude: p2['0'].points['0'].latitude,
              longitude: p2['0'].points['0'].longitude,
              width: 30,
              height: 30
            },{
              iconPath:"../../img/zhongdian.png",
              id: 0,
              latitude: p2['0'].points[n].latitude,
              longitude: p2['0'].points[n].longitude,
              width: 30,
              height: 30
            }]
          })
        }
      })
      this.setData({
        conditionView:false
      })
      console.log("p1路线改变成功")
    }
    if (cnt == 1){
      wx.getStorage({
        key:"p1Key",//walking
        success:res=>{
          var p2 = res.data
          var m = p2[0].points.length - "1"
          console.log(m,"坐标长度")
          console.log(p2,"navipagep2")///
          this.setData({
            poly:p2,
            xlatitude:p2['0'].points['0'].latitude,
            xlongitude:p2['0'].points['0'].longitude,
            markers:[{
              iconPath:"../../img/qidian.png",
              id: 0,
              latitude: p2['0'].points['0'].latitude,
              longitude: p2['0'].points['0'].longitude,
              width: 30,
              height: 30
            },{
              iconPath:"../../img/zhongdian.png",
              id: 0,
              latitude: p2['0'].points[m].latitude,
              longitude: p2['0'].points[m].longitude,
              width: 30,
              height: 30
            }]
          })
        }
      })
      wx.getStorage({
        key: 'disdKey',
        success:res=>{
          var disd = res.data
          var fend =disd/800 - disd % 800 / 800
          console.log(fend,"分钟")
          var xiaoshid = (fend - fend % 60) / 60
          var xiaoshifend = fend % 60
          var gonglid = (disd - disd%1000)/1000 +(disd%1000-disd%100)/1000
          this.setData({
            time:'',
            distants:''
          })
          if (fend >= 60){
            this.setData({
              time:'',
              time:xiaoshid+'小时' + xiaoshifend+'分钟',
            })
          }
          if(fend < 60 ){
            this.setData({
              time:'',
              time:fend+'分钟',
            })
          }
          if(disd >=1000){
            this.setData({
              distants:"",
              distants:gonglid + '公里'
            })
          }
          if(disd <1000){
            this.setData({
              distants:"",
              distants:disd + "米"
            })
          }
        }
      })
      this.setData({
        conditionView:true
      })
    }
    wx.hideLoading()
  },
  navi:function(){
    this.setData({
      condition:false
    })
    wx.getStorage({
      key: 'stepsKey',
      success:res=>{
        var step = res.data
        console.log(step)
        this.setData({
          steps:step
        })
      }
    })
  },
  back:function(){
    this.setData({
      condition:true
    })
  },
  onUnload() {
    var res = getCurrentPages()
    console.log(res)
    var xxx = res[res.length-1]
    xxx.setData({
      p2:[],
      p1:[],
      time:'',
      distants:'',
      markers:[],
      poly:[],
      xlatitude:0,
      xlongitude:0
    })
    console.log("缓存数据已清除")
  },
})