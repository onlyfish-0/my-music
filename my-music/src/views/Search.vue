<template>
<!-- 存在bug,点击同一个热搜时,第二次无法设置input的v-model -->
<!-- 解决办法:设置一个布尔值,点击的时候取反,将布尔值往下传,监听该布尔值,因为每次点击布尔值都会改变
     所以每次都可以触发该监听事件,不会有value不变时无法触发的问题
 -->
  <div class="search">
    <div class="search-mask" v-show="isShow"></div>
    <SearchBox :clickShow="clickShow" :histroyBool="histroyBool" :value="value" @show-list="showList = $event" :showList="showList" @search-li="getLists" @is-show="isShow = $event" @hide="hide = $event" :isShow="isShow"/>
    <SearchHot @search-li="getLists" v-if="hide" :hotresult="hotresult"/>
    <SearchHistory @play-histroy="getLists" @del="delhistory" :history="history" v-if="hide"/>
    <SearchLists @play-song="$emit('play-song',$event)" v-show="showList" :songs="songs" :pause="pause" :playsongname="playsongname"/>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
import SearchHot from '@/components/SearchHot.vue'
import SearchHistory from '@/components/SearchHistory.vue'
import SearchLists from '@/components/SearchLists.vue'
export default {
    name: 'Search',
    props: ['pause','playsongname'],
    data: function () {
      return {
        hide: true,
        hotresult: [],
        isShow: false,
        songs: null,
        showList: false,
        value: '',
        history: [],
        histroyBool: true,
        clickShow: true
        // 缓存
        // localBool: false,
        // msg: []
      }
    },
    components: {
      SearchBox,
      SearchHot,
      SearchHistory,
      SearchLists
    },
    created() {
      this.$root.isShowloading = true;
      this.axios.get("search/hot").then(response => {
        // console.log(response.data.result.hots)
        this.hotresult = response.data.result.hots;
      }).finally(() => {
        this.$root.isShowloading = false; 
      })

      // 获取本地缓存
      // this.msg = JSON.parse(localStorage.getItem('data'));
      // if(this.msg) {
      //   this.localBool = false;
      // }
      // else {
      //   this.localBool = true;
      // }
    },
    methods: {
      getLists: function (data) {
        this.clickShow = false;
        this.histroyBool = !this.histroyBool;
        this.value = data;
        if(this.history.indexOf(data) == -1) {
          this.history.unshift(data);
        }
        console.log(data)
        this.isShow = true;
        this.axios.get('/search?keywords='+data).then((response) => {
          console.log(response);
          this.songs = response.data.result.songs;
        }).finally(() => {
          this.isShow = false;
          this.showList = true;
          this.clickShow = true;
        })
      },
      // 本地缓存
      // local: function (item) {
      //   if(this.history.map(e => e.item).indexOf(item) == -1) {
      //     this.history.unshift({"item":item});
      //     localStorage.setItem('data',JSON.stringify(this.history));
      //     this.msg = JSON.parse(localStorage.getItem('data'));
      //   }
      // },
      delhistory: function (item) {
        this.history = this.history.filter((e)=> {
          return e != item;
        })
      }
    }
}
</script>

<style lang="less">
.search {
  position: relative;
    .search-mask {
      position: absolute;
      left: 0;
      top: 200px;
      right: 0;
      margin: auto;
      width: 80px;
      height: 80px;
      background: url(../assets/loading.jpg) no-repeat center center/cover;
    }
}
</style>