<template>
  <el-card shadow="hover" :body-style="{ padding: '0px', height: '100%' }">
    <div class="header">
      <div class="id">id:{{ comment.userId }}</div>
      <div class="rate">
        <el-rate
          v-model="comment.mark"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </div>
    </div>
    <div class="description">{{ comment.comment }}</div>
  </el-card>
</template>

<script>
export default {
  name: 'CommentCard',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    btnType: function () {
      console.log('type change' + this.isLike)
      return this.isLike ? 'warning' : 'text'
    }
  },
  methods: {
    onCollection: function () {
      this.isLike = !this.isLike
      // TODO: 更新后台
    }
  }
}
</script>

<style scoped>
  .el-card {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .note-card {
    height: 100%;
  }
  .description {
    text-align: left;
    height: 80%;
    font-size: 14px;
    color: #666
  }
  .header{
    text-align: left;
    height: 20%;
    display: flex;
    margin-bottom: 10px;
  }
  .id{
    width: 40%;
    text-align: left;
    margin: 0;
  }
  .rate{
    margin: 0;
    width: 60%;
    margin: 0;
    text-align: right;
  }
</style>
