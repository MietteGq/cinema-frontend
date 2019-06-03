<template>
  <el-container>
    <el-header :height="'100%'">
      <el-carousel :height="'500px'">
        <el-carousel-item v-for="item in imagebox" :key="item.id">
          <el-image
            style="height: 100%"
            :src="item.idView"
            :fit="'fill'"
            >
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </el-header>
    <el-main>
      <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="正在热映" name="first">
          <el-row type="flex" justify="space-between">
            <el-col v-for="(movie, i) in movies" :key="i" :span="4">
              <movie-card :movie="movie"></movie-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="即将上映" name="second">即将上映</el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
    </el-footer>
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
      activeName: 'first',
      imagebox: [
        { id: 0, idView: require('@/assets/images/p1.jpg') },
        { id: 1, idView: require('@/assets/images/p1.jpg') },
        { id: 2, idView: require('@/assets/images/p1.jpg') },
        { id: 3, idView: require('@/assets/images/p1.jpg') }
      ],
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
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.el-main {
  margin: 0 12%;
}
</style>
