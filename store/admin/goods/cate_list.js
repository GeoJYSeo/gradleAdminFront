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
    {
      text: 'Delete',
      align: 'center',
      value: 'delCateGoods',
      sortable: false,
      groupable: false,
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
  async destroy({ dispatch }, id) {
    await this.$axios.delete(`api/admin/category/${id}`).then((res) => {
      dispatch('getCateList')
    })
  },
}
