<template>
  <el-container width="100%">
    <el-header :height="'100%'" width="100%">
      <movie-info :movie="movie"></movie-info>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
        prop="date"
        label="放映时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="hall"
        label="放映厅"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="票价">
      </el-table-column>
      <el-table-column
        label="选座购票">
        <router-link
          :to="{
            path: '/user/seat',
            query: {
              scheduleId: 1,
              movieId: 2
            }
          }"
          >
          <el-button type="primary">选座购票</el-button>
        </router-link>
      </el-table-column>
    </el-table>
    </el-main>
  </el-container>
</template>

<script>
import MovieInformation from '@/components/MovieInformation'

export default {
  components: {
    'movie-info': MovieInformation
  },
  data () {
    return {
      movie: {
        posterUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559657690865&di=5f35551fcf9a0b16d945f0e50a6b9871&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01047758a40e56a801219c77d5b634.png%402o.png',
        name: '黄金时代',
        director: '许鞍华',
        actors: '汤唯，冯绍峰，王志文，朱亚文，黄轩，郝蕾，袁泉',
        type: '剧情，爱情，传记',
        length: '120分钟',
        country: '中国',
        description: '影片以民国时代为大背景，以民国传奇女作家萧红特立独行的人生以及爱情经历为引子，塑造当年一群意气风发的热血青年，还原了一个充满自由理想、海阔天空的时代。'
      },
      tableData: [{
        date: '2016-05-02',
        hall: 'A1',
        price: '35'
      }, {
        date: '2016-05-04',
        hall: 'A2',
        price: '40'
      }, {
        date: '2016-05-01',
        hall: 'B1',
        price: '40'
      }, {
        date: '2016-05-03',
        hall: 'B2',
        price: '45'
      }],
      movieId: null,
      userId: null
    }
  },
  created () {
    this.movieId = this.$route.query.movieId
    this.userId = 1
  }
}
</script>

<style scoped>
.el-main {
  margin: 0 12%;
}
.info{
  margin: 0 12%;
  width: 400px;
}
</style>
