export const state = () => ({
  goodsDetailInfo: null,
})

export const mutations = {
  setGoodsDetailInfo(state, goodsDetailInfo) {
    state.goodsDetailInfo = goodsDetailInfo
  },
}

export const actions = {
  async getGoodsDetailInfo({ commit }, gdsId) {
    await this.$axios.get(`api/goods/${gdsId}`).then((res) => {
      commit('setGoodsDetailInfo', res.data.data)
    })
  },
  moveToOrder({ commit }, cartInfo) {
    commit('orders/register/setIsDirectOrder', true, { root: true })
    this.$router.push({ name: 'orders-list', params: { cartInfo } })
  },
  back() {
    this.$router.push({ name: 'goods-list' })
  },
}
