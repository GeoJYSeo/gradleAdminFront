import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  orderDetailInfo: null,
})

export const mutations = {
  setOrderInfo(state, orderDetailInfo) {
    state.orderDetailInfo = orderDetailInfo
  },
}

export const actions = {
  getOrderDetailInfo({ commit }, orderId) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      axios
        .get(`http://localhost:8080/api/admin/order/${orderId}`, config)
        .then((res) => {
          commit('setOrderInfo', res.data.data)
          commit('pagination/setPagination', res.data, { root: true })
        })
        .catch(() => {})
    }
  },
  changeOrderState({ commit }, orderInfo) {
    orderInfo.user_id = auth.getUserId()
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const reqObj = {
        transaction_time: new Date(),
        data: orderInfo,
      }
      axios
        .put(`http://localhost:8080/api/admin/order`, reqObj, config)
        .then((res) => {
          commit('setOrderInfo', res.data.data)
          commit('pagination/setPagination', res.data, { root: true })
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  back() {
    this.$router.push({ name: 'admin-orders-list' })
  },
}
