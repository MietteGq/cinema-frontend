<template>
  <el-card :body-style="{ padding: '0px', height: '290px' }">
    <el-image
      style="height: 250px"
      :src="movie.posterUrl"
      fit="fill"
      class="image"></el-image>
    <div class="bottom">
      <router-link
        :to="{
          path: '/user/moviedetail',
          query: {
            movieId: movie.id
          }
        }"
        >
        <el-button type="text" class="button">购票</el-button>
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
  }
}
</script>

<style scoped>

.image {
  width: 100%;
  display: block;
}
</style>
