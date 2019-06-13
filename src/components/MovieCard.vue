<template>
  <el-card :body-style="{ padding: '0px', height: '100%' }">
    <el-image
      style="height: 80%"
      :src="movie.posterUrl"
      fit="fill"
      class="image"></el-image>
    <div class="bottom" style="height:20%">
      <router-link
        :to="{
          path: '/user/moviedetail',
          query: {
            movieId: movie.id
          }
        }">
        <el-button type="text" class="button" @click.native.prevent="handleClick">购票</el-button>
      </router-link>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleClick: function () {
      if (!this.$store.state.userId) {
        this.$router.push('/login')
      } else {
        this.$router.push({
          path: '/user/movieDetail',
          query: {
            movieId: this.movie.id
          }
        })
      }
    }
  }
}
</script>

<style scoped>

.image {
  width: 100%;
  display: block;
}
</style>
