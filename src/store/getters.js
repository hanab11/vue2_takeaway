/**
 * 包含多个基于state的计算属性的对象getters
 */
export default {
  totalCount(state) {
    // reduce是数组的归并方法，也会遍历数组，同时将遍历产生的结果与当前遍历项进行运算，作为返回值返回
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  totalPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },

  positiveSize(state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
  }
}