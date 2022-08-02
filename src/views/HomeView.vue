<template>
  <div class="" @click="get">1111</div>
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
      apiAddress().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
