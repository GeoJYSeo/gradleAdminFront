import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  isDirectOrder: false,
})

export const mutations = {
  setIsDirectOrder(state, result) {
    state.isDirectOrder = result
  },
}

export const actions = {
  async register(context, orderInfo) {
    orderInfo.is_direct_order = context.state.isDirectOrder
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
          context.commit('dialog/setRegOrder', 'success', { root: true })
        })
        .catch((err) => {
          console.log(err)
          context.commit('dialog/setRegOrder', 'error', { root: true })
        })
    }
  },
  moveToMyOrderList() {
    this.$router.push({ name: 'member-mypage-orders-list' })
  },
}
