# vue2_takeaway
---

## 从0开始创建项目和安装依赖，解决坑的过程
```
vue create vue2_takeaway
npm i -g serve（全局已安装）
npm i --save less
npm i --save less-loader@6（高低版本都不行）
npm i --save vue-router@3
npm i --save vuex@3
npm i --save vue-lazyload@1（高版本报错）
npm i --save axios
npm i --save mint-ui
npm i --save-dev babel-plugin-component
npm i --save swiper@3.4.2
npm i --save better-scroll
npm i --save mockjs

安装MongoDB，启动服务（并修改系统环境变量到/bin；6版本没有shell工具选4版；图形化的Compass另行安装，否则会卡住）
npm i --save mongoose（后端已安装）
安装PostMan（测试接口）

```

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


