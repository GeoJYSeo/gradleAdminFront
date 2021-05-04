import auth from '@/middleware/auth'

export const actions = {
  async commentRegister({ commit, dispatch }, commentInfo) {
    commentInfo.user_id = auth.getUserId()
    const reqObj = {
      transaction_time: new Date(),
      data: commentInfo,
    }
    await this.$axios.post('api/comment', reqObj).then((res) => {
      if (res.data.result_code === 'OK') {
        commit('dialog/setResult', 'regComment', { root: true })
        dispatch('comments/list/getCommentInfoList', commentInfo.goods_id, {
          root: true,
        })
      }
    })
  },
  back() {
    this.$router.push({ name: 'goods-list' })
  },
}
