<template>
  <div>
    <!-- food菜单和列表 -->
    <div class="goods">
      <!-- 滑动作用在wrapper容器，效果是滑动列表 -->
      <div class="menu-wrapper">
        <ul>
          <!-- 动态绑定当前样式 -->
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)">
            <span class="text bottom-border-1px"><img class="icon" :src="good.icon" v-if="good.icon" />{{ good.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 滑动作用在wrapper容器，效果是滑动列表 -->
      <div class="foods-wrapper">
        <!-- 双层for，先遍历goods -->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{ good.name }}</h1>
            <!-- 遍历foods -->
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index"
                @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <!-- 购物车控件 -->
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <!-- food详情 -->
    <Food :food="food" ref="food" />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import CartControl from '../components/CartControl.vue'
import Food from '../components/Food.vue'
import ShopCart from '../components/ShopCart.vue'

export default {
  components: {
    CartControl,
    Food,
    ShopCart,
  },
  data() {
    return {
      scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
      tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
      food: {}, // 需要显示的food
    }
  },
  mounted() {
    // 前提没有数据，想异步请求时，dispatch可传callback
    this.$store.dispatch('getShopGoods', () => {
      // 数据更新后执行
      this.$nextTick(() => {
        // 列表更新后，才能创建滑动、收集top值
        this._initScroll()
        this._initTops()
      })
    })
  },
  // 初始和相关数据发生了变化时，执行计算属性
  computed: {
    ...mapState(['goods']),

    // 计算当前分类的下标
    currentIndex() {
      const { scrollY, tops } = this // 条件数据
      // 根据条件计算，用到findIndex，回调结果如果true，返回符合回调函数条件的下标index
      const index = tops.findIndex((top, index) => {
        // top是当前元素值，scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1] // true or false
      })
      return index // 返回下标
    },
  },
  methods: {
    // 初始化滑动，加_ 和事件函数区别
    _initScroll() {
      new BScroll('.menu-wrapper', { click: true })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2, // 0无事件 1滑动一定时间才触发（滑动浏览业务） 2实时，惯性滑动不触发 3实时，惯性滑动触发
        click: true,
      })

      // 给右侧列表绑定scroll监听，官方文档可查滑动事件、传入参数
      this.foodsScroll.on('scroll', ({ x, y }) => {
        console.log(x, y) // 实时打印滑动坐标
        this.scrollY = Math.abs(y) // 绝对值
      })
      // 给右侧列表绑定scroll结束的监听，给惯性滑动最终的位置定位
      this.foodsScroll.on('scrollEnd', ({ x, y }) => {
        console.log('scrollEnd', x, y)
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops数组
    _initTops() {
      // 1. 准备数据
      const tops = []
      let top = 0
      tops.push(top)
      // 2. 收集数据，先找到指定列表的列表元素lis
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      /**
       * Array.prototype.slice.call(x)能将具有length属性的对象转成数组，可使用数组方法foreach
       * call(x)修改函数调用时this的指向，其余参数作为原函数的参数
       */
      Array.prototype.slice.call(lis).forEach((li) => {
        top += li.clientHeight // 每个列表元素li的客户端高度
        tops.push(top)
      })
      // 3. 更新数据
      this.tops = tops
      console.log(tops)
    },
    // 滑到指定位置，用函数型滑动scrollTo
    clickMenuItem(index) {
      const scrollY = this.tops[index] // 用传入的index去tops取目标位置的scrollY
      // 样式依赖scrollY，立刻更新样式（让点击的分类项成为当前分类）
      this.scrollY = scrollY
      // 函数滑动右侧列表
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },
    // 显示点击的food
    showFood(food) {
      this.food = food // 保存传入的food
      // 显示food组件（用ref在父组件中调用子组件的方法）
      this.$refs.food.toggleShow()
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: #02a774;
        font-weight: 700;
      }
      .text {
        border: none;
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        .bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .bottom-border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        border: none;
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        // 默认水平排列，注意 外层div的样式 不要和 组件内div的样式 重名，可能会发生纵向排列bug
        .cartcontrol-wrapper {
          position: absolute;
          //justify-content: flex-end;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>

