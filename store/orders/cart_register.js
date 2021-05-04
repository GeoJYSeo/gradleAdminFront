import auth from '@/middleware/auth'

export const actions = {
  cartRegister({ commit }, cartInfo) {
    cartInfo.goods_ids = [cartInfo.goods_api_response.id]
    cartInfo.user_id = auth.getUserId()
    const reqObj = {
      transaction_time: new Date(),
      data: cartInfo,
    }
    this.$axios.post('api/cart', reqObj).then((res) => {
      if (res.data.result_code === 'OK') {
        commit('dialog/setResult', 'cart', { root: true })
      }
    })
  },
  back() {
    this.$router.push({ name: 'goods-list' })
  },
}
