<template>
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
      <router-link :to="'/'">
        <el-button type="text" class="button">首页</el-button>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link :to="'movieList'">
        <el-button type="text" class="movieList">电影</el-button>
      </router-link>
    </el-menu-item>
    <el-menu-item v-if="!login" index="3">
      <router-link :to="'/login'">
        登陆
        <!-- <el-button></el-button> -->
      </router-link>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">个人中心</template>
      <el-menu-item index="3-1">
        <router-link :to="'/info/ticket'">我的订单</router-link>
      </el-menu-item>
      <el-menu-item index="3-2">我的收藏</el-menu-item>
      <el-menu-item index="3-3">基本信息</el-menu-item>
      <el-menu-item index="3-4">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '2',
      login: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
