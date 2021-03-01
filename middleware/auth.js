import jwtDecode from 'jwt-decode'

export default {
  getAccessToken() {
    return sessionStorage.getItem('accessToken')
  },
  getUserId() {
    return jwtDecode(this.getAccessToken()).userId
  },
  keepLogin() {
    return ({ store }) => {
      if (this.getAccessToken()) {
        store.dispatch('login/getMemberInfo')
      }
    }
  },
  loginAuthentication() {
    return ({ redirect }) => {
      if (!this.getAccessToken()) {
        return redirect({ name: 'login' })
      }
    }
  },
  authentication() {
    return ({ redirect }) => {
      if (![8, 9].includes(jwtDecode(this.getAccessToken()).access)) {
        return redirect({ name: 'index' })
      }
    }
  },
  adminAuthentication() {
    return ({ redirect }) => {
      if (jwtDecode(this.getAccessToken()).access !== 9) {
        confirm('Need PERMISSION.')
        return redirect({ name: 'index' })
      }
    }
  },
}
