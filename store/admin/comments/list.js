export const state = () => ({
  commentInfoList: [],
  commentLabel: 'to write comment',
  headers: [
    {
      text: 'Goods Name',
      align: 'center',
      value: 'goods_api_response.gds_name',
    },
    {
      text: 'User Email',
      align: 'center',
      value: 'user_api_response.user_email',
    },
    {
      text: 'Registration Date',
      align: 'center',
      value: 'reg_date',
      groupable: false,
    },
    {
      text: 'Delete',
      align: 'center',
      value: 'delComment',
      sortable: false,
      groupable: false,
    },
    { text: '', value: 'data-table-expand', groupable: false },
  ],
  footerProps: {
    itemsPerPageOptions: [5, 10, 15],
  },
})

export const mutations = {
  setCommentInfoList(state, commentInfoList) {
    state.commentInfoList = commentInfoList
  },
}

export const actions = {
  async getCommentInfoList({ commit }) {
    await this.$axios
      .get('api/admin/comment')
      .then((res) => {
        commit('setCommentInfoList', res.data.data)
      })
      .catch(() => {
        this.$router.push({ name: 'error' })
      })
  },
}
