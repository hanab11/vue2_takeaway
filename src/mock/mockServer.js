/**
 * 使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

/**
 * 如果要根据每个shop的唯一标识跳转对应路由，应传入shopId，
 * 带着shopId遍历查找id，相同就获取对应data数组下标index，访问数据
 * 
 * 在shopList点击事件的同时，同步保存shop.id到state.shopId
 * state里有数据，可映射读取（！但是state.shopId传不到mockServer里，正常使用后台服务器没有这个问题）
 */
console.log('mockServer的this是', this) // undefined
const index = 0 // 无法获取state.shopId，使用默认下标index

// 返回goods的接口
Mock.mock('/goods', { code: 0, data: data[index].goods })
// 返回ratings的接口
Mock.mock('/ratings', { code: 0, data: data[index].ratings })
// 返回info的接口
Mock.mock('/info', { code: 0, data: data[index].info })

// export default // 不需要向外暴露, 加载即可