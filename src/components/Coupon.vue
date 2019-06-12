<template>
  <div class="wrap">
  <div class="coupon">
    <div class="coupon-left"></div>
    <div class="coupon-con"></div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    coupon: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.wrap{
  width:600px;
}
.coupon{
  display:inline-block;
  overflow:hidden;
  border-radius:10px;
}
.coupon-left{
  float:left;
  width:150px;
  height:150px;
  position:relative;
}
.coupon-left::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  height:50%;
  background:radial-gradient(circle at right top, transparent 10px, #252525 10px, #252525 10px)
}
.coupon-left::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right:0;
  height:50%;
  background:radial-gradient(circle at right bottom, transparent 10px, #252525 10px, #252525 10px)
}
.coupon-con{
  float:left;
  width:350px;
  height:150px;
  position:relative;
}
.coupon-con::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  height:50%;
  background:radial-gradient(circle at left top, transparent 10px, #252525 10px, #fff 10px)
}
.coupon-con::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right:0;
  height:50%;
  background:radial-gradient(circle at left bottom, transparent 10px, #252525 10px, #fff 10px)
}
</style>
