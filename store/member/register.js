import axios from 'axios'

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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(`http://localhost:8080/api/user/email-check`, userEmail, config)
      .then((res) => {
        commit('setHasEmail', res.data)
        commit('dialog/setDispConfirmDialog', null, { root: true })
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  register({ commit }, userInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: userInfo,
    }
    axios
      .post('http://localhost:8080/api/user', reqObj)
      .then(() => {
        commit('registeredUser')
        this.$router.push({ name: 'login' })
      })
      .catch((err) => {
        console.log(err)
        this.$router.push({ name: 'error' })
      })
  },
  moveToModify(context, userInfo) {
    this.$router.push({
      name: 'member-modify',
      params: { userInfo },
    })
  },
  back() {
    this.$router.push({ name: 'index' })
  },
}
