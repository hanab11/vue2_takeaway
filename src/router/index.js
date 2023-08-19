/**
 * 路由器
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Shop from '../pages/Shop.vue'
import ShopGoods from '../pages/ShopGoods.vue'
import ShopRatings from '../pages/ShopRatings.vue'
import ShopInfo from '../pages/ShopInfo.vue'

// 用import函数返回路由组件，执行此函数加载路由组件（按需），首次请求对应的路由路径时才会执行此函数
const MSite = () => import('../pages/MSite.vue')
const Search = () => import('../pages/Search.vue')
const Order = () => import('../pages/Order.vue')
const Profile = () => import('../pages/Profile.vue')

Vue.use(VueRouter) // 使用插件

/**
 * 解决编程式路由重复点击导航引发的错误！
 * 先保存VueRouter原型对象的push、replace，再重写push、replace
 * 
 * call、apply区别
 * 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
 * 不同点：call与apply传递参数方式，call传递参数用逗号隔开，apply方法执行。传递数组
 * 
 * this还是该上下文调用，也就是vuerouter的实例，后面跟参数location指定跳的位置，以及成功失败的回调
 */
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

export default new VueRouter({
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
      redirect: '/msite' // 默认显示的一级路由
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
          redirect: '/shop/goods' // 默认显示的二级路由
        },
      ]
    },
  ]
})