import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  goodsInfo: null,
})

export const mutations = {
  setCateInfo(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
}

export const actions = {
  register(context, goodsInfo) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const form = new FormData()
      const reqObj = {
        transaction_time: new Date(),
        data: goodsInfo[0],
      }
      const json = JSON.stringify(reqObj)
      const gdsReq = new Blob([json], {
        type: 'application/json',
      })
      goodsInfo[1].forEach((image) => form.append('images', image))
      form.append('gdsReq', gdsReq)
      axios
        .post('http://localhost:8080/api/admin/goods', form, config)
        .then((res) => {
          this.$router.push({ name: 'admin-goods-list' })
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
  back() {
    this.$router.push({ name: 'admin-goods-list' })
  },
}
