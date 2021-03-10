<template>
  <div class="search-hot">
    <p>热门搜索</p>
    <ul>
      <li v-for="(hotname,index) in hotresult" :key="index" @click="$emit('search-li',hotname.first)">{{hotname.first}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'SearchHot',
    props: ['hotresult'],
    data: function () {
      return {
        
      }
    },
}
</script>

<style lang="less">
.search-hot {
  margin-top: 15px;
  padding: 0 10px;
  box-sizing: border-box;
  p {
    font-size: 12px;
    color: #666;
  }
  ul {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 5px 14px;
      box-sizing: border-box;
      border-radius: 25px;
      border: 1px solid #eeeff1;
      margin: 10px 8px 0 0;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>