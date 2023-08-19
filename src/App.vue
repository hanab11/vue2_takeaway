<template>
  <div class="app">
    <!-- 已经有默认的路由，可直接写routerview -->
    <router-view></router-view>
    <!-- 根据路由器配置显示底部导航 -->
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGuide from './components/FooterGuide.vue'

export default {
  name: 'App',
  components: { FooterGuide },
  mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo']),
  },
}
</script>

<style lang="less">
* {
  touch-action: manipulation;
}
.app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
}
</style>