<template>
  <el-container>
    <el-main style="width: 100%; padding: 0">
      <el-row v-for="(rowSeats, i) in renderSeats" :key="i">
        <el-col :span="4"> {{ `` }}</el-col>
        <el-col
          :span="2"
          v-for="(seat, j) in rowSeats"
          :key="j"
          >
          <div
            @click="handleChooseSeat(i, j)">
            <svg-icon
              :name="'seat'"
              :color="renderSeats[i][j] == 0 ? '#409EFF' : (renderSeats[i][j] == 1 ? '#909399' : '#F56C6C')"
              :fill="true"
              :width="'70%'"
              :height="'70%'"
              >
            </svg-icon>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'SeatCard',
  props: {
    seats: {
      required: true
    }
  },
  computed: {
    renderSeats: function () {
      debugger
      return this.seats
    }
  },
  methods: {
    handleChooseSeat: function (i, j) {
      switch (this.seats[i][j]) {
        case 0:
          this.$set(this.seats[i], j, 2)
          break
        case 1:
          break
        case 2:
          this.$set(this.seats[i], j, 0)
          break
      }
    }
  }
}
</script>
