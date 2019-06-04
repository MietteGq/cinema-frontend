<template>
  <el-container>
    <el-head>

    </el-head>
    <el-main>
       <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="电影"
          width="180">
            <el-image
              style="height: 100%; width: 100%"
              :src="tableData.posterUrl"
              fit="fill"
              class="posterimage"></el-image>
        </el-table-column>
        <el-table-column
          prop="schedule"
          label="场次"
          width="180">
        </el-table-column>
        <el-table-column
          prop="seat"
          label="票数/座位">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总价">
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top:10px;margin-right:20px">实付款：80</div>
    </el-main>
    <el-footer  style="text-align: right">
        <el-button type="simple">确认订单，立即支付</el-button>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        name: '黄金时代',
        posterUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559657690865&di=5f35551fcf9a0b16d945f0e50a6b9871&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01047758a40e56a801219c77d5b634.png%402o.png',
        schedule: '1号厅06月05日 20:00场',
        seat: '2',
        price: '40',
        total: '80'
      }]
    }
  }
}
</script>

script
<style scoped>
.el-container {
  margin: 0 12%;
}
</style>
