<template>
  <div id="app">
    <div class="loading" v-show="$parent.isShowloading">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50" xml:space="preserve">
    <rect x="0" y="9.22656" width="4" height="12.5469" fill="#FF6700">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="10" y="5.22656" width="4" height="20.5469" fill="#FF6700">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
    <rect x="20" y="8.77344" width="4" height="13.4531" fill="#FF6700">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
    </rect>
</svg>
<div class="mask"></div>
    </div>
    <Play
      @change-song="playSongName = $event"
      :songname="playSongName"
      :lyricArr="lyricArr"
      v-if="playSongName"
      @pause="pause = $event"
      @showNav="showbar = $event"
      @play-this="playSongName = $event"
    />
    <HomeNav v-if="$route.meta.isShow" v-show="showbar" />

    <keep-alive>
    <router-view
      @play-song="playsong"
      :pause="pause"
      :playsongname="playSongName"
    />
    </keep-alive>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav.vue";
import Play from "@/components/Play.vue";
export default {
  name: "App",
  data: function () {
    return {
      playSongName: null,
      pause: null,
      showbar: true,
      lyricArr: [],
    };
  },
  components: {
    HomeNav,
    Play,
  },
  methods: {
    playsong: function (songname) {
      this.playSongName = songname;
    },
    // 处理歌词
    disposeLyric: function (lyric) {
      if (lyric) {
        var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
        var arr = lyric
          .split("\n")
          .filter((e) => e)
          .map((str) => {
            var timeStr = str.match(patt)[0].replace(/(\[|\])/gi, "");
            var timeArr = timeStr.split(":");
            var time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
            var text = str.replace(patt, "");
            return { time, text };
          });
        return arr;
      }
    },
  },
  // 获取歌词,监听歌曲的改变发送请求
  watch: {
    playSongName: function (n) {
      let id = n.id;
      this.axios
        .get("lyric", {
          params: {
            id: id,
          },
        })
        .then((responed) => {
          // console.log(responed.data.lrc)
          // 如果没有歌词,是纯音乐,则设置内容显示
          if(responed.data.lrc == undefined) {
            this.lyricArr = [{time: 0,text: '纯音乐,请欣赏'}];
          }
          else {
            this.lyricArr = this.disposeLyric(responed.data.lrc.lyric);
          }
        });
    },
  },
};
</script>
<style scoped> 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
:root {
  --animation-duration: 0.3s;
}
.loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}
.loading .mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.7);
}
.loading svg {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -12px;
  margin-top: -15px;
}
</style>
