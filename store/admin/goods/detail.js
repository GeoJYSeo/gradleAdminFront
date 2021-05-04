export const state = () => ({
  goodsdetailInfo: null,
})

export const mutations = {
  setGoodsDetailInfo(state, goodsdetailInfo) {
    state.goodsdetailInfo = goodsdetailInfo
  },
}

export const actions = {
  async getGoodsDetailInfo({ commit }, gdsId) {
    await this.$axios.get(`api/admin/goods/${gdsId}`).then((res) => {
      commit('setGoodsDetailInfo', res.data.data)
    })
  },
  async destroy(context, gdsId) {
    await this.$axios.delete(`api/admin/goods/${gdsId}`).then((res) => {
      this.$router.push({ name: 'admin-goods-list' })
    })
  },
  moveToModify(context, goodsdetailInfo) {
    this.$router.push({
      name: 'admin-goods-modify',
      query: { gdsId: goodsdetailInfo[0].id },
      params: { goodsdetailInfo: goodsdetailInfo[0] },
    })
  },
  back() {
    this.$router.push({ name: 'admin-goods-list' })
  },
}
