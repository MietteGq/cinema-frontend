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
          prop="name"
          label="电影"
          width="180">
           <template slot-scope="">
              <img  :src="posterUrl" alt="" style="width: 50px;height: 50px">
           </template>
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
      <div>实付款：80</div>
    </el-main>
    <el-footer>
      <router-link :to="'/user/seat/success'">
        <el-button type="simple">确认订单，立即支付</el-button>
      </router-link>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        name: '黄金时代',
        posterUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559564720637&di=76e6c7a1bb8d8d999af4b849c8770713&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fitem%2F201410%2F05%2F20141005110132_WCaNm.thumb.700_0.jpeg',
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
