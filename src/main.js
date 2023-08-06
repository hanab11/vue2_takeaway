import Vue from 'vue'
import App from './App.vue' //引入App组件
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import router from './router' //引入路由器
import store from './store' //引入vuex仓库

import './mock/mockServer' //加载mockServer即可
import loading from './assets/images/loading.gif'

//关闭Vue的生产提示
Vue.config.productionTip = false
//注册全局组件标签
Vue.component(Button.name, Button)  //<mt-button>
Vue.use(VueLazyload, { //内部自定义一个指令lazy
  loading
})


new Vue({
  render: h => h(App), //将App组件放入容器
  router, //配置项vue-router
  store, //配置项vuex的store
}).$mount('#app')
