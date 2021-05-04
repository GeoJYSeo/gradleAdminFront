export const state = () => ({
  cateInfo: null,
})

export const mutations = {
  setCateInfo(state, cateInfo) {
    state.cateInfo = cateInfo
  },
}

export const actions = {
  register(context, cateInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: cateInfo,
    }
    this.$axios.post('api/admin/category', reqObj).then(() => {
      this.$router.push({ name: 'admin-goods-cate_list' })
    })
  },
  back() {
    this.$router.push({ name: 'admin-goods-cate_list' })
  },
}
