
var content='',contentKey='';
var QQMapWX = require('../../components/tx-SDK/qqmap-wx-jssdk');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'G6HBZ-E47RJ-GYIFX-KL6BD-ZMP6H-XYBML' 
});
var searchLat=0,searchLng=0;
var searchLatKey=[],searchLngKey=[];
var searchaddrKey=[];
Page({
    //数据回填方法
    backfill: function (e) {
        var id = e.currentTarget.id;
        for (var i = 0; i < this.data.suggestion.length;i++){
            if(i == id){
                var searchLat = this.data.suggestion[i].latitude
                var searchLng = this.data.suggestion[i].longitude
                var searchLoc = searchLat+","+searchLng
                var searchLocName = this.data.suggestion[i].title
                var searchaddr = this.data.suggestion[i].addr
                this.setData({
                    backfill: this.data.suggestion[i].title
                })
                console.log(searchaddr)
                this.storagelngAndlat(searchLoc,searchLocName)
                wx.navigateTo({
                    url: '/pages/route/route?statue=2&searchaddr='+this.data.suggestion[i].addr,
                })
            } 
        }
    },
 
    //触发关键词输入提示事件
    getsuggest: function(e) {
        this.setData({
            viewShowed:false
        });
        var _this = this;
        //调用关键词提示接口
        qqmapsdk.getSuggestion({
            //获取输入框值并设置keyword参数
            keyword: e.detail.value, //用户输入的关键词
            region:'青海省西宁市',
            region_fix:"1", 
            success: function(res) {//搜索成功后的回调
                var sug = [];
                for (var i = 0; i < res.data.length; i++) {
                    sug.push({ // 获取返回结果，放到sug数组中
                        title: res.data[i].title,
                        id: res.data[i].id,
                        addr: res.data[i].address,
                        city: res.data[i].city,
                        district: res.data[i].district,
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng
                    });
                }
                _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
                    suggestion: sug
                });
            },
            fail: function(error) {
                console.error(error);
            },
            complete: function(res) {
                console.log(res);
            }
        })
    },
    data: {
        name:"",
        searchLat:0,
        searchLng:0,
        coord:"",
        inputvalue:"",
        cancel:"display:none",
        value:"",
        viewShowed:true,
        inputShowed: false,
        backfill: ""
    },
    storageInfo:function(content){
        wx.setStorage({
            data: content,
            key: 'contentKey'
        })
    },
    showInput: function () {
        console.log("获得聚焦")
        this.setData({
            inputShowed: true
        });
    },
    hideInput:function(){
        console.log("失去聚焦")
        this.setData({
            inputShowed:false
        })
    },
    backLastPage:function () {
        console.log("---")
        wx.navigateBack({
          complete: (res) => {
          },
        })
    },
    clearInput: function () {
        this.setData({
            backfill: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            backfill: e.detail.value
        });
    },
    inputOver(e){
    },
    viewShowed:function () {
        this.setData({

        })
    },
    storagelngAndlat:function(searchLoc,searchLocName){
        wx.setStorage({
          data: searchLoc,
          key: 'searchLocKey',
        })
        wx.setStorage({
          data: searchLocName,
          key: 'searchLocNameKey',
        })
    },
    storagelngAndlatInfo:function(searchLocInfo,searchLocNameInfo){
        wx.setStorage({
          data: searchLocInfo,
          key: 'searchLocInfoKey',
        })
        wx.setStorage({
          data: searchLocNameInfo,
          key: 'searchLocNameInfoKey',
        })
    },
    formSubmit(e) {
        //调用地址解析接口
        console.log(e)  
        qqmapsdk.geocoder({
          //获取表单传入地址
          address:"青海省西宁市城北区"+e.detail.value,//地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
          success: res=> {//成功后的回调
            console.log(res);
            var res = res.result;
            var searchLocInfo = res.location.lat+','+res.location.lng;
            var searchLocNameInfo = res.title
            console.log(searchLocInfo,searchLocNameInfo)
            this.storagelngAndlatInfo(searchLocInfo,searchLocNameInfo)
            wx.navigateTo({
                url: '/pages/route/route?statue=1&searchInfoaddr='+res.address_components.province+res.address_components.district+res.address_components.city+e.detail.value,
            })
          },
          fail: function(error) {
            console.error(error);
          },
          complete: function(res) {
            console.log(res);
          }
          
        })
        
        var record = []
        record.push({
            name:e.detail.value
        })
        this.setData({
            recordsave:record
        })
    },
    
    onShareAppMessage:function (options) {
    }
})