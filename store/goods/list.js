export const state = () => ({
  goodsInfoList: null,
  pagination: null,
  plusCurPageNum: null,
})

export const mutations = {
  setGoodsInfo(state, goodsInfoList) {
    state.goodsInfoList = goodsInfoList.data
    state.pagination = goodsInfoList.pagination
    state.plusCurPageNum = goodsInfoList.pagination.current_page + 1
  },
  initGoodsInfo(state) {
    state.goodsInfoList = null
    state.pagination = null
    state.plusCurPageNum = null
  },
}

export const actions = {
  async getGoodsList({ commit }, params) {
    await this.$axios
      .get(
        `api/goods?page=${--params[0]}&keyword=${
          params[1] ? params[1] : ''
        }&categoryName=${params?.[2] ? params[2] : ''}`
      )
      .then((res) => {
        commit('setGoodsInfo', res.data)
      })
  },
  back() {
    this.$router.push({ name: 'index' })
  },
}
