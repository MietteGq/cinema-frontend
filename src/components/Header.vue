<template>
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
      <router-link :to="'/'">
        <el-button type="text" class="button">首页</el-button>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">电影</el-menu-item>
    <el-menu-item index="4">
      <router-link :to="'/login'">
        登陆
        <!-- <el-button></el-button> -->
      </router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '2'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
