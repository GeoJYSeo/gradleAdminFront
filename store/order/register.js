import axios from 'axios'
import auth from '@/middleware/auth'

export const actions = {
  async register({ commit }, orderInfo) {
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
      await axios
        .post(`http://localhost:8080/api/order`, reqObj, config)
        .then(() => {
          commit('dialog/setRegOrder', 'success', { root: true })
        })
        .catch(() => {
          commit('dialog/setRegOrder', 'error', { root: true })
        })
    }
  },
  moveToMyOrderList() {
    this.$router.push({ name: 'member-mypage-order-list' })
  },
}
