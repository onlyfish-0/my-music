<template>
  <div class="play-fullhead">
    <div class="icon-arrow" @click="$emit('toggleShowBar', true)"></div>
    <div class="content">
      <h3>{{ songname.name }}</h3>
      <p>
        <span v-for="(arties, index) in songname.song.artists" :key="index">
          <template v-if="index"> / </template>{{ arties.name }}
        </span>
      </p>
    </div>
    <div class="share"></div>
  </div>
</template>

<script>
export default {
  name: "PlayFullHead",
  props: ["songname"],
};
</script>

<style scoped lang="less">
.play-fullhead {
  padding: 0 10px;
  width: 100%;
  height: 50px;
  display: flex;
  .icon-arrow {
    margin-top: 3px;
    width: 30px;
    height: 30px;
    background: url(../assets/下箭头.png) no-repeat;
  }
  .content {
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 2px;
    text-align: center;
    flex: 1;
    h3 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      color: #ddd;
    }
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 12px;
      color: #888;
    }
  }
  .share {
    margin-top: 10px;
    width: 25px;
    height: 25px;
    background: url(../assets/分享.png) no-repeat;
  }
}
</style>