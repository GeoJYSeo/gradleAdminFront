import auth from '@/middleware/auth'

export const actions = {
  modify({ commit }, userInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: userInfo,
    }
    this.$axios.put('api/user/', reqObj).then((res) => {
      commit('login/loginSuccess', res.data.data, { root: true })
      this.$router.push({ name: 'member-detail' })
    })
  },
  hasPasswdCheck({ commit }, newPasswd) {
    const chgPwdInfo = { id: auth.getUserId(), passwd: newPasswd }
    const reqObj = {
      transaction_time: new Date(),
      data: chgPwdInfo,
    }
    this.$axios.post('api/user/passwd-check', reqObj).then((res) => {
      if (res.data.result_code === 'OK') {
        commit('dialog/setDispChgPwdDialog', null, { root: true })
      } else {
        commit('dialog/setDispConfirmDialog', null, { root: true })
      }
    })
  },
  back() {
    this.$router.push({ name: 'member-detail' })
  },
}
