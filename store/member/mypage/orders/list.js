import axios from 'axios'
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
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      axios
        .get(
          `http://localhost:8080/api/order?user_id=${auth.getUserId()}&page=${pageNum}`,
          config
        )
        .then((res) => {
          commit('setOrderInfo', res.data.data)
          commit('pagination/setPagination', res.data, { root: true })
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
  back() {
    this.$router.push({ name: 'index' })
  },
}
