<template>
  <el-container v-if="movieLoading && scheduleLoading && ticketsLoading ">
    <el-header>
      <span>{{ movie.name }}</span>
      <span>{{ waitTime }}</span>
    </el-header>
    <el-main>
       <el-table
        :data="tableData"
        style="width: 100%; height:100%"
        :header-cell-style="{background:'lightgrey'}">
        <el-table-column
          label="电影"
          width="360">
          <div class="div">
            <div :style=backgroundDiv class="div1">
            </div>
            <div class="div2">
              <div class="title">
                {{movie.name}}
              </div>
              <div class="text">
                片长：{{movie.length}}
              </div>
              <div class="text">
                语言：{{movie.language}}
              </div>
            </div>
          </div>
        </el-table-column>
        <el-table-column
          label="场次"
          width="180">
          <div class="text">
            <span>{{ schedule.hallName }}</span><br><br>
            <span>{{ formatStartTime }}</span>
          </div>
        </el-table-column>
        <el-table-column
          label="票数/座位"
          width="180">
           <div>
            <span>{{ tickets.length }}张</span><br><br>
            <el-tag v-for="(ticket,i) in tickets" :key=i>
              {{ `${ticket.rowIndex + 1}排${ticket. columnIndex+ 1}列` }}
            </el-tag>
          </div>
        </el-table-column>
        <el-table-column
          label="单价"
          width="160">
           <div class="text">
            <span>{{ schedule.fare }}</span><br><br>
          </div>
        </el-table-column>
        <el-table-column
          prop="name"
          width="160"
          label="总价">
           <div class="text">
            <span>{{ total }}</span><br><br>
          </div>
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top:10px;margin-right:20px">实付款{{ payMoney }}</div>
    </el-main>
    <el-footer>
      <div style="text-align:left" v-if="couponsLoading">
        <div style="margin-bottom:10px">优惠券</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.index"
            :value="item"
            :label="item.label">
          </el-option>
        </el-select>
      </div>
      <div style="text-align:right">
        <el-button type="simple" @click="dialogVisible = true">确认订单，立即支付</el-button>
      </div>
      <div style="text-align:left">
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        height="100%"
        :before-close="handleClose">
        <el-tabs type="border-card">
          <el-tab-pane label="银行卡">
            <el-form ref="form" :model="payForm" label-width="80px" >
              <el-form-item label="银行卡号">
                <el-input v-model="payForm.number"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="payForm.password"></el-input>
              </el-form-item>
              <span>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
             </span>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="会员卡" v-if="VIPCardLoading">
            <span>会员卡号：{{ VIPCard.id }}</span><br><br>
            <span>余额：{{ VIPCard.balance }}</span><br><br>
            <span>应付款：{{payMoney}}</span><br><br>
            <span>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="buyTicketsByVIPCard()">确 定</el-button>
             </span>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
import { movieDetail } from '@/api/movie'
import { idSchedule } from '@/api/schedule'
import { lockSeat } from '@/api/ticket'
import { formatDateTime, formatHourSecondTime } from '@/utils/format'
import { getCoupons } from '@/api/coupon'
import { getVIPCard, buyByVIPCard } from '@/api/VIPCard'

export default {
  data () {
    return {
      movie: null,
      schedule: null,
      tickets: [],
      seats: [],
      movieId: null,
      scheduleId: null,
      userId: null,
      movieLoading: false,
      scheduleLoading: false,
      ticketsLoading: false,
      couponsLoading: false,
      VIPCardLoading: false,
      timeout: 15 * 60,
      timer: null,
      coupons: null,
      value: null,
      VIPCard: null,
      payForm: {
        number: 1,
        password: 123
      },
      dialogVisible: false,
      memberCard: {
        remainer: '100'
      }
    }
  },
  computed: {
    total: function () {
      return this.tickets.length * this.schedule.fare
    },
    formatStartTime: function () {
      return `${formatDateTime(this.schedule.startTime)} ${formatHourSecondTime(this.schedule.startTime)}`
    },
    backgroundDiv: function () {
      return {
        backgroundImage: `url(${this.movie.posterUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    },
    tableData: function () {
      return [{
        movie: this.movie,
        schedule: this.schedule
      }]
    },
    options: function () {
      var tmpIndex = 0
      return this.coupons.filter(each => (parseInt(each.targetAmount)) < parseInt(this.total)).map(coupon => {
        return {
          index: tmpIndex++,
          id: coupon.id,
          discount: coupon.discountAmount,
          label: `${coupon.name}：满${coupon.targetAmount}减${coupon.discountAmount}`
        }
      })
    },
    ticketId: function () {
      return this.tickets.map(ticket => {
        return ticket.id
      })
    },
    payMoney: function () {
      if (this.value === null) {
        return this.total
      }
      return parseInt(this.total) - parseInt(this.value.discount)
    },
    waitTime: function () {
      return `${parseInt(this.timeout / 60)}分${this.timeout % 60 < 10 ? 0 : ''}${this.timeout % 60}秒`
    }
  },
  created () {
    this.scheduleId = this.$route.query.scheduleId
    this.movieId = this.$route.query.movieId
    this.seats = this.$route.query.seats
    this.userId = this.$store.state.userId
    this.getMovieDetail()
    this.getScheduleById()
    this.getTickets()
    this.getCouponsById()
    this.countdown()
    this.getVIPCardById()
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getMovieDetail: function () {
      movieDetail(this.movieId, this.userId).then(response => {
        const { content: movie } = response
        this.movie = movie
        this.movieLoading = true
      }).catch(err => console.log(err))
    },
    getScheduleById: function () {
      idSchedule(this.scheduleId).then(response => {
        const { content: schedule } = response
        this.schedule = schedule
        this.scheduleLoading = true
      }).catch(err => console.log(err))
    },
    getTickets: function () {
      lockSeat({
        userId: this.userId,
        scheduleId: this.scheduleId,
        seats: this.seats
      }).then(response => {
        const { content: tickets } = response
        this.tickets = tickets
        this.ticketsLoading = true
      }).catch(err => console.log(err))
    },
    getCouponsById: function () {
      getCoupons(this.userId).then(response => {
        const { content: coupons } = response
        this.coupons = Array.from(new Set(coupons))
        this.couponsLoading = true
      })
    },
    getVIPCardById: function () {
      getVIPCard(this.userId).then(response => {
        const { content: VIPCard } = response
        this.VIPCard = VIPCard
        this.VIPCardLoading = true
      })
    },
    buyTicketsByVIPCard: function () {
      buyByVIPCard(this.ticketId, this.value ? this.value.id : -1).then(response => {
        console.log(JSON.stringify(response))
      })
    },
    countdown: function () {
      this.timer = window.setInterval(() => {
        if (this.timeout === 0) {
          console.log('time out!')
          window.clearInterval(this.timer)
        }
        this.timeout -= 1
      }, 1000)
    }
  }
}
</script>

<style scoped>
.el-header{
  text-align: left;
}
#div1, #div2{
  display: inline-block;
}
.el-container {
  margin: 0 12%;
}
.div{
  display: flex;
}
.div1{
  width: 50%;
  height: 200px;
  line-height: 100px;
  margin: 10px;
}
.div2{
  width: 50%;
  height: 150px;
  line-height: 100px;
}
.posterUrl{
  width: 100%;
  height: 100%;
}
.title{
  height: 60%;
  text-align: left;
  font-size: 20px
}
.text{
  height: 20%;
  text-align: left;
  font-size: 12px;
}
</style>
