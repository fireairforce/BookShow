import { classicBeh } from '../classic-beh';

// 使用这个api来获得音频控制的api
const mMgr = wx.getBackgroundAudioManager();

Component({
  behaviors: [ classicBeh ],  
  
  properties: {
     src: String,
     title: String
  },

  data: {
    pauseSrc: './images/player@waitting.png',
    playSrc: './images/player@playing.png',
    playing: false
  },

  // 在wx-if触发的一个生命周期函数
  attached: function () {
       //  这里调用methods里面的方法不用使用this.methods
       this._recoverStatus();
        // 将总控开关和我们自己的开关进行一个同步 
       this._monitorSwitch();
  },
  // 在切换组件的时候对之前的音乐播放器来个暂停
  detached: function(event) {
    //  mMgr.stop();
  },

  methods: {
    onPlay:function() {
      mMgr.title = this.properties.title;
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        // 在设置音频播放的时候必须要设置一下title，必填
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
    },

    _recoverStatus : function () {
      // 如果当前组件没有音乐播放
      if(mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      } 
      if(mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
     },
      // 用来监听音乐播放的一些事件
     _monitorSwitch: function () {
       mMgr.onPlay(() => {
          this._recoverStatus();
       })
       mMgr.onPause(() => {
        this._recoverStatus();
       })
       mMgr.onStop(() => {
         this._recoverStatus();
       })
       mMgr.onEnded(() => {
         this._recoverStatus();
       })
     }
  }
})
