<template>
  <div class="wrap">
  <div class="coupon">
    <div class="coupon-left">
      <div class="text">
        <div class="name">
          {{ coupon.name }}
        </div>
        <div class="description">
          {{ coupon.description }}
        </div>
      </div>
    </div>
    <div class="coupon-con">
      <div class="text">
        <div class="count">
          {{ info }}
        </div>
        <div class="date">
          {{ usable }}
        </div>
        <div style="text-align:right">
          <router-link :to="'/movieList'">
            <el-link type="info">立即使用</el-link>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { formatDateTime } from '@/utils/format'

export default {
  props: {
    coupon: {
      type: Object,
      required: true
    }
  },
  computed: {
    info: function () {
      return `满${this.coupon.targetAmount}减${this.coupon.discountAmount}`
    },
    usable: function () {
      return `有效日期：${formatDateTime(this.coupon.startTime)}~${formatDateTime(this.coupon.endTime)}`
    }
  }
}
</script>

<style scoped>
.wrap{
  width:600px;
}
.coupon{
  display: inline-block;
  overflow: hidden;
  border-radius:10px;
  z-index: 0;
}
.coupon-left{
  float: left;
  width: 150px;
  height: 150px;
  position: relative;
  z-index: 1;
}
.coupon-left::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  height: 50%;
  background: radial-gradient(circle at right top, transparent 10px, #252525 10px, #F56C6C 10px);
  z-index: 1;
}
.coupon-left::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: radial-gradient(circle at right bottom, transparent 10px, #252525 10px, #F56C6C 10px);
  z-index: 1;
}

.text {
  position: absolute;
  color: white;
  top: 10%;
  left: 10%;
  font-family: "Microsoft YaHei";
  z-index: 11;
}
.name {
  padding-top: 25%;
  font-size: 1.8em;
}
.description {
  color: #F2F6FC;
}
.count {
  padding-top: 10%;
  color: #606266;
  font-size: 2.2em;
}
.date {
  color: #C0C4CC;
}
.coupon-con{
  float: left;
  width: 350px;
  height: 150px;
  position: relative;
  z-index: 1;
}
.coupon-con::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: radial-gradient(circle at left top, transparent 10px, #252525 10px, rgb(254, 240, 240) 10px);
  z-index: 1;
}
.coupon-con::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: radial-gradient(circle at left bottom, transparent 10px, #252525 10px, rgb(254, 240, 240) 10px);
  z-index: 1;
}
</style>
