<template>
  <div>
    <div class="title">
      <br><br><span><i class="el-icon-circle-check"></i>支付成功跳转页面</span><br><br><br>
     </div>
    <span>{{timeout}}秒后自动跳转到我的订单</span><br><br>
    <router-link :to="'/info/ticket'">点击此处查看我的订单</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeout: 5
    }
  },
  created () {
    this.countdown()
  },
  methods: {
    countdown: function () {
      this.timer = window.setInterval(() => {
        if (this.timeout === 0) {
          console.log('time out!')
          window.clearInterval(this.timer)
          this.$router.push({
            path: '/info/ticket'
          })
        }
        this.timeout -= 1
      }, 1000)
    }
  }
}
</script>
<style>
.title{
  font-size: 30px;
  color: green;
}
</style>

