<template>
  <div class="play-fullfooter">
    <div class="top-icon">
      <div class="left" :class="{paused: pause}"></div>
      <div class="right"></div>
    </div>
    <!-- 进度条 -->
    <div class="progree">
      <span>{{delcTime}}</span>
      <div class="my-progress">
        <input type="range" min="0" max="100" step="1" :value="(currentTime/durationTime)*100" @input="$emit('changepg',($event.target.value/100*durationTime))">
        <div class="plan" :style="{width: (currentTime/durationTime)*100 + '%'}"></div>
      </div>
      <span>{{deldTime}}</span>
    </div>

    <!-- 控制上下曲 -->
    <div class="btn-play">
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div class="model-tips" v-if="tipshow">{{modeTips}}</div>
      </transition>
      <div class="icon1" @click="modelIndex >= 3 ? modelIndex = 0 : modelIndex++" :class="{ic1: modelIndex == 0,ic2: modelIndex == 1,ic3: modelIndex == 2,ic4: modelIndex == 3}"></div>
      <div class="icon2" @click="prevSong"></div>
      <div class="icon3" @click="$emit('togglePlay')" :class="{playicon: pause}"></div>
      <div class="icon4" @click="nextSong"></div>
      <div class="icon5" @click.stop="$emit('show-list')"></div>
    </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
    <div class="list" v-show="showlist">
      <NowPlayList :songname="songname" :newlists="newlists" @play-this="$emit('play-this',$event);$emit('show-list')"/>  
    </div>
    </transition>
    
  </div>
</template>

<script>
import NowPlayList from '@/components/NowPlayList.vue'
export default {
    name: 'PlayFullFooter',
    data: function () {
      return {
        newlists: [],
        changeSong: null,
        pattern: 'sequence',
        modelIndex: 0,
        modeTips: '顺序播放',
        tipshow: false
      }
    },
    components: {
      NowPlayList
    },
    props: ['durationTime','currentTime','pause','songname','showlist'],
    computed: {
      delcTime: function () {
        return this.delTime(this.currentTime);
      },
      deldTime: function () {
        return this.delTime(this.durationTime);
      }
    },
    methods: {
      delTime: function (time) {
        if(time / 60 < 60) {
          let m = Math.floor(time /60 );
          let s = parseInt((time % 60));
          if(m < 10 && s < 10) {
            return ("0"+m+":"+"0"+s);
          }
          else if(m < 10){
            return ("0"+m+":"+s);
          }
          else if(s < 10){
            return (m+":"+"0"+s);
          }
          else {
            return (m+":"+s);
          }
        }
        // else {
        //   let h = Math.floor(time /3600 );
        //   let m = Math.floor((time %3600) /60 );
        //   let s = (time % 60).toFixed(0);
        //   if(h< 10 && m < 10 && s < 10) {
        //     return ("0"+h+":"+"0"+m+":"+"0"+s);
        //   }
        //   else if(h < 10 && m < 10){
        //     return ("0"+h+":"+"0"+m+":"+s);
        //   }
        //   else if(h < 10 && s < 10){
        //     return ("0"+h+":"+m+":"+"0"+s);
        //   }
        //   else if(m < 10 && s < 10){
        //     return (h+":"+"0"+m+":"+"0"+s);
        //   }
        //   else {
        //     return (m+":"+"0"+s);
        //   }
        // }
      },
      // 随机播放方法
      randomPlay: function () {
        let len = this.newlists.length - 1;
          let ran = Math.floor(Math.random()*(len-0+1));
          // console.log(ran)
          this.newlists.forEach((e,index,arr) => {
            if(arr.length == 1) {
              this.changeSong = arr[0];
            }
            else if(this.songname.name == e.name) {
              while(ran == index) {
                ran = Math.floor(Math.random()*(len-0)+1);
              }
              // console.log(ran)
              this.changeSong = arr[ran];
            }
          })
      },
      // 顺序上一曲
      prevSong: function () {
        if(this.pattern == 'circulation' || this.pattern == 'sequence') {
          this.newlists.forEach((e,index,arr) => {
            if(e.name == this.songname.name) {
              if(index - 1 < 0) {
                this.changeSong = arr[arr.length -1];
              }
              else {
                this.changeSong = arr[index -1];
              }
            }
          })
        }
        // 随机播放
        else if(this.pattern == 'random') {
          this.randomPlay();
        }
        this.$emit('change-song',this.changeSong);
      },
      // 下一曲
      nextSong: function () {
        // 列表循环
        if(this.pattern == 'circulation') {
          this.newlists.forEach((e,index,arr) => {
            if(e.name == this.songname.name) {
              if(index + 1 == arr.length) {
                this.changeSong = arr[0];
              }
              else {
                this.changeSong = arr[index + 1];
              }
            }
          })
        }
        // 随机播放
        else if(this.pattern == 'random') {
          this.randomPlay();
        }
        // 顺序播放
        else if(this.pattern == 'sequence') {
          this.newlists.forEach((e,index,arr) => {
            if(e.name == this.songname.name) {
              if(index + 1 == arr.length) {
                this.changeSong = arr[index];
                if(this.currentTime == this.durationTime) {
                  this.$emit('togglePlay');
                }
              }
              else {
                this.changeSong = arr[index + 1];
              }
            }
          })
        }
        this.$emit('change-song',this.changeSong);
      },
      tipShow: function () {
        this.tipshow = true;
        setTimeout(()=> {
          this.tipshow = false;
        },2000)
      }
    },
    created() {
      this.newlists.push(this.songname);
    },
    watch: {
      // 监听计算属性值,当前播放的音乐,添加到播放列表
      songname: function (n) {
        // console.log(n)
        if((this.newlists.map(e => e.name)).indexOf(this.songname.name) == -1 ) {
          this.newlists.unshift(n);
        }
      },
      // 播放结束,自动下一曲
      currentTime: function (n) {
        // console.log(n)
        if(n == this.durationTime) {
          this.nextSong();
        }
      },
      modelIndex: function (n) {
        this.$emit('loop',false);
        this.tipShow();
        if(n == 0) {
          this.pattern = 'sequence';
          this.modeTips = '顺序播放';
        }
        else if(n == 1) {
          this.pattern = 'random';
          this.modeTips = '随机播放';
        }
        else if(n == 2) {
          this.pattern = 'circulation';
          this.modeTips = '列表循环';
        }
        else if(n == 3) {
          this.$emit('loop',true);
          this.modeTips = '单曲循环';
        }
      }
    }
}
</script>

