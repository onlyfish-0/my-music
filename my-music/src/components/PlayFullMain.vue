<template>
  <div class="play-fullmain" @click="showLyric = !showLyric">
    <!-- 唱片 -->
    <div class="record" :class="{paused: pause}" v-show="!showLyric">
      <div class="mask"></div>
      <canvas ref="canvas" width="250px" height="250px"></canvas>
      <img :src="songname.picUrl" >
    </div>

    <!-- 歌词 -->
    <div class="lyric" v-show="showLyric">
      <ul ref="ul" @touchstart="touchStart" @touchmove="touchMOve" @touchend="touchEnd" style="top: 0px;">
        <!-- 通过计算属性的新下标 给对应li加类名 -->
        <li v-for="(lyric,index) in lyricArr" :key="index" :style="{animationDuration: time+0.3 + 's'}" :class="{active: lyricColor -1 == index,paused: pause,endcolor: lyricColor == -1 && lyrl-1 == index }">{{lyric.text || "-------"}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PlayFullMain',
    data: function () {
      return {
        showLyric: false,
        time: 0,
        top: 0,
        touch: false,
        sy: 0,
        y: 0,
        lyrl: 0,
        move:0,
        change: 0
      }
    },
    props: ['songname','pause','lyricArr','currentTime'],
    computed: {
      // 计算属性 查找歌词数组中满足条件的下标   每次播放时间改变,就会重新计算新的下标
      lyricColor: function () {
        return this.lyricArr.findIndex(ele => {
          return ele.time > this.currentTime;
        })
      }
    },
    methods: {
      drawCrile: function (r) {
        let canvas = this.$refs.canvas;
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 0.08;
        ctx.strokeStyle = "#ccc";
        ctx.beginPath();
        ctx.arc(125,125,r,0,Math.PI*2);
        ctx.stroke();
      },
      // 歌词移动
      lyricMove: function (n) {
        var ul = this.$refs.ul;
        ul.style.top = (n-1) * - 28 + "px";
        this.top = (n-1) * - 28 + "px"
        setTimeout(() => {
          this.lyritoColor(n);
        },50)
      },
      touchlymove: function (num) {
        var ul = this.$refs.ul;
        this.move = ul.style.top;
        this.change = num * - 28;
        var l = this.change + parseInt(this.move);
        console.log(this.change,parseInt(this.move),l)
        ul.style.top = this.change +"px";
      },
      // 歌词渐变
      lyritoColor: function (n) {
        console.log(this.lyricArr[n].time - this.lyricArr[n -1].time)
          this.time = this.lyricArr[n].time - this.lyricArr[n -1].time;
      },
      touchStart: function (e) {
        e.stopPropagation();
        this.touch = true;
        this.sy = e.touches[0].clientY;
      },
      touchMOve: function (e) {
        if(this.touch) {
          this.y = this.sy - e.touches[0].clientY;
          this.touchlymove(Math.floor(this.y/28));
        }
      },
      touchEnd: function () {
        this.touch = false;
        // this.y = 0;
      }
    },
    // 挂载完毕后画同心圆
    mounted() {
      for(let i=90;i<=125;) {
        this.drawCrile(i);
        i += 4;
      }
    },
    watch: {
      // 监听歌词的计算属性
      lyricColor: function (n) {
        console.log(n)
        // 调用歌词移动方法
        if(n != -1) {
          this.lyricMove(n);
        }
        this.lyrl = this.lyricArr.length;
        // console.log(this.lyricArr)
      }
    },

}
</script>

<style lang="less" scoped>
.play-fullmain {
  height: 72vh;
  overflow: hidden;
  .record {
    position: relative;
    margin: 0 auto;
    margin-top: 110px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: #111113;
    box-shadow: 0 0 10px rgba(0,0,0,.8);
    animation: rotate 15s linear infinite;
    .mask {
      width: 100%;
      height: 100%; 
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
      background-image: linear-gradient(45deg, rgba(0, 0,0,1), rgba(255, 255, 255, 0.1), rgba(0, 0,0,1))
    }
    img {
      position: absolute;
      left: 40px;
      top: 40px;
      width: 170px;
      height: 170px;
      z-index: 11;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(0,0,0,0.6);
    }
    &.paused {
        animation-play-state: paused;
      }
  }
  .lyric {
    position: relative;
    margin-top: 20px;
    height: 65vh;
    overflow: hidden;
    ul {
      padding: 0 10px;
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      margin-top: 200px;
      li {
        font-size: 14px;
        text-align: center;
        height: 28px;
        line-height: 28px;
        // color: #ddd;
        background: #ddd -webkit-linear-gradient(left,orange,orange) no-repeat 0 0;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-size: 0 100%;
        &.active {
          // color: orange;
          font-weight: 700;
          background-size: 100% 100%;
          animation-name: tocolor;
          -webkit-animation-timing-function: linear;
        }
        &.paused {
          animation-play-state: paused;
        }
        &.endcolor {
          background-color: orange;
          font-weight: 700;
        }
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes tocolor {
    0% {
      background-size: 0 100%;
    }
    100% {
      background-size: 100% 100%;
    }
  }
</style>