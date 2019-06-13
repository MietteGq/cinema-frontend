<template>
<div class="page">
 <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="消费记录">
      <div class="content">
        <el-table
          :data="formatConsumeRecords"
          style="width: 100%">
          <el-table-column
            prop="type"
            label="消费类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="消费额度"
            width="180">
          </el-table-column>
          <el-table-column
            prop="content"
            label="消费内容">
          </el-table-column>
          <el-table-column
            prop="time"
            label="消费时间">
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="充值记录">
       <div class="content">
        <el-table
          :data="formatChargeRecords"
          style="width: 100%">
          <el-table-column
            prop="amount"
            label="充值额度"
            width="500">
          </el-table-column>
          <el-table-column
            prop="time"
            label="充值时间"
            width="360">
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { getConsume } from '@/api/ticket'
import { formatTime } from '@/utils/format'

export default {
  name: 'Consume',
  data () {
    return {
      userId: null,
      consumeRecords: []
    }
  },
  computed: {
    formatConsumeRecords: function () {
      return this.consumeRecords.map(x => {
        x.type = x.type === '1' ? '会员卡' : '银行卡'
        x.content = `购买了${x.content}的电影票`
        x.time = formatTime(x.time)
        return x
      })
    }
  },
  created () {
    this.userId = this.$store.state.userId
    this.getUserConsume()
  },
  methods: {
    getUserConsume: function () {
      getConsume(this.userId).then(res => {
        const { content: consumeRecords } = res
        this.consumeRecords = consumeRecords
      })
    }
  }
}
</script>

<style scoped>
.content {
  margin: 2% 10%;
}
.page{
  margin: 0 12%;

}
</style>
