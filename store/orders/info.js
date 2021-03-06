import axios from 'axios'
import auth from '@/middleware/auth'

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
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const reqObj = {
        transaction_time: new Date(),
        data: userInfo,
      }
      axios
        .put('http://localhost:8080/api/user/', reqObj, config)
        .then((res) => {
          commit('login/loginSuccess', res.data.data, { root: true })
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
  moveToOrderSum({ commit }, orderInfo) {
    orderInfo.goods_ids = orderInfo.cart_api_request.map(
      (order) => order.goods_api_response.id
    )
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
        .post('http://localhost:8080/api/cart/stock-check', reqObj, config)
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
    }
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
