import axios from 'axios'
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
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const reqObj = {
        transaction_time: new Date(),
        data: commentInfo,
      }
      await axios
        .put(`http://localhost:8080/api/comment/`, reqObj, config)
        .then(() => {
          commit('dialog/setRegComment', 'success', { root: true })
          dispatch('comments/list/getCommentInfoList', null, { root: true })
        })
        .catch((err) => {
          console.log(err)
          commit('dialog/setRegComment', 'error', { root: true })
        })
    }
  },
  async destroy({ commit, dispatch }, comId) {
    const userId = auth.getUserId()
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .delete(
          `http://localhost:8080/api/comment/${comId}?userId=${userId}`,
          config
        )
        .then(() => {
          commit('dialog/setDelComment', 'success', { root: true })
          dispatch('comments/list/getCommentInfoList', null, { root: true })
        })
        .catch((err) => {
          console.log(err)
          commit('dialog/setDelComment', 'error', { root: true })
        })
    }
  },
}
