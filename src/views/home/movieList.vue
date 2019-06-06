<template>
  <el-container>
    <el-header>
      <h1 style="text-align=left">正在热映</h1>
    </el-header>
    <el-main>
      <el-row v-for="(rowMovies, i) in sortedMovies" :key="i" class="line">
        <el-col v-for="(movie, j) in rowMovies" :key="j" :span="4" :offset="2">
          <movie-card :movie="movie"></movie-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MovieCard from '@/components/MovieCard'
import { allMovieOn } from '@/api/movie'

export default {
  components: {
    'movie-card': MovieCard
  },
  computed: {
    sortedMovies: function () {
      const column = 4
      var tmpMovies = []
      for (let i = 0; i < this.movies.length; i++) {
        const row = parseInt(i / column)
        if (i % column === 0) {
          tmpMovies.push([])
        }
        tmpMovies[row].push(this.movies[i])
      }
      return tmpMovies
    }
  },
  data () {
    return {
      movies: []
    }
  },
  created () {
    this.getAllMovieOn()
  },
  methods: {
    getAllMovieOn: function () {
      allMovieOn().then(response => {
        const { content: movies } = response
        this.movies = movies
      })
    }
  }
}
</script>

<style scoped>
.el-main{
  margin: 0 12%;
}
.line{
  margin-top: 20px;
}
</style>
