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
    this.$axios
      .get(`api/order/${orderId}?user-id=${auth.getUserId()}`)
      .then((res) => {
        commit('setOrderInfo', res.data.data)
      })
  },
  cancelOrder({ commit }, orderInfo) {
    orderInfo.user_id = auth.getUserId()
    const reqObj = {
      transaction_time: new Date(),
      data: orderInfo,
    }
    this.$axios.put('api/order', reqObj).then((res) => {
      commit('setOrderInfo', res.data.data)
      this.$router.push({ name: 'member-mypage-orders-list' })
    })
  },
  back() {
    this.$router.push({ name: 'member-mypage-orders-list' })
  },
}
