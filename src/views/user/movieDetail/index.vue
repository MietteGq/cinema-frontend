<template>
  <el-container width="100%">
    <el-header :height="'100%'" width="100%">
      <movie-info v-if="loading" :movie="movie"></movie-info>
    </el-header>
    <el-main>
      <div class="comment-module" style="margin-bottom:10px">选座购票</div>
      <el-tabs type="border-card" v-if="scheduleLoading">
        <el-tab-pane v-for="(schedule, i) in formatSchedules" :key="i" :label="schedule.date">
            <el-table
              :data="schedule.scheduleItemList"
              stripe
              style="width: 100%">
            <el-table-column
              prop="time"
              label="放映时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="hallName"
              label="放映厅"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fare"
              label="票价">
            </el-table-column>
            <el-table-column
              prop="id"
              label="选座购票">
              <template slot-scope="scope">
                <el-button type="primary" @click.native.prevent="handleClick(scope.row)">选座购票</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
      <div style="width:60%">
        <div class="comment-module" v-if="commentLoading">热门评论</div>
        <el-row v-for="(comment, i) in comments" :key="i" style="margin: 20px 0">
          <comment-card :comment="comment"></comment-card>
        </el-row>
      </div>
      <div style="width:40%">
        <div style="margin:50px">
          <div  style="margin-bottom:10px;text-align:left">
            <router-link :to="'/movieList'">
              更多热门电影...
            </router-link>
          </div>
          <el-row v-for="(rowMovies, i) in sortedMovies" :key="i" class="line">
            <el-col v-for="(movie, j) in rowMovies" :key="j" :span="10" :offset="2">
              <movie-card :movie="movie"></movie-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import MovieInformation from '@/components/MovieInformation'
import { movieDetail, movieComment, getTop4 } from '@/api/movie'
import { movieSchedule } from '@/api/schedule'
import { formatDateTime, formatHourSecondTime } from '@/utils/format'
import CommentCard from '@/components/CommentCard'
import MovieCard from '@/components/MovieCard'

export default {
  components: {
    'movie-info': MovieInformation,
    'comment-card': CommentCard,
    'movie-card': MovieCard
  },
  computed: {
    formatSchedules: function () {
      return this.schedules.map(schedule => {
        return {
          date: formatDateTime(schedule.date),
          scheduleItemList: schedule.scheduleItemList.map(each => {
            return {
              time: formatHourSecondTime(each.startTime),
              hallName: each.hallName,
              fare: each.fare,
              id: each.id
            }
          })
        }
      })
    },
    sortedMovies: function () {
      const column = 2
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
      movie: null,
      schedules: null,
      movieId: null,
      userId: null,
      loading: false,
      scheduleLoading: false,
      commentLoading: false,
      comments: null,
      movies: [],
      movieLoading: false
    }
  },
  created () {
    this.scheduleId = this.$route.query.scheduleId
    this.movieId = this.$route.query.movieId
    this.userId = this.$store.state.userId
    this.getMovieDetail()
    this.getMovieSchedule()
    this.getMovieComment()
    this.getTop4Movies()
  },
  methods: {
    getMovieDetail: function () {
      movieDetail(this.movieId, this.userId).then(response => {
        const { content: movie } = response
        this.movie = movie
        this.loading = true
      }).catch(err => console.log(err))
    },
    getMovieSchedule: function () {
      movieSchedule(this.movieId).then(response => {
        const { content: schedules } = response
        this.schedules = schedules
        this.scheduleLoading = true
      }).catch(err => console.log(err))
    },
    getMovieComment: function () {
      movieComment(this.movieId).then(response => {
        const { content: comments } = response
        this.comments = comments
        this.commentLoading = true
      }).catch(err => console.log(err))
    },
    handleClick: function (schedule) {
      this.$router.push({
        path: '/user/seat',
        query: {
          scheduleId: schedule.id,
          movieId: this.movieId
        }
      })
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
.info{
  margin: 0 12%;
  width: 400px;
}
.el-footer{
  margin: 0 12%;
  display: flex;
}
.comment-module{
  font-size: 20px;
  text-align: left;
}
</style>
