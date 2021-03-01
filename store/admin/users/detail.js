import axios from 'axios'
import auth from '@/middleware/auth'

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
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .get(`http://localhost:8080/api/admin/user/${selUserId}`, config)
        .then((res) => {
          commit('setDetailedUser', res.data.data)
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  async destroy(context, selUserId) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .delete(`http://localhost:8080/api/admin/user/${selUserId}`, config)
        .then((res) => {
          this.$router.push({ name: 'admin-users-list' })
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
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
