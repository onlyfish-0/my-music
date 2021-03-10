<template>
  <div class="search-lists">
    <ul>
      <NewMusicList
        v-for="(song, index) in songs"
        @play-song="$emit('play-song',$event.song)"
        :newlist="{...song,song:{artists: song.artists},picUrl:song.artists[0].img1v1Url}"
        :key="index"
        :index="index"
        :pause="pause"
        :playsongname="playsongname"
        :red="false"
      />
    </ul>
  </div>
</template>

<script>
import NewMusicList from "@/components/NewMusicList.vue";
export default {
  name: "SearchLists",
  props: ["songs", "pause", "playsongname"],
  components: {
    NewMusicList,
  },
};
</script>

<style>
</style>