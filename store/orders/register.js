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
    const reqObj = {
      transaction_time: new Date(),
      data: orderInfo,
    }
    await this.$axios.post(`api/order`, reqObj).then((res) => {
      if (res.data.result_code === 'OK') {
        context.commit('dialog/setResult', 'order', { root: true })
      }
    })
  },
  moveToMyOrderList() {
    this.$router.push({ name: 'member-mypage-orders-list' })
  },
}
