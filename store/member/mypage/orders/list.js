import auth from '@/middleware/auth'

export const state = () => ({
  orderInfoList: null,
})

export const mutations = {
  setOrderInfo(state, orderInfoList) {
    state.orderInfoList = orderInfoList
  },
}

export const actions = {
  getOrderInfoList({ commit }, pageNum) {
    this.$axios
      .get(`api/order?user-id=${auth.getUserId()}&page=${pageNum}`)
      .then((res) => {
        commit('setOrderInfo', res.data.data)
        commit('pagination/setPagination', res.data, { root: true })
      })
  },
  back() {
    this.$router.push({ name: 'index' })
  },
}
