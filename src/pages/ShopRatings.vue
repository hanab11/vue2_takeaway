<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ info.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{ info.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{ info.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">平均送达时间</span>
            <span class="delivery">{{ info.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <!-- 标签选择 -->
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" :class="{ active: selectType === 2 }" @click="setSelectType(2)">
            全部<span class="count">{{ ratings.length }}</span>
          </span>
          <span class="block positive" :class="{ active: selectType === 0 }" @click="setSelectType(0)">
            满意<span class="count">{{ positiveSize }}</span>
          </span>
          <span class="block negative" :class="{ active: selectType === 1 }" @click="setSelectType(1)">
            不满意<span class="count">{{ ratings.length - positiveSize }}</span>
          </span>
        </div>
        <div class="switch" :class="{ on: onlyShowText }" @click="toggleOnlyShowText">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <!-- 动态列表 -->
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24" />
                <span class="delivery" v-if="rating.deliveryTime">约{{ rating.deliveryTime }}分钟</span>
                <span class="delivery" v-else>骑士满意</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{ item }}</span>
              </div>
              <div class="time">
                {{ format(rating.rateTime, formatStr) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapGetters } from 'vuex'
import Star from '../components/Star.vue'
import format from 'date-fns/format'

export default {
  components: { Star },
  data() {
    return {
      onlyShowText: false, // 是否只显示有文本的
      selectType: 2, // 选择的评价类型: 0满意 1不满意 2全部
      formatStr: 'yyyy-MM-dd HH:mm:ss', // date-fns要求写yyyy
    }
  },
  // 因为不同列表多次更新，所以不建议在mounted里请求数据传回调（创建滑动），会有功能性bug：列表共用初始高度
  mounted() {
    this.$store.dispatch('getShopRatings', () => {}) // 只请求数据
  },
  computed: {
    ...mapState(['info', 'ratings']),
    ...mapGetters(['positiveSize']),

    // 动态计算列表数据
    filterRatings() {
      const { ratings, onlyShowText, selectType } = this // 计算属性相关数据

      // 返回新过滤数组
      return ratings.filter((rating) => {
        const { rateType, text } = rating
        /**
         * filter是数组处理方法，也会遍历数组，对遍历项进行条件判断，回调为true的元素组成的数组，作为返回值返回
         *
         * 所有条件是selectType: 0/1/2，rateType: 0/1，onlyShowText: true/false，text: 有值/没值
         * 条件1:
         * 全部数据 || 每个评价的类型 符合 选择的评价类型
         * selectType === 2 || rateType === selectType
         * 条件2：
         * 只展示有文本true，就是text有内容，长度大于0 || 只展示有文本false，就是全展示，应返回true，故取反
         * !onlyShowText || text.length > 0
         *
         * 逻辑或的使用，先设前面为false，才能判断后面逻辑；只要前面为true，直接通过！
         */
        return (
          (selectType === 2 || rateType === selectType) &&
          (!onlyShowText || text.length > 0)
        )
      })
    },
  },
  /**
   * 监视属性在数据改变时机，$nextTick在页面重新渲染时机
   * 把握以上时机，有效针对列表多次更新创建滑动
   */
  watch: {
    filterRatings() {
      // 数据更新后，调用$nextTick
      this.$nextTick(() => {
        // 页面列表更新后，创建滑动实例对象
        new BScroll(this.$refs.ratings, { click: true })
      })
    },
  },
  methods: {
    format, // 只声明函数名即可
    setSelectType(selectType) {
      this.selectType = selectType
    },
    toggleOnlyShowText() {
      this.onlyShowText = !this.onlyShowText
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.ratings {
  /**
   * 不使用betterscroll也可以，可用overflow: scroll，但是会显示原生滑动条，不能定制化
   * 使用flex弹性布局，动态计算列表，布局会自动撑开
   * 不需要计算不同列表高度，注意列表宽度是默认定值，高度是动态的，不用特意设置
   */
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden; // 隐藏原生滑动条
  background: #fff;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .split {
    width: 100%;
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
  }
  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      .top-border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background: #02a774;
          color: #fff;
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          color: blue;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      .bottom-border-1px(rgba(7, 17, 27, 0.1));
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
      }
      .name {
        margin-bottom: 4px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(7, 17, 27);
      }
      .star-wrapper {
        margin-bottom: 6px;
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 6px;
          vertical-align: top;
        }
        .delivery {
          display: inline-block;
          vertical-align: top;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .text {
        margin-bottom: 8px;
        line-height: 18px;
        color: rgb(7, 17, 27);
        font-size: 16px;
      }
      .recommend {
        line-height: 16px;
        font-size: 0;
        .icon-smile,
        .icon-meh,
        .item {
          display: inline-block;
          margin: 0 8px 4px 0;
          font-size: 9px;
        }
        .icon-thumb_up {
          color: #f5a100;
        }
        .icon-thumb_down {
          color: rgb(147, 153, 159);
        }

        .item {
          padding: 0 6px;
          border: 1px solid rgba(7, 17, 27, 0.1);
          border-radius: 1px;
          color: rgb(147, 153, 159);
          background: #fff;
        }
      }
      .time {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
