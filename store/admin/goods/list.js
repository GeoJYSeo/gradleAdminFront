export const state = () => ({
  goodsInfoList: null,
})

export const mutations = {
  setGoodsInfoList(state, goodsInfoList) {
    state.goodsInfoList = goodsInfoList
  },
}

export const actions = {
  async getGoodsList({ commit }, params) {
    // const accessToken = rootState.login.accessToken
    // const accessToken = JSON.parse(sessionStorage.getItem('auth-key')).login
    //   .accessToken
    await this.$axios
      .get(
        `api/admin/goods?page=${--params[0]}&keyword=${
          params[1] ? params[1] : ''
        }`
      )
      .then((res) => {
        commit('setGoodsInfoList', res.data.data)
        commit('pagination/setPagination', res.data, { root: true })
      })
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
