<template>
  <el-card class="box-card">
  <div slot="header">
    <span>优惠券￥</span>
    <span style="font-size:50px;font-family: Verdana">{{coupon.account}}</span>
  </div>
  <div>
    <span style="font-size:13px;font-family: MingLiU">单笔实付款满 {{coupon.condition}} 使用</span>
  </div>
</el-card>
</template>

<script>
export default {
  props: {
    coupon: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
*{
  color: white;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .box-card {
    width: 200px;
    background-color:darkred;
  }
</style>
