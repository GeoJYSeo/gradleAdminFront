import axios from 'axios'
import auth from '@/middleware/auth'

export const actions = {
  modify(context, userInfo) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const reqObj = {
        transaction_time: new Date(),
        data: userInfo,
      }
      axios
        .put('http://localhost:8080/api/admin/user', reqObj, config)
        .then(() => {
          this.$router.push({ name: 'admin-users-list' })
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
  hasPasswdCheck({ commit }, newPasswd) {
    const chgPwdInfo = { id: auth.getUserId(), passwd: newPasswd }
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const reqObj = {
        transaction_time: new Date(),
        data: chgPwdInfo,
      }
      axios
        .post(
          'http://localhost:8080/api/admin/user/passwd-check',
          reqObj,
          config
        )
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
    }
  },
  back() {
    this.$router.push({ name: 'admin-users-detail' })
  },
}
