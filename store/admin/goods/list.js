import axios from 'axios'
import auth from '@/middleware/auth'

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
        .get(
          `http://localhost:8080/api/admin/goods?page=${--params[0]}&keyword=${
            params[1] ? params[1] : ''
          }`,
          config
        )
        .then((res) => {
          commit('setGoodsInfoList', res.data.data)
          commit('pagination/setPagination', res.data, { root: true })
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
