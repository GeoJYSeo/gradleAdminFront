export const state = () => ({
  stockError: { btn_color: '#D32F2F', text: null },
  dispConfirmDialog: false,
})

export const mutations = {
  setStockError(state, result) {
    state.stockError.text = result
    state.dispConfirmDialog = true
  },
  closeOutOfStock(state) {
    state.stockError.text = null
    state.dispConfirmDialog = false
  },
}

export const actions = {
  orderUserInfoModify({ commit }, userInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: userInfo,
    }
    this.$axios
      .put('api/user/', reqObj)
      .then((res) => {
        commit('login/loginSuccess', res.data.data, { root: true })
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  moveToOrderSum({ commit }, orderInfo) {
    orderInfo.goods_ids = orderInfo.cart_api_request.map(
      (order) => order.goods_api_response.id
    )
    const reqObj = {
      transaction_time: new Date(),
      data: orderInfo,
    }
    this.$axios
      .post('api/cart/stock-check', reqObj)
      .then((res) => {
        if (res.data.result_code === 'OK') {
          this.$router.push({ name: 'orders-summary', params: { orderInfo } })
        } else {
          commit('setStockError', res.data.description)
        }
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  moveToGoodsList() {
    alert('Error occurred! Please try again!')
    this.$router.push({ name: 'goods-list' })
  },
  moveToOrderList() {
    this.$router.push({ name: 'orders-list' })
  },
  back() {
    this.$router.push({ name: 'index' })
  },
}
