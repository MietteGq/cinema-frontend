<template>
   <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
      <router-link :to="'/'">
        <el-button type="text" class="button">首页</el-button>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link :to="'/movieList'">
        <el-button type="text" class="movieList">电影</el-button>
      </router-link>
    </el-menu-item>
    <el-menu-item v-if="!login" index="3">
      <router-link :to="'/login'">
        登陆
        <!-- <el-button></el-button> -->
      </router-link>
    </el-menu-item>
    <el-submenu index="3" v-if="login">
      <template slot="title">个人中心</template>
      <el-menu-item index="3-1">
        <router-link :to="'/info/ticket'" :underline="false">
          <el-button type="text">我的订单</el-button>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3-2">
        <router-link :to="'/info/card'" :underline="false">
          <el-button type="text">我的卡包</el-button>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3-3">
        <router-link :to="'/info/consume'" :underline="false">
          <el-button type="text">购买记录</el-button>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3-4" @click="handleLogout">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    login: function () {
      return !!this.$store.state.userId
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleLogout () {
      this.$store.dispatch('logout').then(() => {
        console.log('logout')
        console.log(this.$store.state.userId)
        this.$router.push('/')
      }).catch(() => {
        console.log('failed')
      })
    }
  }
}
</script>
<style>
.el-menu-demo{
  background-color:black;
  margin: 0;
  border: 0;
  width: 100%;
}
</style>
