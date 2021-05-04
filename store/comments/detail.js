import auth from '@/middleware/auth'

export const state = () => ({
  detailComment: {},
})

export const mutations = {
  setDetailComment(state, detailComment) {
    state.detailComment = detailComment
  },
}

export const actions = {
  async modify({ commit, dispatch }, commentInfo) {
    commentInfo.user_id = auth.getUserId()
    const reqObj = {
      transaction_time: new Date(),
      data: commentInfo,
    }
    await this.$axios.put('api/comment/', reqObj).then((res) => {
      if (res.data.result_code === 'OK') {
        commit('dialog/setResult', 'regComment', { root: true })
        dispatch('comments/list/getCommentInfoList', null, { root: true })
      }
    })
  },
  async destroy({ commit, dispatch }, comId) {
    const userId = auth.getUserId()
    await this.$axios
      .delete(`api/comment/${comId}?user-id=${userId}`)
      .then((res) => {
        if (res.data.result_code === 'OK') {
          commit('dialog/setResult', 'delComment', { root: true })
          dispatch('comments/list/getCommentInfoList', null, { root: true })
        }
      })
  },
}
