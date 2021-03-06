import axios from 'axios'
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
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .get(`http://localhost:8080/api/comment/${endPoint}`, config)
        .then((res) => {
          commit('setCommentInfoList', res.data.data)
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
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
          dispatch('getCommentInfoList')
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
          dispatch('getCommentInfoList')
        })
        .catch((err) => {
          console.log(err)
          commit('dialog/setDelComment', 'error', { root: true })
        })
    }
  },
}
