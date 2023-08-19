import Vue from 'vue'
import router from './router' // 引入路由器
import store from './store' // 引入vuex仓库
import { Button } from 'mint-ui' // 引入mint-ui
import VueLazyload from 'vue-lazyload' // 引入lazyload
import App from './App.vue' // 引入App组件

import './mock/mockServer' // 加载mockServer即可
import loading from './assets/images/loading.gif' // 引入加载图

Vue.config.productionTip = false // 关闭Vue的生产提示

Vue.component(Button.name, Button) // 注册全局组件标签<mt-button>

Vue.use(VueLazyload, { loading }) // 使用插件并在vue内部自定义指令（v-lazy）

new Vue({
  render: h => h(App), // 将App组件放入容器
  router, // 配置项vue-router
  store, // 配置项vuex的store
}).$mount('#app')
