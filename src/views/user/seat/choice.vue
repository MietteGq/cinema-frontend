<template>
  <el-container class="page" v-if="seatLoading && movieLoading">
    <el-main style="padding: 2% 0 0 0">
      <h3 style="text-align: left; padding-left: 2%">{{ schedule.hallName }}</h3>
      <seat-card :seats="seats"></seat-card>
    </el-main>
    <el-aside :width="'40%'" class="right">
      <el-container>
        <el-container>
          <el-aside :width="'30%'" class="inner-left">
             <el-image
                style="height: 100%; width: 100%"
                :src="movie.posterUrl"
                fit="fill"
                class="posterimage"></el-image>
          </el-aside>
          <el-main class="inner-right">
            <h2 style="text-color: grey;margin:0"> {{movie.name}}</h2><br><br>
            <span style="font-size:15px">语言：{{movie.language}}</span><br>
            <span style="font-size:15px">类型：{{movie.type}}</span><br>
            <span style="font-size:15px">片长：{{movie.length}}</span><br>
            <span style="font-size:15px">票价：￥{{schedule.fare}}</span><br>
          </el-main>
        </el-container>
        <el-main class="middle">
          <br>
          <span>影厅：{{ schedule.hallName }}</span><br><br>
          <span>时间：{{ formatStartTime }}</span><br><br>
          <el-row>
            <div>
              <el-button type="text">座位：</el-button>
            </div>
            <el-row v-for="(tmpSeats, i) in formatSeats" :key="i" :gutter="20" style="padding: 5px">
              <el-col v-for="(seat, j) in tmpSeats" :key="j" :span="6">
                <el-tag
                  closable
                  :type="''"
                  @close="handleChooseSeat(seat.row, seat.col)"
                  >
                  {{ `${seat.row + 1}排${seat.col + 1}列` }}
                </el-tag>
              </el-col>
            </el-row>
          </el-row>
        </el-main>
        <el-footer>
          <div style="text-align:left">
            <el-button @click.native.prevent="handleClick()">
              确认
            </el-button>
          </div>
        </el-footer>
      </el-container>
    </el-aside>
  </el-container>
</template>

<script>
import SeatCard from '@/components/SeatCard'
import { Message } from 'element-ui'
import { movieDetail } from '@/api/movie'
import { seatStatus } from '@/api/ticket'
import { formatDateTime, formatHourSecondTime } from '@/utils/format'

export default {
  name: 'choice',
  components: {
    'seat-card': SeatCard
  },
  data () {
    return {
      date: null,
      time: null,
      schedule: null,
      movie: null,
      movieLoading: false,
      seatLoading: false,
      userId: null,
      seats: null
    }
  },
  computed: {
    formatStartTime: function () {
      return `${formatDateTime(this.schedule.startTime)} ${formatHourSecondTime(this.schedule.startTime)}`
    },
    renderSeats: function () {
      return this.seats
    },
    selectedSeats: function () {
      var selSeats = []
      for (let i = 0; i < this.seats.length; ++i) {
        for (let j = 0; j < this.seats[i].length; ++j) {
          if (this.seats[i][j] !== 2) {
            continue
          }
          selSeats.push({
            'rowIndex': i,
            'columnIndex': j
          })
        }
      }
      return selSeats
    },
    formatSeats: function () {
      var selSeats = []
      for (let i = 0; i < this.seats.length; ++i) {
        for (let j = 0; j < this.seats[i].length; ++j) {
          if (this.seats[i][j] !== 2) {
            continue
          }
          selSeats.push({
            'row': i,
            'col': j
          })
        }
      }
      const sectionCount = 4
      var arrTmp = []
      for (let i = 0; i < selSeats.length; ++i) {
        const index = parseInt(i / sectionCount)
        if (index >= arrTmp.length) {
          arrTmp.push([])
        }
        arrTmp[index].push(selSeats[i])
      }
      return arrTmp
    }
  },
  created () {
    this.scheduleId = this.$route.query.scheduleId
    this.movieId = this.$route.query.movieId
    this.userId = this.$store.state.userId
    this.getMovieDetail()
    this.getSeatStatus()
  },
  methods: {
    handleChooseSeat: function (i, j) {
      switch (this.seats[i][j]) {
        case 0:
          this.$set(this.seats[i], j, 2)
          break
        case 1:
          break
        case 2:
          this.$set(this.seats[i], j, 0)
          break
      }
    },
    getMovieDetail: function () {
      movieDetail(this.movieId, this.userId).then(response => {
        const { content: movie } = response
        this.movie = movie
        this.movieLoading = true
      }).catch(err => console.log(err))
    },
    getSeatStatus: function () {
      seatStatus(this.scheduleId).then(response => {
        const seats = response.content.seats
        const scheduleItem = response.content.scheduleItem
        this.schedule = scheduleItem
        this.seats = seats
        this.seatLoading = true
      }).catch(err => console.log(err))
    },
    handleClick: function () {
      if (this.selectedSeats.length < 1) {
        Message({
          message: '请至少选择一个座位',
          type: 'error',
          duration: 5000
        })
        return
      }
      this.$router.push({
        path: '/user/seat/payment',
        query: {
          scheduleId: this.scheduleId,
          movieId: this.movieId,
          seats: this.selectedSeats
        }
      })
    }
  }
}
</script>

<style scoped>
.page{
  margin: 0 12%;
  height: 100%;
}
.right{
  width: 40%;
  height: 100%;
  background-color: whitesmoke;
}
.inner-left{
  width: 20%;
  height: 100%;
  margin: 5px;
}
.inner-right{
  padding: 0;
  margin-left: 5%;
  width: 80%;
  height: 100%;
  text-align: left;
}
.middle{
  text-align: left;
}
</style>
