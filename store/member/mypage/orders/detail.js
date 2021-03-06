import axios from 'axios'
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
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      axios
        .get(
          `http://localhost:8080/api/order/${orderId}?user_id=${auth.getUserId()}`,
          config
        )
        .then((res) => {
          commit('setOrderInfo', res.data.data)
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
  cancelOrder({ commit }, orderInfo) {
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
        .put(`http://localhost:8080/api/order`, reqObj, config)
        .then((res) => {
          commit('setOrderInfo', res.data.data)
          this.$router.push({ name: 'member-mypage-orders-list' })
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
  back() {
    this.$router.push({ name: 'member-mypage-orders-list' })
  },
}
