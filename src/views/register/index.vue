<template>
  <div class="page">
    <div class="title">
      <h1> 电影院购票系统</h1>
    </div>
    <div class="main">
      <div class="left">
        <el-image
          style="height: 100%"
          :src="cinemaPic"
          :fit="'fill'"
          >
        </el-image>
      </div>
      <div class="right">
        <h3>账号注册</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <router-link
          :to="{
            path: '/login'
          }">
          <el-link>已有账号？立即登录</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/account'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      cinemaPic: require('@/assets/images/cinema.jpg'),
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(() => {
            this.$router.push('/login')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.page{
  margin: 0 12%;
  height: 500px;
  width: 100%
}
.main{
  display: flex;
}
.left{
  text-align: left;
}
.right{
  padding: 12% 0;
}
.title{
  text-align: left;
}
</style>
