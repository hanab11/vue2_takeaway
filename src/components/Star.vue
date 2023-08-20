<template>
  <!-- 标签可定义多个样式，动态绑定样式 -->
  <div class="star" :class="'star-' + size">
    <!-- 遍历样式数组，对每个星星动态绑定样式 -->
    <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
// 类名常量
const CLASS_ON = 'on' // 全星
const CLASS_HALF = 'half' // 半星
const CLASS_OFF = 'off' // 空星

export default {
  // props对象用法（接收并限制类型），在父组件中使用:动态绑定，传递数据
  props: {
    score: Number,
    size: Number,
  },
  computed: {
    /**
     * 根据分数，（计算）加工样式数组，星星都一样，但样式不同
     * 星星样式只有全、半、空星，不满0.5向下取整，不满1向0.5取整，也就是0.2 = 空星
     * 3.2 = 3 + 0 + 2
     * 3.6 = 3 + 1 + 1
     */
    starClasses() {
      const { score } = this // 准备数据
      const scs = [] // 准备空数组（最大长度为5）
      // 添加n个全星样式
      const scoreInteger = Math.floor(score) // Math.floor向下取整
      for (let i = 0; i < scoreInteger; i++) scs.push(CLASS_ON)
      // 添加0/1个半星样式
      if (score * 10 - scoreInteger * 10 >= 5) scs.push(CLASS_HALF) // 把小数*10变整数，比较精准
      // 添加n个空星样式
      while (scs.length < 5) scs.push(CLASS_OFF) // 剩下的全是空星

      return scs
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.star {
  // 2x图 3x图
  float: left;
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('../assets/images/star/star48_on');
      }
      &.half {
        .bg-image('../assets/images/star/star48_half');
      }
      &.off {
        .bg-image('../assets/images/star/star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('../assets/images/star/star36_on');
      }
      &.half {
        .bg-image('../assets/images/star/star36_half');
      }
      &.off {
        .bg-image('../assets/images/star/star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('../assets/images/star/star24_on');
      }
      &.half {
        .bg-image('../assets/images/star/star24_half');
      }
      &.off {
        .bg-image('../assets/images/star/star24_off');
      }
    }
  }
}
</style>