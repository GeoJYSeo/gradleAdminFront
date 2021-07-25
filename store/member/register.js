export const state = () => ({
  hasEmailResult: true,
  EmailCheckMessage: {},
})

export const mutations = {
  setHasEmail(state, hasEmail) {
    const result =
      hasEmail.result_code === 'OK'
        ? [
            false,
            { btn_color: '#1E88E5', text: 'This user email is available' },
          ]
        : [true, { btn_color: '#D32F2F', text: hasEmail.description }]
    state.hasEmailResult = result[0]
    state.EmailCheckMessage = result[1]
  },
  registeredUser(state) {
    state.hasEmailResult = true
  },
}

export const actions = {
  emailCheck({ commit }, userEmail) {
    this.$axios.get(`api/user/email-check?email=${userEmail}`).then((res) => {
      commit('setHasEmail', res.data)
      commit('dialog/setDispConfirmDialog', null, { root: true })
    })
  },
  register({ commit }, userInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: userInfo,
    }
    this.$axios.post('api/user', reqObj).then(() => {
      commit('registeredUser')
      this.$router.push({ name: 'login' })
    })
  },
  moveToModify(context, userInfo) {
    this.$router.push({
      name: 'member-modify',
      params: { userInfo },
    })
  },
  async destroy({ dispatch }, id) {
    await this.$axios.delete(`api/user/${id}`).then(() => {
      dispatch('login/getMemberInfo', null, { root: true })
    })
  },
  back() {
    this.$router.push({ name: 'index' })
  },
}
