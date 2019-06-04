<template>
  <el-main>
    <el-row v-for="(ticket, i) in tickets" :key="i" style="margin: 20px 0">
        <ticket-card :ticket="ticket"></ticket-card>
      </el-row>
  </el-main>
</template>

<script>
import TicketCard from '@/components/TicketCard'

export default {
  components: {
    'ticket-card': TicketCard
  },
  data () {
    return {
      tickets: [
        {
          movieName: '黄金时代',
          hall: 'max巨幕厅',
          price: '30',
          seat: '二排一座',
          time: '2019.5.18',
          posterUrl: 'http://hbimg.b0.upaiyun.com/07b3b8977763bedc8b6b2d3bcdd36defdcb00c1da4e7-WhZGy4_fw658',
          status: '已完成',
          startTime: '20:00:00',
          endTime: '22:00:00'
        },
        {
          movieName: '黄金时代',
          hall: 'max巨幕厅',
          price: '30',
          seat: '二排一座',
          time: '2019.5.18',
          posterUrl: 'http://hbimg.b0.upaiyun.com/07b3b8977763bedc8b6b2d3bcdd36defdcb00c1da4e7-WhZGy4_fw658',
          status: '已完成',
          startTime: '20:00:00',
          endTime: '22:00:00'
        },
        {
          movieName: '黄金时代',
          hall: 'max巨幕厅',
          price: '30',
          seat: '二排一座',
          time: '2019.5.18',
          posterUrl: 'http://hbimg.b0.upaiyun.com/07b3b8977763bedc8b6b2d3bcdd36defdcb00c1da4e7-WhZGy4_fw658',
          status: '已完成',
          startTime: '20:00:00',
          endTime: '22:00:00'
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
