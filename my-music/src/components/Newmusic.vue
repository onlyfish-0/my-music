<template>
  <div class="newmusic" ref="newmusicDiv">
    <BorderTitle>最新音乐</BorderTitle>
    <ul>
      <NewMusicList
        v-for="(newlist, index) in newlists"
        :key="newlist.id"
        :newlist="newlist"
        :index="index"
        :pause="pause"
        :playsongname="playsongname"
        @play-song="play"
      />
    </ul>
  </div>
</template>

<script>
import BorderTitle from "@/components/BorderTitle.vue";
import NewMusicList from "@/components/NewMusicList.vue";
export default {
  name: "Newmusic",
  data:function () {
    return {
      
    }
  },
  props: {
    newlists: Array,
    playsongname: Object,
    pause: Boolean
  },
  components: {
    BorderTitle,
    NewMusicList,
  },
  methods: {
    play: function (obj) {
      this.$emit('play-song',obj.song);
      this.$refs.newmusicDiv.style.marginBottom = 55 + "px";
    }
  }
};
</script>

<style lang="less">
</style>