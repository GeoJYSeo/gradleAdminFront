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
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
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
    this.$axios.post('api/admin/goods', form, config).then(() => {
      this.$router.push({ name: 'admin-goods-list' })
    })
  },
  back() {
    this.$router.push({ name: 'admin-goods-list' })
  },
}
