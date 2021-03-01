import axios from 'axios'
import auth from '@/middleware/auth'

export const actions = {
  cartRegister({ commit }, cartInfo) {
    cartInfo.user_id = auth.getUserId()
    cartInfo.goods_id = cartInfo.goods_api_response.id
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const reqObj = {
        transaction_time: new Date(),
        data: cartInfo,
      }
      axios
        .post('http://localhost:8080/api/cart', reqObj, config)
        .then(() => {
          commit('dialog/setAddCart', 'success', { root: true })
        })
        .catch(() => {
          commit('dialog/setAddCart', 'error', { root: true })
        })
    }
  },
  back() {
    this.$router.push({ name: 'goods-list' })
  },
}
