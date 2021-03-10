<template>
  <div class="recommend">
      <!-- 推荐歌单 -->
      <Playlist :playlists="displaylist"/>
      <!-- 最新音乐 -->
      <Newmusic :newlists="newlists" @play-song="$emit('play-song',$event)" :pause="pause" :playsongname="playsongname" />
  </div>
</template>

<script>
import Playlist from '@/components/Playlist.vue'
import Newmusic from '@/components/Newmusic.vue'
export default {
    name: 'Recommend',
    props: ['pause','playsongname'],
    data: function () {
        return {
            // 保存推荐歌单数据
            playlists: [],
            newlists: [],
            playlistIndex: 0,
            count: 0
        }
    },
    computed: {
        displaylist: function (){
            // 截取前6个歌单
            return this.playlists.slice(this.playlistIndex *6,(this.playlistIndex *6) + 6);
        }
    },
    created() {
        this.axios.get('personalized').then(responsed => {
            this.$root.isShowloading = true;
            // console.log(responsed.data.result)
            // 获取推荐歌单数据
            this.playlists = responsed.data.result;
        }).finally(()=>{
            this.count += 1;
        }),

        this.axios.get('personalized/newsong').then(responsed => {
            this.$root.isShowloading = true;
            // console.log(responsed.data.result)
            // 获取最新音乐数据
            this.newlists = responsed.data.result;
        }).finally(()=>{
            this.count += 1;
        })
    },
    components: {
        Playlist,
        Newmusic
    },
    activated() {
        this.playlistIndex = this.playlistIndex >= 4 ? 0 : this.playlistIndex + 1;
    },
    watch: {
        count: function (n) {
            if(n >=2) {
                this.$root.isShowloading = false;
                this.count = 0;
            }
        }
    }
}
</script>

<style>

</style>