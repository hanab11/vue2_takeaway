<template>
  <div class="footer_guide">
    <!-- :绑定class时，思考是否用对象语法 {类名确定:布尔值不确定有还是没有} -->
    <span
      class="guide_item"
      :class="{ on: '/msite' === $route.path }"
      @click="goTo('/msite')"
    >
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/search' === $route.path }"
      @click="goTo('/search')"
    >
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/order' === $route.path }"
      @click="goTo('/order')"
    >
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{ on: '/profile' === $route.path }"
      @click="goTo('/profile')"
    >
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'FooterGuide',
  methods: {
    //编程式路由push、repalce目的是代替router_link to，push和replace参数传入to的对象
    goTo(path) {
      this.$router.replace(path) //replace不带历史记录跳转路由
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.footer_guide {
  .top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;
    &.on {
      color: #02a774;
    }
    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;
      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>