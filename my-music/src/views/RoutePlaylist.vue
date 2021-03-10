<template>
  <div class="rout-playlist" v-if="rplists">
    <div v-show="showAll">
      <SongListTop
        @back="back"
        :msg="{
          playCount: rplists.playCount,
          coverImgUrl: rplists.coverImgUrl,
          name: rplists.name,
          avatarUrl: rplists.creator.avatarUrl,
          nickname: rplists.creator.nickname,
        }"
      />
      <ShowTip v-show="!isShow">歌单列表</ShowTip>
      <div class="search-mask" v-show="isShow"></div>
      <ul class="music-lists">
        <NewMusicList
          v-for="(song, index) in songs"
          :key="song.id"
          :index="index"
          :newlist="{
            ...song.al,
            id: song.id,
            song: {
              artists: song.ar.map((e) => {
                return { name: e.name };
              }),
            },
          }"
          :playsongname="playsongname"
          :pause="pause"
          @play-song="playsong"
          :red="false"
          >{{ (index += 1) }}</NewMusicList
        >
      </ul>
      <ShowTip v-show="!isShow && hl != 0">精彩评论</ShowTip>
      <ul class="wonder-comment" v-if="!isShow && hl != 0">
        <Comment
          v-for="(item, index) in hotcomment"
          :key="index"
          :comment="item"
        />
      </ul>
      <ShowTip v-show="!isShow">最新评论</ShowTip>
      <ul class="comment-hot" v-show="!isShow">
        <Comment
          v-for="(item, index) in comment"
          :key="index"
          :comment="item"
        />
      </ul>
      <div ref="muchdiv" class="much" @click="muchclick" v-show="!isShow">查看全部{{ cl }}条评论 ></div>
    </div>

    <div class="all" v-show="!showAll">
      <div class="back" @click="showAll = true"></div>
      <ShowTip>全部评论({{cl}}条)</ShowTip>
      <ul ref="allul" class="all-comment">
        <Comment
          v-for="(item, index) in allcomment"
          :key="index"
          :comment="item"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import SongListTop from "@/components/SongListTop.vue";
import ShowTip from "@/components/ShowTip.vue";
import NewMusicList from "@/components/NewMusicList.vue";
import Comment from "@/components/Comment.vue";
export default {
  name: "RoutePlaylist",
  components: {
    SongListTop,
    ShowTip,
    NewMusicList,
    Comment,
  },
  props: ["playsongname", "pause"],
  data: function () {
    return {
      rplists: null,
      songs: null,
      change: false,
      isShow: false,
      comment: null,
      allcomment: null,
      cl: 0,
      hl: 0,
      hotcomment: null,
      showAll: true,
    };
  },
  //   进入歌单列表之前拿数据
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next((vm) => {
      vm.$root.isShowloading = true;
      window.axios
        .get("/playlist/detail?id=" + to.query.id)
        .then((response) => {
          vm.rplists = response.data.playlist;
          //   console.log(response.data.playlist);
          vm.$root.isShowloading = true;
          vm.isShow = true;
          vm.axios
            .get(
              "/song/detail?ids=" +
                response.data.playlist.trackIds
                  .slice(0, 15)
                  .map((e) => e.id)
                  .join()
            )
            .then((response) => {
              vm.songs = response.data.songs;
              // 评论
              vm.isShow = true;
              window.axios
                .get("comment/playlist?id=" + to.query.id)
                .then((response) => {
                  console.log(response);
                  vm.allcomment = response.data.comments;
                  vm.comment = response.data.comments.slice(0, 10);
                  vm.hotcomment = response.data.hotComments;
                  vm.cl = response.data.comments.length;
                  vm.hl = response.data.hotComments.length;
                })
                .finally(() => {
                  vm.isShow = false;
                });
            })
            .finally(() => {
              vm.$root.isShowloading = false;
              vm.isShow = false;
              // console.log(111)
            });
        })
        .finally(() => {
          vm.$root.isShowloading = false;
        });
    });
  },
  methods: {
    back: function () {
      this.$router.back();
      this.songs = null;
    },
    muchclick: function () {
      this.showAll = false;
      window.scrollTo(0,0);
      if(this.playsongname) {
        this.$refs.allul.style.marginBottom = 55 + "px";
      }
    },
    playsong: function (data) {
      this.$emit('play-song', data.song);
      this.$refs.muchdiv.style.marginBottom = 55 + "px";
    }
  }
};
</script>

<style lang="less">
.rout-playlist {
  width: 100%;
  position: relative;
  .search-mask {
    position: absolute;
    left: 0;
    top: 355px;
    right: 0;
    margin: auto;
    width: 80px;
    height: 80px;
    background: url(../assets/loading.jpg) no-repeat center center/cover;
  }
  .much {
    color: #999;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .all {
    .back {
      position: relative;
      left: 5px;
      top: 0;
      width: 25px;
      height: 25px;
      background: url(../assets/返回1.png);
    }
  }
}
</style>