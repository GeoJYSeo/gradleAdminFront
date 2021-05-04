export const state = () => ({
  cateInfo: null,
  headers: [
    {
      text: 'Category Name',
      align: 'start',
      value: 'cate_name',
      groupable: false,
    },
    {
      text: 'Category Code',
      align: 'right',
      value: 'cate_code',
      groupable: false,
    },
    {
      text: 'Category Code Ref',
      align: 'right',
      value: 'cate_code_ref',
    },
  ],
})

export const mutations = {
  setCateInfo(state, cateInfo) {
    state.cateInfo = cateInfo
  },
}

export const actions = {
  async getCateList({ commit }) {
    await this.$axios.get('api/admin/category').then((res) => {
      commit('setCateInfo', res.data.data)
    })
  },
}
