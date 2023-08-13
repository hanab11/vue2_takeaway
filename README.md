# vue2_takeaway
---

后端短信接口处理完，只能给测试手机号发送1~4位数字短信验证码

---
## 1.描述
1. 前后端分离的外卖 SPA 项目
2. 技术栈：Vue全家桶 + ES6 + Webpack + 等
3. 实现商家, 商品, 购物车, 订单、用户等多个功能模块（待丰富）
4. 模块化、组件化、工程化开发

## 2.Takeaway
* 既是外卖项目，又是总结、感想。
1. 项目构思，分拆路由、组件：一级路由（按底部是否有导航，没有的是登录、商家）、二级路由（商家组件的属性）
### 2.1 项目开发流程
1. 分析数据结构
* 商家对象{}（地址、商品）
* 用户对象{}（地址）
2. 数据之间有什么联动？
* 他们都有地址，计算属性：距离
* 用户买商家商品，先搜索+加入购物车+结算购物车+下订单+选择地址+付款
3. 剩下的无联动、无交互，数据和功能
### 2.2 类库支持
* vue-router
* vuex
* vue-lazyload
* axios/vue-resource
* mint-ui
* mockjs
* better-scroll/vue-scroller（看最终完成）
* stylus/less（看最终完成，scss需要安装node包，有时会被墙）
## 3.运行 
```javascript
export default {
  xxx
}
```
## 4.项目结构注释
xxx
## 5.API接口文档
xxx
## 6.示例图
xxx


