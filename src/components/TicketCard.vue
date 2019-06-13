<template>
  <el-card class="box-card" :body-style="{ padding: '0' }">
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="text">
            订单号：{{ticket.ticketId}}
          </el-button>
        </el-col>
        <el-col :span="4" :offset="17">
          <el-button-group style="padding-left: 10px" v-if="ticket.status==='已完成'">
            <el-button type="text" icon="el-icon-edit" @click="dialogVisible = true" style="margin-right: 20px"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleReturnTicket()"></el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <el-row class="main">
        <el-col :span="4">
          <el-image
          style="height: 150px"
          :src="ticket.posterUrl"
          fit="fill"
          class="image"></el-image>
        </el-col>
        <el-col :span="12" style="height: 100%">
          <div class="movie-info">
            <h2 style="color: black">{{ ticket.movieName }}</h2>
            <span >{{ ticket.seat }}</span>
            <br>
            <span>{{ ticket.time }}</span>
            <br>
            <span>{{ticket.hall}}</span>
            <br>
            <br>
            <span style="color: sliver">放映时间{{ticket.startTime}}~{{ticket.endTime}}</span>
          </div>
        </el-col>
        <el-col :span="4" style="height: 100%; padding: 10% 0">
          ￥{{ticket.price}}
        </el-col>
        <el-col :span="4" style="height: 100%; padding: 10% 0">
          {{ticket.status}}
        </el-col>
      </el-row>
      <el-dialog
        title="写评论"
        :visible.sync="dialogVisible"
        width="40%"
        >
        <div style="text-align:left">
          <div class="block">
            <span class="demonstration">评分
              <el-rate
              v-model="form.mark"
              :colors="colors">
            </el-rate></span>
          </div>
          <el-form ref="form" :model="form" label-width="50px">
            <el-form-item label="内容" height="100px">
              <el-input type="textarea" v-model="form.comment"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="postTicketComment()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</el-card>

</template>

<script>
import { ticketComment, ticketReturn } from '@/api/ticket'

export default {
  name: 'TicketCard',
  props: {
    ticket: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dialogVisible: false,
      form: {
        mark: 0,
        comment: ''
      }
    }
  },
  methods: {
    postTicketComment: function () {
      ticketComment({
        mark: this.form.mark,
        ticketId: this.ticket.ticketId,
        comment: this.form.comment
      }).then(response => {
        this.$message('评论成功')
        this.dialogVisible = false
      }).catch(err => console.log(err))
    },
    handleReturnTicket: function () {
      ticketReturn(this.ticket.ticketId).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.head{
  background-color:whitesmoke;
  padding: 0;
  height: 53px;
  width: 100%;
}
.main{
  width: 100%;
  height: 200px;
}
.box-card {
  width: 882px;
  height: 100%;
}
.main{
  width: 100%;
}
.image{
  margin: 20px;
}
.context{
  margin: 40px;
}
.movie-info {
  text-align: left;
  color: grey;
}
</style>
