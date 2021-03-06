import axios from 'axios'

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
}

export const actions = {
  async getGoodsList({ commit }, params) {
    await axios
      .get(
        `http://localhost:8080/api/goods?page=${--params[0]}&keyword=${
          params[1] ? params[1] : ''
        }`
      )
      .then((res) => {
        commit('setGoodsInfo', res.data)
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
