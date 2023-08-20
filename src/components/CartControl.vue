<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- 事件修饰符stop阻止事件冒泡，防止触发多个组件不同的点击事件 -->
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: { food: Object },
  methods: {
    // 更新food计数，传参isAdd 是否增加
    updateFoodCount(isAdd) {
      this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #02a774;
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.5s;
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    color: rgb(147, 153, 159);
  }
  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #02a774;
  }
}
</style>
