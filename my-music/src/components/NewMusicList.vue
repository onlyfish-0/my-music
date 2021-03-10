<template>
  <li
    class="new-musiclist"
    @click="$emit('play-song', { song: newlist, index })"
  >
    <div class="music-box">
      <div class="num" :class="{numColor: index <= 2 && red}"><slot></slot></div>
      <div class="left">
        <p class="song-name">{{ newlist.name }}</p>
        <div class="content">
          <span class="icon"></span>
          <span
            class="song-autor"
            v-for="(arties, index) in newlist.song.artists"
            :key="index"
          >
            <template v-if="index"> / </template>{{ arties.name }}
          </span>
          <span class="song-autor-name">-&nbsp;{{ newlist.name }}</span>
          <div
          class="melody"
          v-if="playsongname && playsongname.id == newlist.id"
        >
          <div>
            <i :class="{ paused: pause }"></i>
            <i :class="{ paused: pause }"></i>
            <i :class="{ paused: pause }"></i>
          </div>
        </div>
        </div>
        
      </div>
      <div
        class="right2"
        v-if="playsongname && playsongname.id == newlist.id"
      ></div>
      <div class="right1" v-else></div>
    </div>
  </li>
</template>

<script>
export default {
  name: "NewMusicList",
  props: ["newlist", "index", "pause", "playsongname","red"],
};
</script>

<style scoped lang="less">
.new-musiclist {
  padding: 0 10px;
  box-sizing: border-box;
  .music-box {
    height: 55px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f6f6f7;
    .num {
      margin-right: 10px;
      color: #999;
      &.numColor {
        color: red;
      }
    }
    .left {
      padding-right: 20px;
      box-sizing: border-box;
      flex: 1;
      .song-name {
        margin-bottom: 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .content {
        position: relative;
        // margin-right: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        .icon {
          margin-right: 5px;
          display: inline-block;
          vertical-align: middle;
          background: url(../assets/icon.png) no-repeat 0 0;
          background-size: 166px 97px;
          width: 12px;
          height: 8px;
        }
        *[class^="song-autor"] {
          font-size: 12px;
          color: #888;
        }
        .song-autor-name {
          margin-right: 10px;
          color: #888;
        }
        .melody {
        position: absolute;
        width: 15px;
        display: inline-block;
        right: 0px;
        top: -2px;
        div {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          i {
            display: block;
            width: 3px;
            height: 1em;
            background-color: #333;
            border-radius: 1.5px 1.5px 0 0;
            transform-origin: center bottom;
            animation: playing 0.6s linear -0.2s infinite alternate-reverse;
            &:nth-of-type(1) {
              animation-delay: 0s;
            }
            &:nth-of-type(3) {
              animation-delay: -0.4s;
            }
            &.paused {
              animation-play-state: paused;
            }
          }
        }
      }
      }
        
    }

    *[class^="right"] {
      width: 25px;
      height: 25px;
    }
    .right1 {
      background: url(../assets/暂停.png) no-repeat;
    }
    .right2 {
      background: url(../assets/播放.png) no-repeat;
    }
  }
  @keyframes playing {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0.2);
    }
  }
}
</style>