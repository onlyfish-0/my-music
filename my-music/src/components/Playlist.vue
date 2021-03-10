<template>
  <div class="playlist">
      <BorderTitle>推荐歌单</BorderTitle>
      <ul class="songslist">
          <SongsList v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"/>
      </ul>
  </div>
</template>

<script>
import BorderTitle from '@/components/BorderTitle.vue'
import SongsList from '@/components/SongsList.vue'
export default {
    name: 'Playlist',
    props: {
        playlists: Array
    },
    components: {
        BorderTitle,
        SongsList
    }
}
</script>

<style lang="less">
.playlist {
    margin-bottom: 30px;
    .songslist {
        display: flex;
        flex-wrap: wrap;
    }
}

</style>