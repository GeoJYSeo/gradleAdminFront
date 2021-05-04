export const actions = {
  modify(context, userInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: userInfo,
    }
    this.$axios.put('api/admin/user', reqObj).then(() => {
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
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  back() {
    this.$router.push({ name: 'admin-users-detail' })
  },
}
