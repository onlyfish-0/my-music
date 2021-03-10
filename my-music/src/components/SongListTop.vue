<template>
  <div class="song-list-top">
    <div class="back" @click="$emit('back')"></div>
    <div
      class="mask"
      :style="{ backgroundImage: `url(${msg.coverImgUrl})` }"
    ></div>
    <div class="left" :style="{ backgroundImage: `url(${msg.coverImgUrl})` }">
      <div class="play-count">
        <span>{{ msg.playCount | playCount }}</span>
      </div>
    </div>
    <div class="right">
      <h3>{{ msg.name }}</h3>
      <div class="autor">
        <img :src="msg.avatarUrl" />
        <span>{{ msg.nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongListTop",
  props: ["msg"],
  filters: {
    playCount: function (value) {
      if (value / 100000000 >= 1) {
        return (value / 100000000).toFixed(1) + "亿";
      } else if (value / 10000 >= 10) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    },
  },
};
</script>

<style scoped lang="less">
.song-list-top {
  display: flex;
  position: relative;
  width: 100%;
  height: 186px;
  padding: 30px 0 25px 15px;
  box-sizing: border-box;
  background-position: center;
  .back {
    position: absolute;
    left: 5px;
    top: 0;
    width: 25px;
    height: 25px;
    background: url(../assets/返回.png);
  }
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
  .left {
    position: relative;
    width: 126px;
    height: 126px;
    background-size: cover;
    .play-count {
      background-color: rgba(0, 0, 0, 0.2);
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      span {
        padding: 0 2px;
        box-sizing: border-box;
        display: block;
        width: 100%;
        text-align: right;
        font-size: 14px;
        color: #fff;
        &::before {
          content: "";
          display: inline-block;
          width: 1.1em;
          height: 0.75em;
          background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+)
            no-repeat;
        }
      }
    }
    &::before {
      position: absolute;
      left: 0;
      top: 10px;
      z-index: 5;
      content: "歌单";
      color: #fff;
      font-size: 12px;
      text-align: center;
      display: block;
      width: 40px;
      height: 17px;
      background-color: rgba(255, 0, 0, 0.8);
      border-radius: 0 25px 25px 0;
    }
  }
  .right {
    margin: 0 15px;
    flex: 1;
    h3 {
      color: #fff;
      font-weight: 300;
    }
    .autor {
      width: 100%;
      margin-top: 20px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        color: #fff;
        font-size: 12px;
        font-weight: 350;
        margin-left: 5px;
      }
    }
  }
}
</style>