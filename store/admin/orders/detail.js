import auth from '@/middleware/auth'

export const state = () => ({
  orderDetailInfoList: null,
})

export const mutations = {
  setOrderInfo(state, orderDetailInfoList) {
    state.orderDetailInfoList = orderDetailInfoList
  },
}

export const actions = {
  getOrderDetailInfoList({ commit }, orderId) {
    this.$axios.get(`api/admin/order/${orderId}`).then((res) => {
      commit('setOrderInfo', res.data.data)
    })
  },
  confirmCancelOrder({ commit }, orderInfo) {
    orderInfo.user_id = auth.getUserId()
    const reqObj = {
      transaction_time: new Date(),
      data: orderInfo,
    }
    this.$axios.put('api/admin/order', reqObj).then((res) => {
      commit('setOrderInfo', res.data.data)
      this.$router.push({ name: 'admin-orders-list' })
    })
  },
  back() {
    this.$router.push({ name: 'admin-orders-list' })
  },
}
