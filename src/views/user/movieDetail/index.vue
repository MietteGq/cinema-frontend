<template>
  <el-container width="100%">
    <el-header :height="'100%'" width="100%">
      <movie-info v-if="loading" :movie="movie"></movie-info>
    </el-header>
    <el-main>
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
  </el-container>
</template>

<script>
import MovieInformation from '@/components/MovieInformation'
import { movieDetail } from '@/api/movie'
import { movieSchedule } from '@/api/schedule'
import { formatDateTime, formatHourSecondTime } from '@/utils/format'

export default {
  components: {
    'movie-info': MovieInformation
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
    }
  },
  data () {
    return {
      movie: null,
      schedules: null,
      movieId: null,
      userId: null,
      loading: false,
      scheduleLoading: false
    }
  },
  created () {
    this.scheduleId = this.$route.query.scheduleId
    this.movieId = this.$route.query.movieId
    this.userId = this.$store.state.userId
    this.getMovieDetail()
    this.getMovieSchedule()
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
    handleClick: function (schedule) {
      this.$router.push({
        path: '/user/seat',
        query: {
          scheduleId: schedule.id,
          movieId: this.movieId
        }
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
</style>