<style scoped lang="less">
.play-fullfooter {
  position: relative;
  margin-top: 10px;
  .top-icon {
    padding: 0 20px;
    margin-bottom : 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .left {
      width: 25px;
      height: 25px;
      background: url(../assets/音乐.png);
      animation: playing 40s linear infinite;
      &.paused {
        animation-play-state: paused;
      }
    }
    .right {
      width: 25px;
      height: 25px;
      background: url(../assets/详情.png);
    }
  }
  .progree {
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      span {
        color: #fff;
      }
      .my-progress {
        margin: 0 10px;
        flex: 1;
        position: relative;
        border-radius: 5px;
        width: 100%;
        height: 3px;
        background-color: #999;
        .plan{
          width: 0px;
          border-radius: 5px;
          height: 3px;
          position: absolute;
          left: 0;
          top: 0;
          background-color: #ddd;
          z-index: 12;
          &::after {
            content: '';
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            position: absolute;
            top: -2px;
            right: 0;
            animation: active 1s infinite;
          }
        }
        input {
          outline: none;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 3px;
          opacity: 0;
        }
      }
      span {
        font-size: 12px;
      }
    }
    .btn-play {
      margin-top: 5px;
      padding: 0 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .model-tips {
        position: absolute;
        left: 0;
        top: -5px;
        right: 0;
        margin: 0 auto;
        width: 22%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
        background-color: rgba(255,255,255,.8);
        border-radius: 25px;
      }
      *[class^=icon] {
        flex: 1;
        width: 25px;
        height: 25px;
        background-position: center;
        background-repeat: no-repeat;
      }
      .icon1 {
        &.ic1 {
          background-image: url(../assets/0.png);
        }
        &.ic2 {
          background-image: url(../assets/1.png);
        }
        &.ic3 {
          background-image: url(../assets/2.png);
        }
        &.ic4 {
          background-image: url(../assets/3.png);
        }
      }
      .icon2 {
        background-image: url(../assets/上一曲.png);
      }
      .icon3 {
        width: 48px;
        height: 48px;
        background-image: url(../assets/暂停2.png);
        &.playicon {
          background-image: url(../assets/播放2.png);
        }
      }
      .icon4 {
        background-image: url(../assets/下一曲.png);
      }
      .icon5 {
        background-image: url(../assets/播放列表1.png);
      }
    }
    @keyframes active {
      0% {
        transform: scale(1);
        background-color: #ddd;
      }
      100% {
        transform: scale(1.1);
        background-color: #fff;
      }
      // 100% {
      //   transform: scale(1.2);
      //   background-color: yellow;
      // }
    }
    @keyframes playing {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(3600deg);
      }
    }
}
</style>