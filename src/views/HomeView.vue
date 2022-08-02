<template>
  <div class="home" @click="get">
    <span class="me">我是</span>
    <span class="you">你是</span>
  </div>
</template>

<script>
import { apiAddress } from '@/api/api'
export default {
  data() {
    return {}
  },
  components: {},
  methods: {
    get() {
      apiAddress()
        .then((res) => {
          console.log(res)
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
.home {
  color: @green;
  transform: translateY(30px);
  .me {
    font-size: 20px;
  }
}
</style>
