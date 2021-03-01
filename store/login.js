import axios from 'axios'
import jwtDecode from 'jwt-decode'

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
  login({ dispatch, commit }, loginObj) {
    axios
      .post('http://localhost:8080/api/login/access-token', loginObj)
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
    if (sessionStorage.getItem('accessToken') && !state.userInfo) {
      const accessToken = sessionStorage.getItem('accessToken')
      const userId = jwtDecode(accessToken).userId
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      axios
        .get(`http://localhost:8080/api/user/${userId}`, config)
        .then((res) => {
          if (res.data.result_code === 'OK') {
            commit('loginSuccess', res.data.data)
            commit('setPermission', res.data.data)
          }
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  logout({ commit }) {
    this.$router.push({ name: 'index' })
    commit('logout')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('gdsId')
  },
}
