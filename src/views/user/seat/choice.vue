<template>
  <el-container class="page">
    <el-main style="padding: 10%">
      <seat-card :seats="seats"></seat-card>
    </el-main>
    <el-aside :width="'40%'" class="right">
      <el-container>
        <el-container>
          <el-aside :width="'30%'" class="inner-left">
             <el-image
                style="height: 100%; width: 100%"
                :src="schedule.posterUrl"
                fit="fill"
                class="posterimage"></el-image>
          </el-aside>
          <el-main class="inner-right">
            <h2 style="text-color: grey;margin:0"> {{schedule.movieName}}</h2><br><br>
            <span style="font-size:15px">语言：{{schedule.language}}</span><br>
            <span style="font-size:15px">类型：{{schedule.type}}</span><br>
            <span style="font-size:15px">片长：{{schedule.length}}</span><br>
            <span style="font-size:15px">票价：￥{{schedule.price}}</span><br>
          </el-main>
        </el-container>
        <el-main class="middle">
          <br>
          <span>影厅：{{ schedule.hall }}</span><br><br>
          <span>影厅：{{ schedule.time }}</span><br><br>
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
            <router-link :to="'/user/seat/payment'">
              <el-button>
                确认
              </el-button>
            </router-link>
          </div>
        </el-footer>
      </el-container>
    </el-aside>
  </el-container>
</template>

<script>
import SeatCard from '@/components/SeatCard'

export default {
  name: 'choice',
  components: {
    'seat-card': SeatCard
  },
  data () {
    return {
      schedule: {
        movieName: '黄金时代',
        language: '中文',
        type: '文艺/爱情',
        hall: 'max巨幕厅',
        price: '30',
        seat: '二排一座',
        time: '2019.5.18',
        length: '2小时',
        posterUrl: 'http://hbimg.b0.upaiyun.com/07b3b8977763bedc8b6b2d3bcdd36defdcb00c1da4e7-WhZGy4_fw658',
        status: '已完成',
        startTime: '20:00:00',
        endTime: '22:00:00'
      },
      seats: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0]
      ]
    }
  },
  computed: {
    renderSeats: function () {
      debugger
      return this.seats
    },
    selectedSeats: function() {
      var selSeats = []
      for(let i = 0; i < this.seats.length; ++i) {
        for(let j = 0; j < this.seats[i].length; ++j ) {
          if (this.seats[i][j] != 2) {
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
    formatSeats: function() {
      var selSeats = []
      for(let i = 0; i < this.seats.length; ++i) {
        for(let j = 0; j < this.seats[i].length; ++j ) {
          if (this.seats[i][j] != 2) {
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
  methods: {
    handleChooseSeat: function(i, j) {
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
}
.inner-left{
  width: 20%;
  height: 100%
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
