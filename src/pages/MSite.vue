<template>
  <section class="msite">
    <!-- 首页头部 -->
    <HeaderTop :title="address.name || '为 你 推 荐'">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-search"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else><i class="iconfont icon-person"></i></span>
      </router-link>
    </HeaderTop>
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!-- 首页分类导航 -->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <!-- 滑块wrapper -->
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl + category.image_url" />
                  </div>
                  <span>{{ category.title }}</span>
                </a>
              </div>
            </div>
            <!-- 分页器Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <!-- 原型占位 -->
          <img src="../assets/images/msite_back.svg" alt="back" v-else />
        </nav>
        <!-- 首页附近商家 -->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <!-- 商家列表 -->
          <ShopList />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import HeaderTop from '../components/HeaderTop.vue'
import ShopList from '../components/ShopList.vue'

export default {
  components: {
    HeaderTop,
    ShopList,
  },
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com',
    }
  },
  mounted() {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  computed: {
    ...mapState(['address', 'categorys', 'shops', 'userInfo']),

    /**
     * 请求到的categorys是个一维数组
     * 根据UI原型设计，（计算）加工二维数组，小数组中的元素个数最大是8个
     */
    categorysArr() {
      const { categorys } = this // 解构赋值
      const arr = [] // 准备空的二维数组
      let minArr = [] // 准备首个小数组（最大长度为8）
      // 遍历categorys
      categorys.forEach((category) => {
        // 如果当前小数组已经满了, 创建一个新的（let块作用域自动创建）
        if (minArr.length === 8) minArr = []
        // 如果minArr是空的, 将小数组保存到大数组中
        if (minArr.length === 0) arr.push(minArr)

        /**
         * 数组的push是浅拷贝，arr[0]保存的是minArr数组的地址，minArr变化arr[0]随之变化
         * 所以不用担心把空数组推进arr
         * 实际情况minArr从空数组状态逐渐变成8个元素的数组，存在arr[0]里
         */
        console.log(arr[0]) // [[]]、[[1]]、[[1, 2]]...
        // 将当前分类保存到小数组中
        minArr.push(category)
      })

      return arr
    },
  },
  watch: {
    categorys() {
      /**
       * categorys读到数据了，在界面异步更新之前
       * 使用setTimeout可实现效果，但不稳定
       * 使用$nextTick，界面更新后执行（nextTick写在数据更新的时机）
       */
      this.$nextTick(() => {
        // 界面更新后，创建Swiper实例对象，实现轮播
        new Swiper('.swiper-container', {
          loop: true, // 循环轮播
          // 配置分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    },
    /**
     * 注意categorys、shops都要异步请求数据，而且速度很可能不同
     * 所以创建滑动和创建轮播时机不同，应该分开监视
     */
    shops() {
      this.$nextTick(() => {
        // 界面更新后，创建滑动实例对象
        new BScroll('.miste-content-wrapper', {
          click: true,
        })
      })
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.msite {
  width: 100%;
  .miste-content-wrapper {
    position: fixed;
    top: 45px;
    bottom: 46px;
    width: 100%;
  }
  .msite_nav {
    .bottom-border-1px(#e4e4e4);
    margin-top: 10px;
    height: 200px;
    background: #fff;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          .link_to_food {
            width: 25%;
            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;
              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }
            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }
      .swiper-pagination {
        > span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
  .msite_shop_list {
    .top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;
    .shop_header {
      padding: 10px 10px 0;
      .shop_icon {
        margin-left: 5px;
        color: #999;
      }
      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>