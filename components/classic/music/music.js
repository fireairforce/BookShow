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
    console.log(this.properties);
    console.log('触发');
    console.log(mMgr.src);
       //  这里调用methods里面的方法不用使用this.methods
       this._recoverStatus(); 
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
     }

  }
})
