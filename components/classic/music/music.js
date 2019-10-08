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
  methods: {
    onPlay:function() {
      mMgr.title = this.properties.title;
      if(!this.data.playing){
        this.setData({
          playing: !this.data.playing
        })
        // 在设置音频播放的时候必须要设置一下title，必填
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
    }
  }
})
