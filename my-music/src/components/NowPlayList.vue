<template>
  <div class="play-list">
    <h3>当前播放<span>{{ "(" + newlists.length + ")" }}</span></h3>
    <ul>
      <li v-for="(newlist, index) in newlists" :key="index" @click="$emit('play-this',newlist)" :class="{active: newlist.name == songname.name}">
        {{ newlist.name }} <span>-&nbsp;</span>
        <span
            class="song-autor"
            v-for="(arties, index) in newlist.song.artists"
            :key="index"
          >
            <template v-if="index"> / </template>{{ arties.name }}
          </span>
      </li>
    </ul>
  </div>  
</template>

<script>
export default {
    name: "NowPlayList",
    data: function () {
      return {

      }
    },
    props: ['newlists','songname'],
};
</script>

<style lang="less">
.play-list {
    width: 65vw;
    position: fixed;
    // left: 0;
    bottom: 100px;
    right: 0;
    z-index: 13;
    // margin: auto;
    background-color: #fff;
    border-radius: 15px;
    padding: 0 15px;
    box-sizing: border-box;
    h3 {
        margin: 10px 0;
        font-weight: 700;
        span {
            font-weight: 400;
            font-size: 12px;
            color: #999;
        }
    }
    ul {
      padding-bottom: 10px;
      box-sizing: border-box;
        li {
            font-size: 14px;
            line-height: 30px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            &.active {
              color: red; 
              span {
                color: red; 
              }
            }
            span {
              font-size: 12px;
              color: #999;
            }
        }
    }
}
</style>