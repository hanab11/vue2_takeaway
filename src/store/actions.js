/**
 * 包含通过mutation间接更新state的多个方法的对象actions
 * actions里的大多数方法是异步，向API服务器请求数据；也可写同步
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_SHOP_ID,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo,
  reqSearchShop
} from '../api'

export default {
  // 异步获取地址
  async getAddress({ commit, state }) { // getXxx第一参数一般写context对象
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 根据result提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address }) // commit第二参数要符合mutation方法的要求：包含数据的对象
    }
  },

  // 异步获取食品分类列表
  async getCategorys({ commit }) { // context对象里只要commit属性于是就加{}，更好理解
    const result = await reqFoodCategorys()

    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },

  // 异步获取商家列表
  async getShops({ commit, state }) {
    const { longitude, latitude } = state // 解构赋值
    const result = await reqShops(longitude, latitude)

    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  // 同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },

  // 同步记录商家id
  recordShopId({ commit }, shopId) {
    commit(RECEIVE_SHOP_ID, { shopId })
  },

  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()

    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },

  // 异步登出
  async logout({ commit }) {
    const result = await reqLogout()

    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()

    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()

    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      // 数据更新了, 通知一下组件（已经判断过result.code）
      callback && callback() // 因为可选传参数，执行条件是callback真
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()

    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 同步更新food中的count值
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) commit(INCREMENT_FOOD_COUNT, { food })
    else commit(DECREMENT_FOOD_COUNT, { food })
  },

  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },

  // 异步搜索商家商品列表
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)

    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  },
}