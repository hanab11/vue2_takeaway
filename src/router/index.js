/* 
该文件专门用于创建整个应用的路由器
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)

//import MSite from '../pages/MSite.vue'
//import Search from '../pages/Search.vue'
//import Order from '../pages/Order.vue'
//import Profile from '../pages/Profile.vue'

//返回路由组件的函数, 只有执行此函数才会加载路由组件（按需）, 这个函数在请求对应的路由路径时才会执行
const MSite = () => import('../pages/MSite.vue')
const Search = () => import('../pages/Search.vue')
const Order = () => import('../pages/Order.vue')
const Profile = () => import('../pages/Profile.vue')

import Login from '../pages/Login.vue'
import Shop from '../pages/Shop.vue'
import ShopGoods from '../pages/ShopGoods.vue'
import ShopRatings from '../pages/ShopRatings.vue'
import ShopInfo from '../pages/ShopInfo.vue'

export default new VueRouter({
  //所有路由
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite' //默认显示的一级路由
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods' //默认显示的二级路由
        },
      ]
    },
  ]
})