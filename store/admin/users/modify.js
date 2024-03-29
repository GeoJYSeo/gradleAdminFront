export const actions = {
  modify({ dispatch, commit }, userInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: userInfo,
    }
    this.$axios.put('api/admin/user', reqObj).then(() => {
      dispatch('admin/users/list/getUserList', [0, null], { root: true })
      commit('dialog/closeDialog', null, { root: true })
      this.$router.push({ name: 'admin-users-list' })
    })
  },
  hasPasswdCheck({ commit }, { id, passwd }) {
    const chgPwdInfo = { id, passwd }
    const reqObj = {
      transaction_time: new Date(),
      data: chgPwdInfo,
    }
    this.$axios
      .post('api/admin/user/passwd-check', reqObj)
      .then((res) => {
        if (res.data.result_code === 'OK') {
          commit('dialog/setDispChgPwdDialog', null, { root: true })
        } else {
          commit('dialog/setDispConfirmDialog', null, { root: true })
        }
      })
      .catch(() => {
        this.$router.push({ name: 'error' })
      })
  },
  back() {
    this.$router.push({ name: 'admin-users-detail' })
  },
}
