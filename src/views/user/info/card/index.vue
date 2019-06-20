<template>
  <div  class="page">
    <div :style=backgroundDiv class="page-left">
      <div class="context" v-if="hasVIPCard">
        <i class="el-icon-user-solid"></i><br><br><br>
        <span>会员卡号: {{ vipCard.id }}</span><br><br>
        <span>会员卡余额: {{ balance }}</span><br><br>
        <span>办卡日期: {{ joinDate }}</span><br><br>
      </div>
      <div style="text-align:center; margin-bottom:10%" v-if="hasVIPCard">
        <el-button @click="dialogFormVisible = true" class="button">立即充值</el-button>
      </div>
      <div class="context" v-if="!hasVIPCard">
        <div style="font-size: 1.5em">
          <span style="color: #409EFF">25</span>元/张
        </div>
        <br>
        <span>充值优惠：满100送20</span><br><br>
      </div>
      <div style="text-align:center; margin-bottom:10%" v-if="!hasVIPCard">
        <el-button @click="buyFormVisible = true">立即购买</el-button>
      </div>
    </div>
    <div class="page-right">
      <div>
        <h1>我的优惠券</h1>
        <el-divider></el-divider>
      </div>
      <div class="inner-main" v-if="couponsLoading">
        <el-row v-for="(rowCoupons, i) in formatCoupons" :key="i" style="margin-bottom: 20px">
          <el-col v-for="(coupon, j) in rowCoupons" :key="j" :span="11">
            <coupon-card :coupon="coupon"></coupon-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="会员卡充值" :visible.sync="dialogFormVisible">
      <el-form :model="chargeForm" :rules="chargeRules" ref="chargeForm">
        <el-form-item label="银行卡号" prop="cardNum">
          <el-input v-model="chargeForm.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="cardPassword">
          <el-input v-model="chargeForm.cardPassword" type="password"   autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="充值金额" prop="chargeNum">
          <el-input v-model="chargeForm.chargeNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('chargeForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="会员卡购买" :visible.sync="buyFormVisible">
      <el-form :model="buyForm">
        <el-form-item label="银行卡号">
          <el-input v-model="buyForm.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="buyForm.cardPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBuyForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Coupon from '@/components/Coupon'
import { getVIPCard, addVIPCard, getVIPInfo, chargeVIP, recordCharge } from '@/api/VIPCard'
import { getCoupons } from '@/api/coupon'
import { formatTime } from '@/utils/format'
import { Message } from 'element-ui'

export default {
  components: {
    'coupon-card': Coupon
  },
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('@/assets/images/background.jpg') + ')'
      },
      coupons: [],
      couponsLoading: false,
      hasVIPCard: false,
      userId: null,
      vipCard: null,
      dialogFormVisible: false,
      buyFormVisible: false,
      chargeForm: {
        cardNum: '',
        cardPassword: '',
        chargeNum: null
      },
      buyForm: {
        cardNum: '',
        cardPassword: ''
      },
      chargeRules: {
        cardNum: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ],
        cardPassword: [
          { required: true, message: '请输入银行卡密码', trigger: 'blur' }
        ],
        chargeNum: [
          { required: true, message: '请输入充值金额', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.userId = this.$store.state.userId
    this.getUserVIPCard()
    this.getUserCoupons()
  },
  computed: {
    joinDate: function () {
      return formatTime(this.vipCard.joinDate)
    },
    balance: function () {
      return this.vipCard.balance
    },
    formatCoupons: function () {
      var tmp = []
      for (let i = 0; i < this.coupons.length; ++i) {
        const index = parseInt(i / 2)
        if (index >= tmp.length) {
          tmp.push([])
        }
        tmp[index].push(this.coupons[i])
      }
      return tmp
    }
  },
  methods: {
    getUserVIPCard: function () {
      getVIPCard(this.userId).then(response => {
        const { content: vipCard } = response
        this.vipCard = vipCard
        this.hasVIPCard = true
      }).catch(err => {
        console.log(err)
        getVIPInfo()
      })
    },
    getUserCoupons: function () {
      getCoupons(this.userId).then(response => {
        const { content: coupons } = response
        this.coupons = coupons
        this.couponsLoading = true
      })
    },
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.chargeForm.cardNum === '123123123' && this.chargeForm.cardPassword === '123123') {
            chargeVIP(this.vipCard.id, this.chargeForm.chargeNum).then(response => {
              this.vipCard.balance = parseInt(this.vipCard.balance) + parseInt(this.chargeForm.chargeNum)
              this.dialogFormVisible = false
              this.recordUserCharge(this.chargeForm.chargeNum)
            }).catch(err => console.log(err))
          } else {
            Message({
              message: '银行卡账号或密码错误',
              type: 'error',
              duration: 5000
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    recordUserCharge: function (amount) {
      recordCharge(this.userId, amount).then(
        console.log(`Successfully charge ${amount}`)
      )
    },
    submitBuyForm: function () {
      if (this.buyForm.cardNum === '123123123' && this.buyForm.cardPassword === '123123') {
        addVIPCard(this.userId).then(response => {
          const { content: vipCard } = response
          this.vipCard = vipCard
          this.hasVIPCard = true
          this.buyFormVisible = false
          this.getUserVIPCard()
        }).catch(err => console.log(err))
      } else {
        Message({
          message: '银行卡账号或密码错误',
          type: 'error',
          duration: 5000
        })
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
  margin-left: 10px;
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
  height: 100%;
}
.page{
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0;
  background: no-repeat center top;
  background-size: cover;
}
.el-icon-user-solid{
  font-size: 50px;
}
.button{
  background-color: #3C3C3C;
  color: whitesmoke;
}
</style>
