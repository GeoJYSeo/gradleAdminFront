import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  orderInfoList: null,
  headers: [
    {
      text: 'Order Number',
      align: 'center',
      value: 'order_num',
      groupable: false,
    },
    {
      text: 'Order Receiver',
      align: 'center',
      value: 'order_rcp',
    },
    {
      text: 'Total Price',
      align: 'center',
      value: 'total_price',
      groupable: false,
    },
    {
      text: 'Order Status',
      align: 'center',
      value: 'order_status',
    },
    {
      text: 'Order Date',
      align: 'center',
      value: 'order_date',
    },
  ],
  footerProps: {
    itemsPerPageOptions: [5, 10, 15],
  },
})

export const mutations = {
  setOrderInfo(state, orderInfoList) {
    state.orderInfoList = orderInfoList
  },
}

export const actions = {
  async getOrderList({ commit }, params) {
    const accessToken = auth.getAccessToken()
    // const accessToken = rootState.login.accessToken
    // const accessToken = JSON.parse(sessionStorage.getItem('auth-key')).login
    //   .accessToken
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .get(`http://localhost:8080/api/admin/order`, config)
        .then((res) => {
          commit('setOrderInfo', res.data.data)
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  moveToDetail(context, orderId) {
    this.$router.push({ name: 'admin-orders-detail', query: { orderId } })
  },
  moveToCartList() {
    this.$router.push({ name: 'order-cart_list' })
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
