Page({
  data: {
      inputShowed: false,
      inputVal: "",
      inputvalue:""
  },
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputvalue:"",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputvalue: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputvalue: e.detail.value
      });
  },
});