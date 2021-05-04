import auth from '@/middleware/auth'

export const state = () => ({
  cartInfoList: null,
  headers: [
    {
      align: 'start',
      value: 'image',
      groupable: false,
      sortable: false,
    },
    {
      text: 'Goods Name',
      align: 'center',
      value: 'goods_api_response.gds_name',
      groupable: false,
    },
    {
      text: 'Goods Price',
      align: 'center',
      value: 'gds_price',
      groupable: false,
    },
    {
      text: 'Goods Quantity',
      align: 'center',
      value: 'cart_quantity',
    },
    {
      text: 'Total Price',
      align: 'center',
      value: 'cart_price',
      groupable: false,
    },
    {
      text: 'Modify',
      align: 'center',
      value: 'modCartGoods',
      sortable: false,
      groupable: false,
    },
    {
      text: 'Delete',
      align: 'center',
      value: 'delCartGoods',
      sortable: false,
      groupable: false,
    },
  ],
  footerProps: {
    itemsPerPageOptions: [5, 10, 15],
  },
})

export const mutations = {
  setCartInfoList(state, cartInfoList) {
    state.cartInfoList = cartInfoList
  },
}

export const actions = {
  async getCartList({ commit }) {
    const userId = auth.getUserId()
    await this.$axios
      .get(`api/cart?user-id=${userId}`)
      .then((res) => {
        commit('setCartInfoList', res.data.data)
      })
      .catch((err) => {
        console.log(err)
        // this.$router.push({ name: 'error' })
      })
  },
  async modify({ dispatch }, cartInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: {
        id: cartInfo.id,
        cart_quantity: cartInfo.cart_quantity,
        user_id: cartInfo.user_api_response.id,
        goods_ids: [cartInfo.goods_api_response.id],
      },
    }
    await this.$axios
      .put('api/cart/', reqObj)
      .then(() => {
        // const targetIndex = state.cartInfoList
        //   .map((cart) => cart.id)
        //   .indexOf(cartInfo.id)
        // state.cartInfoList[targetIndex] = res.data.data
        // commit('setCartInfoList', state.cartInfoList)
        dispatch('getCartList')
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  async destroy({ dispatch }, cartInfo) {
    const userId = cartInfo.user_api_response.id
    await this.$axios
      .delete(`api/cart/${cartInfo.id}?user-id=${userId}`)
      .then((res) => {
        dispatch('getCartList')
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  moveToOrderSum(context, orderInfo) {
    this.$router.push({ name: 'orders-summary', params: { orderInfo } })
  },
  moveToGoodsList() {
    alert('Error occurred! Please try again!')
    this.$router.push({ name: 'goods-list' })
  },
  moveToCartList() {
    this.$router.push({ name: 'orders-cart_list' })
  },
  moveToOrderList() {
    this.$router.push({ name: 'orders-list' })
  },
  back() {
    this.$router.push({ name: 'index' })
  },
}
