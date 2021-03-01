import axios from 'axios'

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
    await axios
      .get(`http://localhost:8080/api/goods/${gdsId}`)
      .then((res) => {
        commit('setGoodsDetailInfo', res.data.data)
      })
      .catch(() => {
        this.$router.push('error')
      })
  },
  moveToOrder(context, cartInfo) {
    this.$router.push({ name: 'order-list', params: { cartInfo } })
  },
  back() {
    this.$router.push({ name: 'goods-list' })
  },
}
