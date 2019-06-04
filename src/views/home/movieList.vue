<template>
  <el-container>
    <el-header>
      <h1 style="text-align=left">正在热映</h1>
    </el-header>
    <el-main>
      <el-row type="flex" justify="space-between">
        <el-col v-for="(movie, i) in movies" :key="i" :span="4">
          <movie-card :movie="movie"></movie-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MovieCard from '@/components/MovieCard'
export default {
  components: {
    'movie-card': MovieCard
  },
  data () {
    return {
      movies: [
        {
          posterUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559564720637&di=76e6c7a1bb8d8d999af4b849c8770713&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fitem%2F201410%2F05%2F20141005110132_WCaNm.thumb.700_0.jpeg'
        },
        {
          posterUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559564720637&di=76e6c7a1bb8d8d999af4b849c8770713&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fitem%2F201410%2F05%2F20141005110132_WCaNm.thumb.700_0.jpeg'
        },
        {
          posterUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559564720637&di=76e6c7a1bb8d8d999af4b849c8770713&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fitem%2F201410%2F05%2F20141005110132_WCaNm.thumb.700_0.jpeg'
        },
        {
          posterUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559564720637&di=76e6c7a1bb8d8d999af4b849c8770713&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fitem%2F201410%2F05%2F20141005110132_WCaNm.thumb.700_0.jpeg'
        }
      ]
    }
  }
}
</script>

<style>
.el-main{
  margin: 0 12%;
}
</style>
