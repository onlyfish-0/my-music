<template>
<!-- 主导航栏下的主界面 -->
  <div class="home">
    <Recommend @play-song="$emit('play-song',$event)" :pause="pause" :playsongname="playsongname"/>
  </div>
</template>

<script>
// @ is an alias to /src

import Recommend from '@/views/Recommend.vue'
export default {
  name: 'Home',
  props: ['pause','playsongname'],
  components: {
    Recommend
  }
}
</script>
<style lang="less">
.home {
  margin-top: 60px;
}
</style>
