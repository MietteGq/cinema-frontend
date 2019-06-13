<template>
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
</template>

<script>
import { record } from '@/api/VIPCard'
import { formatTime } from '@/utils/format'

export default {
  name: 'Charge',
  data () {
    return {
      userId: null,
      chargeRecords: []
    }
  },
  computed: {
    formatChargeRecords: function () {
      return this.chargeRecords.map(x => {
        x.time = formatTime(x.time)
        return x
      })
    }
  },
  created () {
    this.userId = this.$store.state.userId
    this.getChargeRecords()
  },
  methods: {
    getChargeRecords: function () {
      record(this.userId).then(res => {
        const { content: records } = res
        this.chargeRecords = records
      })
    }
  }
}
</script>

<style scoped>
.content {
  margin: 2% 10%;
}
</style>
