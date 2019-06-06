<template>
  <div class="page">
    <div class="page-left">
      <div class="context">
        <span>昵称:</span><br><br>
        <span>余额:</span><br><br>
      </div>
      <div style="text-align:center; margin-bottom:10%">
        <el-button>立即续费</el-button>
      </div>
    </div>
    <div class="page-right">
      <div>
        <h1>我的优惠券</h1>
        <el-divider></el-divider>
      </div>
      <div class="inner-main">
        <coupon-card :coupon="coupon"></coupon-card>
      </div>
    </div>
  </div>
</template>

<script>
import Coupon from '@/components/Coupon'
export default {
  components: {
    'coupon-card': Coupon
  },
  data () {
    return {
      coupon: {
        account: '20',
        condition: '50'
      }
    }
  }
}
</script>

<style scoped>
.div{
  display: flex;
}
.page{
  margin:0 2%;
  height:100%;
  display: flex;
}
.page-left{
  margin-top: 10px;
  margin-right: 15px;
  text-align: left;
  background-color:whitesmoke;
  height: 100%;
  width: 20%
}
.page-right{
  width: 80%;
  height: 100%;
  text-align: left;
}
.context{
  margin: 25% 10%;
}
.inner-main{
  padding: 0;
  height:500px;
}
.test{
  height: 400px;
}
</style>
