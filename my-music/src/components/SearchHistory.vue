<template>
  <div class="search-history">
      <ul>
        <li v-for="(item,index) in history" :key="index" @click="$emit('play-histroy',item)"><span>{{item}}</span><div class="icon" @click.stop="$emit('del',item)"></div></li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'SearchHistory',
    props: ['history']
}
</script>

<style lang="less">
.search-history {
  margin-top: 10px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  width: 100%;
  ul {
    li {
      padding-left: 8px;
      box-sizing: border-box;
      position: relative;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #f6f7f8;
      margin-left: 20px;
      &::before {
        content:'';
        position: absolute;
        left: -20px;
        top: 15px;
        display: block;
        width: 15px;
        height: 15px;
        background: url(../assets/history.svg);
      }
      .icon {
        position: absolute;
        right: 10px;
        top: 16px;
        width: 13px;
        height: 13px;
        background: url(../assets/del.svg);
      }
    }
  }
}
</style>