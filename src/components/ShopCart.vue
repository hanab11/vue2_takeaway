<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <!-- 购物车外层 -->
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight: totalCount }">
              <i class="iconfont icon-shopping_cart" :class="{ highlight: totalCount }"></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{ highlight: totalCount }">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <!-- 支付按钮样式、支付内容 -->
        <div class="content-right">
          <div class="pay" :class="payClass">{{ payText }}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <!-- 购物车列表 -->
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <!-- 对列表每个元素配上购物车控件 -->
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- 列表遮罩 -->
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import BScroll from 'better-scroll'
import { mapState, mapGetters } from 'vuex'
import CartControl from './CartControl.vue'

export default {
  components: { CartControl },
  data() {
    return {
      isShow: false, // 是否展示，用于计算列表是否展示
    }
  },
  computed: {
    ...mapState(['cartFoods', 'info']),
    ...mapGetters(['totalCount', 'totalPrice']),

    payClass() {
      const { totalPrice } = this
      const { minPrice } = this.info // 准备数据

      return totalPrice >= minPrice ? 'enough' : 'not-enough'
    },
    payText() {
      const { totalPrice } = this
      const { minPrice } = this.info // 准备数据

      if (totalPrice === 0) return `￥${minPrice}元起送`
      else if (totalPrice < minPrice)
        return `还差￥${minPrice - totalPrice}元起送`
      else return '结算'
    },
    // 计算属性的简写一般是只读，想要写得用完整写法，注意读写是分开的
    listShow: {
      /**
       * 购物车显示隐藏
       * 根据toggleShow（isShow会被修改）
       * 还有totalCount减为0的特殊情况（isShow未更改，还是true）
       * 一个属性随着另一个属性，要及时变化，要想到监视属性
       */
      // 读计算属性
      get() {
        return this.isShow // isShow会动态变化，依赖监视属性
      },
      // 写计算属性
      set() {
        // 滑动刷新的前提：只有一个列表，动态的加减数据（不能和多列表，创建滑动混淆）
        if (this.isShow) {
          this.$nextTick(() => {
            // 页面更新后创建滑动，只需要创建单例滑动（防止生成多个滑动列表）
            if (!this.scroll) {
              this.scroll = new BScroll('.list-content', { click: true })
            } else {
              this.scroll.refresh() // 让滑动条刷新一下，重新统计内容的高度（判断是否需要滑动条）
            }
          })
        }
      },
    },
  },
  watch: {
    // 动态改变isShow
    totalCount() {
      if (this.totalCount === 0) this.isShow = false
    },
  },
  methods: {
    toggleShow() {
      // 只有当总数量大于0时切换
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
      // 切换后有购物车列表，此时修改计算属性，目的就是创建滑动 或者 refresh滑动
      this.listShow = false
    },
    clearCart() {
      MessageBox.confirm('确定清空购物车吗？').then(
        (action) => {
          this.$store.dispatch('clearCart')
          console.log('确定清空购物车', action)
        },
        () => {
          console.log('取消清空购物车')
        }
      )
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.highlight {
            background: #02a774;
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #02a774;
          transition: all 0.4s linear;
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%); // 动画：向上移动100%自身高度
    &.move-enter-active,
    &.move-leave-active {
      transition: transform 0.3s;
    }
    &.move-enter,
    &.move-leave-to {
      transform: translateY(0); // 起始高度就是0
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .bottom-border-1px(rgba(7, 17, 27, 0.1));
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>