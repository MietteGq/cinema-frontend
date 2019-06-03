<template>
  <el-container width="100%">
    <el-header :height="'100%'" width="100%">
     <div class="box">
       <div :style=backgroundDiv class="image">
         <div class="text">
            mingzi
         </div>
       </div>
     </div>
    </el-header>
    <el-main>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('@/assets/images/p1.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style>
.box{
  width:100%;
  height:400px;
  position: relative;
  padding:0px;
  display: flex;
  justify-content: center;
  box-sizing:border-box;
  overflow: hidden;
}
.image{
  position: absolute;
  width:150%;
  height:150%;
  filter: blur(20px);
  z-index: -1;
}
.text{
  position: relative;
  z-index: 1;
}
</style>
