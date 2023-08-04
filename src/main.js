import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip = false //关闭Vue的生产提示

new Vue({
  render: h => h(App), //将App组件放入容器
}).$mount('#app')
