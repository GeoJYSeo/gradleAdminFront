import axios from 'axios'
import auth from '@/middleware/auth'

export const actions = {
  async commentRegister({ commit, dispatch }, commentInfo) {
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
        .post('http://localhost:8080/api/comment', reqObj, config)
        .then(() => {
          commit('dialog/setRegComment', 'success', { root: true })
          dispatch('comments/list/getCommentInfoList', commentInfo.goods_id, {
            root: true,
          })
        })
        .catch((err) => {
          console.log(err)
          commit('dialog/setRegComment', 'error', { root: true })
        })
    }
  },
  back() {
    this.$router.push({ name: 'goods-list' })
  },
}
