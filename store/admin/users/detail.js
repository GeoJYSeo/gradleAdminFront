export const state = () => ({
  userDetailInfo: null,
})

export const mutations = {
  setDetailedUser(state, userDetailInfo) {
    state.userDetailInfo = userDetailInfo
  },
}

export const actions = {
  setSessionSelUserId(context, selUserId) {
    sessionStorage.setItem('selUserId', selUserId)
  },
  async getUserDetailInfo({ commit }, selUserId) {
    await this.$axios.get(`api/admin/user/${selUserId}`).then((res) => {
      commit('setDetailedUser', res.data.data)
    })
  },
  async destroy(context, selUserId) {
    await this.$axios.delete(`api/admin/user/${selUserId}`).then(() => {
      this.$router.push({ name: 'admin-users-list' })
    })
  },
  moveToModify(context, userDetailInfo) {
    this.$router.push({
      name: 'admin-users-modify',
      params: { userDetailInfo },
    })
  },
  back() {
    this.$router.push({ name: 'admin-users-list' })
  },
}
