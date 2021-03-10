<template>
  <li class="comment">
    <div class="left">
      <div
        class="img"
        :style="{ backgroundImage: `url(${comment.user.avatarUrl}?imageView=1&type=webp&thumbnail=91x0)` }"
      ></div>
    </div>
    <div class="right">
      <div class="top">
        <div class="name">{{ comment.user.nickname }} <span class="vip" v-show="comment.user.vipType == 11"></span></div>
        <p class="time">
          {{
            new Date(parseInt(comment.time))
              .toLocaleString()
              .replace(/:\d{1,2}$/, " ")
          }}
        </p>
        <span class="count"
          >{{ comment.likedCount }}
          <svg
            class="u-svg u-svg-unzancmt"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
          >
            <path
              fill="#999"
              d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"
            ></path></svg
        ></span>
      </div>
      <div class="bottom">
        <p class="content">{{ comment.content }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],
};
</script>

<style spoced lang="less">
.comment {
  width: 100%;
  padding: 10px 0 10px 10px;
  box-sizing: border-box;
  display: flex;
  .left {
    width: 30px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-size: cover;
    }
  }
  .right {
    border-bottom: 1px solid #f7f7f7;
    margin-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    flex: 1;
    .top {
      position: relative;
      .name {
        color: #666;
        font-size: 14px;
        .vip {
            display: inline-block;
            vertical-align: middle;
            width: 32px;
            height: 11px;
            background: url("https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213922957/d393/4206/8928/a082dd9a7e7bb69e84b138b8df7bbcd0.png");
            background-position: center;
            background-size: 32px 11px;
        }
      }
      .time {
        color: #999;
        font-size: 12px;
        margin-top: 3px;
      }
      .count {
        position: absolute;
        top: 0px;
        right: 10px;
        display: block;
        font-size: 12px;
        color: #999;
        .u-svg {
          width: 14px;
          height: 14px;
        }
      }
    }
    .bottom {
      width: 100%;
      overflow: hidden;
      .content {
        // 解决长串数字、英文字母连在一起时不能自动换行
        word-break:break-all;
        word-wrap:break-word;
        margin: 10px 0 15px 0px; 
      }
    }

  }
}
</style>