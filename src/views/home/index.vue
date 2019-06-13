<template>
  <el-container>
    <el-header :height="'100%'" :style=backgroundDiv  class="image">
      <el-carousel :height="'500px'">
        <el-carousel-item v-for="item in imagebox" :key="item.id" :style=backgroundDiv  class="imgBox">
          <el-image
            style="height: 100%; width: 70%"
            :src="item.idView"
            :fit="'fill'"
            >
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </el-header>
    <el-main>
      <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="正在热映" v-if="movieLoading" name="first">
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
import { getTop4 } from '@/api/movie'

export default {
  components: {
    'movie-card': MovieCard
  },
  data () {
    return {
      activeName: 'first',
      imagebox: [
        { id: 0, idView: require('@/assets/images/advise1.jpg') },
        { id: 1, idView: require('@/assets/images/home1.jpg') },
        { id: 2, idView: require('@/assets/images/advise3.jpg') },
        { id: 3, idView: require('@/assets/images/home3.jpg') }
      ],
      movies: null,
      movieLoading: false
    }
  },
  created () {
    this.getTop4Movies()
  },
  computed: {
    backgroundDiv: function () {
      return {
        backgroundImage: 'url(' + require('@/assets/images/advise1.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getTop4Movies: function () {
      getTop4().then(response => {
        const { content: top10Movies } = response
        this.movies = top10Movies
        this.movieLoading = true
      })
    }
  }
}
</script>

<style scoped>
.el-main {
  margin: 0 12%;
}

.html{
  width:100%;
}

</style>
