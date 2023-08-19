/**
 * vuex核心对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state, // 配置状态
  mutations, // 配置变更
  actions, // 配置行为
  getters // 配置计算属性
})
