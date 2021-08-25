import jwtDecode from 'jwt-decode'
import auth from '@/middleware/auth'

export const state = () => ({
  userInfo: null,
  isLogin: false,
  isLoginError: false,
  hasPermission: false,
})

export const mutations = {
  loginSuccess(state, userInfo) {
    state.userInfo = userInfo
    state.isLogin = true
    state.isLoginError = false
  },
  loginError(state) {
    state.isLogin = false
    state.isLoginError = true
  },
  setErrorInit(state) {
    state.isLoginError = false
  },
  logout(state) {
    state.isLogin = false
    state.isLoginError = false
    state.userInfo = null
    state.hasPermission = false
  },
  setPermission(state, userInfo) {
    state.hasPermission = [8, 9].includes(userInfo.access)
  },
}

export const actions = {
  async login({ dispatch, commit }, loginObj) {
    await this.$axios
      .post('api/login/access-token', loginObj)
      .then((res) => {
        sessionStorage.setItem('accessToken', res.data.access_token)
        dispatch('getMemberInfo')
        this.$router.push({ name: 'member-detail' })
      })
      .catch(() => {
        commit('loginError')
      })
  },
  getMemberInfo({ state, commit }) {
    if (sessionStorage.getItem('accessToken')) {
      const userId = jwtDecode(auth.getAccessToken()).userId
      this.$axios
        .get(`api/user/${userId}`)
        .then((res) => {
          if (res.data.result_code === 'OK') {
            commit('loginSuccess', res.data.data)
            commit('setPermission', res.data.data)
          }
        })
        .catch(() => {
          this.$router.push({ name: 'error' })
        })
    }
  },
  logout({ commit }) {
    this.$router.push({ name: 'index' })
    commit('logout')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('selUserId')
  },
}
