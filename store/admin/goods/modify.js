import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  detailedGoodsInfo: null,
})

export const mutations = {
  setDetailedGoods(state, detailedGoodsInfo) {
    state.detailedGoodsInfo = detailedGoodsInfo.data
  },
}

export const actions = {
  async modify(context, goodsInfo) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
      goodsInfo[0].del_image_ids = goodsInfo[0].del_image_ids.flat()
      const form = new FormData()
      const reqObj = {
        transaction_time: new Date(),
        data: goodsInfo[0],
      }
      const Json = JSON.stringify(reqObj)
      const gdsReq = new Blob([Json], {
        type: 'application/json',
      })
      goodsInfo[1].forEach((image) => form.append('images', image))
      form.append('gdsReq', gdsReq)
      await axios
        .put('http://localhost:8080/api/admin/goods/', form, config)
        .then((res) => {
          this.$router.push({
            name: 'admin-goods-detail',
            query: { gdsId: goodsInfo[0].id },
          })
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  back(context, gdsId) {
    this.$router.push({ name: 'admin-goods-detail', query: { gdsId } })
  },
}
