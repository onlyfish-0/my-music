<template>
  <div class="search-box">
    <div class="find">
      <input
        ref="input"
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model.trim="searchValue"
        @keyup.enter="keyup"
        @focus="$emit('show-list',false)"
      />
      <div class="icon1"></div>
      <div class="icon2" v-if="searchValue" @click="searchValue = ''"></div>
      <div v-show="clickShow">
      <div class="sync" v-show="searchValue && !showList">搜索“{{ searchValue }}”</div>
      <ul class="search-result" v-show="searchValue && !isShow && !showList">
        <li v-for="(searchlist, index) in searchLists" :key="index" @click="$emit('search-li',searchlist.keyword)">
          {{ searchlist.keyword }}
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  props: ['isShow','showList','value','histroyBool','clickShow'],
  data: function () {
    return {
      timer: null,
      searchValue: "",
      searchLists: [],
    };
  },
  methods: {
    keyup: function () {
      if(this.searchValue != '' ) {
        this.$emit('search-li',this.searchValue);
      }
      // 失去焦点
      this.$refs.input.blur();
    }
  },
  watch: {
    searchValue: function (n) {
      let that = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(n);
        if (n != "") {
          this.$emit('is-show',true);
          this.axios
            .get("search/suggest?keywords=" + n +"&type=mobile")
            .then((response) => {
              console.log(response.data.result.allMatch);
              that.searchLists = response.data.result.allMatch;
            })
            .finally(() => {
              this.$emit('is-show',false);
            });
        }
      }, 300);

      this.$emit("show-list",false);
      if(n != "") {
        this.$emit("hide", false);
      }
      else {
        this.$emit("hide", true);
        this.$emit("show-list",false);
      }
    },
    histroyBool: function () {
      this.searchValue = this.value;
    }
  }
};
</script>

<style lang="less">
.search-box {
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 40px;
  width: 100%;
  height: 60px;
  background-color: #fbfcfd;
  border-bottom: 1px solid #f1f2f2;
  .find {
    input {
      width: 100%;
      height: 30px;
      background-color: #ebecec;
      box-sizing: border-box;
      outline: none;
      border: none;
      border-radius: 25px;
      padding-left: 25px;
      margin: 15px 0;
    }
    .icon1 {
      position: absolute;
      left: 16px;
      top: 22px;
      width: 16px;
      height: 16px;
      background: url(../assets/放大镜.svg);
    }
    .icon2 {
      position: absolute;
      right: 20px;
      top: 24px;
      width: 12px;
      height: 12px;
      background: url(../assets/删除圆.png);
    }

    .sync {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #507daf;
      border-bottom: 1px solid #f1f2f2;
    }
    .search-result {
      width: 100%;
      li {
        padding-left: 20px;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #f1f2f2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 17px;
          width: 15px;
          height: 15px;
          background: url(../assets/放大镜.svg);
        }
      }
    }
  }
}
</style>