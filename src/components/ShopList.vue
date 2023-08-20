<template>
  <div class="shop_container">
    <!-- 商家列表 -->
    <ul class="shop_list" v-if="shops.length">
      <!-- 如果想要点击跳转对应路由，依赖每个shop唯一标识id -->
      <li class="shop_li border-1px" v-for="(shop, index) in shops" :key="index" @click="goToShop(shop.id)">
        <a>
          <!-- 自建图床、上传图片、拆分url，在后端接口里修改 -->
          <div class="shop_left">
            <img class="shop_img" :src="baseImgUrl + shop.image_path" />
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
              <!-- 遍历活动小图标 -->
              <ul class="shop_detail_ul">
                <li class="supports" v-for="(support, index) in shop.supports" :key="index">
                  {{ support.icon_name }}
                </li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="rating_section">
                  {{ shop.rating }}<span>&nbsp;</span>
                </div>
                <!-- 星星组件 -->
                <Star :score="shop.rating" :size="24" />
                <div class="order_section">
                  月售{{ shop.recent_order_num }}单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">
                  {{ shop.delivery_mode.text }}
                </span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>起送¥{{ shop.float_minimum_order_amount }}</span>
                <span>&nbsp;</span>
                <span v-if="shop.float_delivery_fee">配送费约¥{{ shop.float_delivery_fee }}</span>
                <span class="delivery_free" v-else>免配送费</span>
              </p>
            </section>
          </div>
        </a>
      </li>
      <!-- 防遮挡占位使用css的fixed吸顶、吸底来处理 -->
    </ul>
    <!-- 原型占位 -->
    <ul v-else>
      <li v-for="item in 8">
        <img src="../assets/images/shop_back.svg" alt="back" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Star from './Star.vue'

export default {
  components: { Star },
  data() {
    return {
      baseImgUrl: 'https://i.postimg.cc/',
    }
  },
  computed: {
    ...mapState(['shops']),
  },
  methods: {
    goToShop(id) {
      this.$store.dispatch('recordShopId', id) // 同步保存id到vuex的state
      this.$router.push('/shop') // 编程式路由push
    },
  },
}
</script>

<style lang="less" >
@import '../assets/less/mixins.less';

.shop_container {
  margin-bottom: 50px;
  .shop_list {
    .shop_li {
      .bottom-border-1px(#f1f1f1);
      width: 100%;
      > a {
        .clearFix();
        display: block;
        box-sizing: border-box;
        padding: 15px 8px;
        width: 100%;
        .shop_left {
          float: left;
          box-sizing: border-box;
          width: 23%;
          height: 75px;
          padding-right: 10px;
          .shop_img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .shop_right {
          float: right;
          width: 77%;
          .shop_detail_header {
            .clearFix();
            width: 100%;
            .shop_title {
              float: left;
              width: 200px;
              color: #333;
              font-size: 16px;
              line-height: 16px;
              font-weight: 700;
              &::before {
                content: '品牌';
                display: inline-block;
                font-size: 11px;
                line-height: 11px;
                color: #333;
                background-color: #ffd930;
                padding: 2px 2px;
                border-radius: 2px;
                margin-right: 5px;
              }
            }
            .shop_detail_ul {
              float: right;
              margin-top: 3px;
              .supports {
                float: left;
                font-size: 10px;
                color: #999;
                border: 1px solid #f1f1f1;
                padding: 0 2px;
                border-radius: 2px;
              }
            }
          }
          .shop_rating_order {
            .clearFix();
            width: 100%;
            margin-top: 18px;
            margin-bottom: 8px;
            .shop_rating_order_left {
              float: left;
              color: #ff9a0d;
              .rating_section {
                float: left;
                font-size: 10px;
                color: #ff6000;
                margin-left: 4px;
              }
              .order_section {
                float: left;
                font-size: 10px;
                color: #666;
                transform: scale(0.8);
              }
            }
            .shop_rating_order_right {
              float: right;
              font-size: 0;
              .delivery_style {
                transform-origin: 35px 0;
                transform: scale(0.7);
                display: inline-block;
                font-size: 12px;
                padding: 1px;
                border-radius: 2px;
              }
              .delivery_left {
                color: #fff;
                margin-right: -10px;
                background-color: #02a774;
                border: 1px solid #02a774;
              }
              .delivery_right {
                color: #02a774;
                border: 1px solid #02a774;
              }
            }
          }
          .shop_distance {
            .clearFix();
            width: 100%;
            font-size: 12px;
            .shop_delivery_msg {
              float: left;
              transform-origin: 0;
              transform: scale(0.9);
              color: #666;
              .segmentation {
                color: #ccc;
              }
              .delivery_free {
                color: #ff8000;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
</style>