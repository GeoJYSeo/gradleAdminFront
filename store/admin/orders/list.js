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
    // const accessToken = rootState.login.accessToken
    // const accessToken = JSON.parse(sessionStorage.getItem('auth-key')).login
    //   .accessToken
    await this.$axios.get('api/admin/order').then((res) => {
      commit('setOrderInfo', res.data.data)
    })
  },
  moveToDetail(context, orderId) {
    this.$router.push({ name: 'admin-orders-detail', query: { orderId } })
  },
  moveToCartList() {
    this.$router.push({ name: 'orders-cart_list' })
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
