<template>
  <div class="hot">
    <div class="top">
      <div class="ymusic"></div>
      <div class="hotmusic"></div>
      <div class="date">更新日期：{{new Date().getMonth()+1}}月{{new Date().getDate()}}日</div>
    </div>
    <!-- newlist组件复用,传递的值要做处理,符合接收的要求 -->
    <ul class="bottom" ref="ulb">
      <NewMusicList
        v-for="(song, index) in songs"
        :key="song.id"
        :index="index"
        :newlist="{...song.al,id:song.id,song:{artists: song.ar.map(e=> {return {name:e.name}})}}"
        :playsongname="playsongname"
        :pause="pause"
        :red="true"
        @play-song="playsong"
        >{{index >= 9 ? index+1  : '0' + (index+1) }}</NewMusicList
      >
    </ul>
  </div>
</template>s

<script>
import NewMusicList from "@/components/NewMusicList.vue";
export default {
  name: "Hot",
  data: function () {
    return {
      songs: [],
    };
  },
  props: ["playsongname","pause"],
  components: {
    NewMusicList,
  },
  created() {
    this.$root.isShowloading = true;
    this.axios
      .get("/top/list?idx=1")
      .then((response) => {
        // console.log(
        //   response.data.playlist.trackIds
        //     .slice(0, 20)
        //     .map((e) => e.id)
        //     .join()
        // );
        this.$root.isShowloading = true;
        this.axios
          .get(
            "/song/detail?ids=" +
              response.data.playlist.trackIds
                .slice(0, 20)
                .map((e) => e.id)
                .join()
          )
          .then((response) => {
            this.songs = response.data.songs;
            console.log(response.data.songs);
          })
          .finally(() => {
            this.$root.isShowloading = false;
          });
      })
      .finally(() => {
        console.log("axios")
        this.$root.isShowloading = false;
      });
      
  },
  methods: {
    playsong: function (data) {
      this.$emit('play-song',data.song);
      this.$refs.ulb.style.marginBottom = 55 + "px";
    }
  }
};
</script>

<style lang="less">
.hot {
  width: 100%;
  margin-top: 40px;
  .top {
    position: relative;
    width: 100%;
    padding: 25px 20px;
    box-sizing: border-box;
    background: url(../assets/热歌榜.jpg) no-repeat center center/ cover;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.15);
    }
    .ymusic {
      background: url(../assets/icon.png) no-repeat -26px -30px;
      width: 49px;
      height: 14px;
      background-size: 167px 97px;
    }
    .hotmusic {
      background: url(../assets/icon.png) no-repeat -24px -46px;
      width: 142px;
      height: 50px;
      background-size: 167px 97px;
    }
    .date {
      margin: 10px 0;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>