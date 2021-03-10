<template>
<!-- 主导航栏 -->
  <div id="homenav">
      <div><router-link to="/home">推荐音乐</router-link></div>
      <div><router-link to="/hot">热歌榜</router-link></div>
      <div><router-link to="/search">搜索</router-link></div>
  </div>
</template>

<script>
export default {
    name: 'HomeNav'
}
</script>

<style lang="less">
#homenav {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    border-bottom: 1px solid #f6f6f6;
    background-color: #fff;
    z-index: 5;
    height: 40px;
    div {
        width: 100%;
        height: 40px;
        flex: 1;
        text-align: center;
    }
    a {
        padding: 0 6px;
        display: inline-block;
        text-align: center;
       text-decoration: none;
        -webkit-tap-highlight-color:transparent;
        line-height: 37px;
        color: #000;
    }
    .router-link-exact-active  {
        &.router-link-active {
            border-bottom: 3px solid #dd001b;
            color: #dd001b;
        }
    }
}
</style>