import auth from '@/middleware/auth'

export const state = () => ({
  commentInfoList: [],
  commentLabel: 'to write comment',
})

export const mutations = {
  setCommentInfoList(state, commentInfoList) {
    state.commentInfoList = commentInfoList
  },
}

export const actions = {
  async getCommentInfoList({ commit }, gdsId) {
    const endPoint = gdsId ? `goods/${gdsId}` : `user/${auth.getUserId()}`
    await this.$axios.get(`api/comment/${endPoint}`).then((res) => {
      commit('setCommentInfoList', res.data.data)
    })
  },
}
