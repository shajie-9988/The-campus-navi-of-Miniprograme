// components/tab-control.js
Component({
  properties: {
  },

  data: {

  },
  methods: {
    handleTapOne:function(){
      wx.navigateTo({
        url: '/pages/thbuilding/thbuilding',
      })
    },
    handleTapTwo:function(){
      wx.navigateTo({
        url: '/pages/canteen/canteen',
      })
    },
    handleTapThree:function(){
      wx.navigateTo({
        url: '/pages/dorbuilding/dorbuilding',
      })
    },handleTapFour:function(){
      wx.navigateTo({
        url: '/pages/others/others',
      })
    }
  },
  
})
