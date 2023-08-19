/**
 * 包含n个接口请求函数的模块
 * 函数的返回值: promise对象，data也是promise对象
 */
import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000' // 接口的基本url配置在vue.config.js里
const BASE_URL = '/api'

// 1、获取位置详情（根据经纬度）
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')
// 3、获取商铺列表（根据经纬度）
export const reqShops = (longitude, latitude) => ajax(BASE_URL + '/shops', { longitude, latitude })
// 4、搜索商铺列表（根据经纬度和关键字）
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', { geohash, keyword })
// 6、用户名密码登陆（根据图片验证码）
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })
// 8、手机号登陆（根据短信验证码）
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
// 9、获取用户信息（根据会话）
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')

// 11、获取商家商品数组
export const reqShopGoods = () => ajax('/goods')
// 12、获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
// 13、获取商家信息
export const reqShopInfo = () => ajax('/info')