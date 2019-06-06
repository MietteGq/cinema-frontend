<template>
  <div class="box">
    <div :style=backgroundDiv class="image">
      <div class="text">
        <el-container>
          <el-header>
            <h1 style="text-align: left">{{ movie.name }}</h1>
            <el-divider></el-divider>
          </el-header>
          <el-main class="info">
            <el-container>
              <el-aside :width="'250px'">
                <el-image
                style="height: 280px"
                :src="movie.posterUrl"
                fit="fill"
                class="posterimage"></el-image>
              </el-aside>
              <el-main class="textform">
                <br>
                <span>导演：{{ movie.director }}</span>
                <br><br>
                <span>编剧：{{ movie.screenWriter }}</span>
                <br><br>
                <span>主演：{{ movie.starring }}</span>
                <br><br>
                <span>类型：{{ movie.type }}</span>
                <br><br>
                <span>制片国家/地区：{{ movie.country }}</span>
                <br><br>
                <span>片长：{{ movie.length }}</span>
                <br><br>
                <span>剧情简介：{{ movie.description }}</span>
                <br><br>
              </el-main>
            </el-container>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    backgroundDiv: function () {
      return {
        backgroundImage: `url(${this.movie.posterUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
* {
  color: white;
}
.box{
  width:100%;
  height:400px;
  position: relative;
  padding:0px;
  display: flex;
  justify-content: center;
  box-sizing:border-box;
  overflow: hidden;
}
.image{
  position: absolute;
  width:150%;
  height:150%;
  box-sizing: border-box;
  z-index: 1;
}
.posterimage{
  margin: 20px;
}

.image:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: -10%;
  background: inherit;
  filter: blur(20px);
  z-index: 2;
}

.text{
  position: relative;
  z-index: 11;
}

.el-header {
  position: relative;
  width: 100%;
  padding: 0 36% 0 26%
}

.info {
  position: relative;
  width: 100%;
  padding: 0 25%
}
.textform{
  font-size: 12px;
  text-align: left;
  padding-right: 22%;
}
</style>
