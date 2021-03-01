import axios from 'axios'
import auth from '@/middleware/auth'

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
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .get(`http://localhost:8080/api/admin/goods/${gdsId}`, config)
        .then((res) => {
          commit('setGoodsDetailInfo', res.data.data)
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  async destroy(context, gdsId) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .delete(`http://localhost:8080/api/admin/goods/${gdsId}`, config)
        .then((res) => {
          this.$router.push({ name: 'admin-goods-list' })
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
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
