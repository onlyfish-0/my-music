<template>
  <div class="play">
    <audio
      :loop="loop"
      ref="audio"
      style="width: 100%; height: 40px"
      autoplay
      :src="'https://music.163.com/song/media/outer/url?id=' + songname.id"
    ></audio>
    <!-- 播放控件 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="play-bar" v-show="showBar" @click="toggleShow">
        <img :src="songname.picUrl" alt="" :class="{ paused: pause }" />
        <div class="songmsg">
          <h3>{{ songname.name }}</h3>
          <i>-</i>
          <span v-for="(arties, index) in songname.song.artists" :key="index">
            <template v-if="index"> / </template>{{ arties.name }}
          </span>
        </div>
        <div class="icon" @click.stop="togglePlay">
          <canvas width="50" height="50" ref="canvas"></canvas>
          <span :class="{ pauseimg: pause }"></span>
        </div>
        <!-- <div class="play-btn"></div> -->
        <div class="play-list"></div>
      </div>
    </transition>

    <!-- 全屏控件 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="play-full" v-show="!showBar" @click="isshowList = false">
        <div class="mask" :style="{backgroundImage: `url('${songname.picUrl}')`}"></div>
        <PlayFullHead :songname="songname" @toggleShowBar="showBar = $event"/>
        <PlayFullMain :songname="songname" :pause="pause" :lyricArr="lyricArr" :currentTime="currentTime"/>
        <PlayFullFooter @loop="loop = $event" @show-list="isshowList = !isshowList" :showlist="isshowList" @change-song="$emit('change-song',$event)" :songname="songname" @play-this="$emit('play-this',$event)" :durationTime="durationTime" :currentTime="currentTime" @changepg="changePg" :pause="pause" @togglePlay="togglePlay"/>
      </div>
    </transition>
  </div>
</template>

<script>
import PlayFullHead from '@/components/PlayFullHead.vue'
import PlayFullMain from '@/components/PlayFullMain.vue'
import PlayFullFooter from '@/components/PlayFullFooter.vue'
export default {
  name: "Play",
  components: {
    PlayFullHead,
    PlayFullMain,
    PlayFullFooter
  },
  data: function () {
    return {
      pause: false,
      durationTime: null,
      currentTime: null,
      showBar: true,
      isshowList: false,
      loop: false
    };
  },
  props: ["songname","lyricArr"],
  methods: {
    // 圆的进度条
    drawCircle: function (dTime, cTime) {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 50, 50);
      ctx.strokeStyle = "#ddd";
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.arc(25, 25, 14, Math.PI * -0.5, Math.PI * 1.5);
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = "orange";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        25,
        25,
        15,
        Math.PI * -0.5,
        Math.PI * ((cTime / dTime) * 2 - 0.5)
      );
      ctx.stroke();
    },
    // 点击暂停或播放
    togglePlay: function () {
      if (this.pause) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    // 点击播放控件
    toggleShow: function () {
      this.showBar = false;
    },
    // 拖放进度条
    changePg: function (currenttime) {
      this.$refs.audio.currentTime = currenttime;
      // 避免滑动到结尾后，再次滑动不能播放的问题
      this.$refs.audio.play();
    }
  },
  // 挂载完毕
  mounted() {
    let audio = this.$refs.audio;
    // 暂停
    audio.addEventListener("pause", () => {
      this.pause = true;
    });

    // 播放
    audio.addEventListener("play", () => {
      this.pause = false;
    });

    // 总时长
    audio.addEventListener("durationchange", () => {
      this.durationTime = audio.duration;
    });

    // 当前时长
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      this.drawCircle(this.durationTime, this.currentTime);
      // console.log(this.currentTime)
    });
  },
  watch: {
    pause: function (n) {
      this.$emit("pause", n);
    },
    showBar: function () {
      this.$emit("showNav",this.showBar);
    }
  },
};
</script>

<style lang="less" scoped>
.play {
  width: 100%;
  .play-bar {
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    z-index: 5;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    img {
      transform: translateY(-3px);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
      animation: playing 8s linear infinite;
      &.paused {
        animation-play-state: paused;
      }
    }
    .songmsg {
      line-height: 45px;
      flex: 1;
      h3 {
        font-size: 14px;
        display: inline-block;
        margin: 0 3px 0px 5px;
      }
      i,
      span {
        font-size: 12px;
        color: #888;
      }
      i {
        font-size: 16px;
        margin-right: 3px;
      }
    }
    .icon {
      position: relative;
      width: 50px;
      height: 50px;
      span {
        position: absolute;
        left: 15px;
        top: 15px;
        display: block;
        width: 20px;
        height: 20px;
        background: url(../assets/播放1.png) no-repeat;
      }
      span.pauseimg {
        left: 17px;
        background: url(../assets/暂停1.png) no-repeat;
      }
    }
    .play-btn {
      width: 50px;
      height: 50px;
      background: url(../assets/播放列表.png) no-repeat;
      background-position: center;
    }
  }
  .play-full {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(rgba(53, 49, 49, 0.9), rgb(94, 91, 91),rgb(51, 33, 33));
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background: center;
      background-size: cover;
      // 背景模糊度   亮度为原来的0.5,变暗
      filter: blur(25px) brightness(0.5);
    }
  }
}
// 图片旋转动画
@keyframes playing {
  0% {
    transform: translateY(-3px) rotate(0deg);
  }
  100% {
    transform: translateY(-3px) rotate(360deg);
  }
}
</style>