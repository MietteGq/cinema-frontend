<template>
  <el-container direction="vertical" >
    <el-header>
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="选座" ></el-step>
        <el-step title="确认订单，支付" ></el-step>
        <el-step title="支付成功" ></el-step>
      </el-steps>
    </el-header>
    <el-main>
      <router-view :key="key" />
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      scheduleId: null,
      movieId: null
    }
  },
  computed: {
    key () {
      return this.$route.fullPath
    },
    active () {
      if (this.$route.path === '/user/seat/choice') {
        return 1
      } else if (this.$route.path === '/user/seat/payment') {
        return 2
      } else {
        return 3
      }
    }
  },
  created () {
    this.scheduleId = this.$route.query.scheduleId
    this.movieId = this.$route.query.movieId
  }
}
</script>

<style scoped>
</style>
