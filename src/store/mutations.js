/**
 * 包含直接更新state的多个方法的对象mutations
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_SHOP_ID,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
  // 第二个参数是 包含数据的对象
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },

  [RECEIVE_SHOP_ID](state, { shopId }) {
    state.shopId = shopId
  },

  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },

  // 计数count为临时数据，不存储在state里
  [INCREMENT_FOOD_COUNT](state, { food }) {
    if (!food.count) {
      /**
       * 每个food第一次增加计数，需要给count数据绑定（getter、setter）
       * food.count = 1，没有数据绑定
       * Vue.set(对象 属性名 属性值)，让新增属性有数据绑定
       */
      Vue.set(food, 'count', 1)
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state, { food }) {
    if (food.count) {
      // 只有有值才能减
      food.count--
      if (food.count === 0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    // 先清除food中的count
    state.cartFoods.forEach(food => food.count = 0)
    // 移除购物车中所有购物项
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
    state.searchShops = searchShops
  },
}