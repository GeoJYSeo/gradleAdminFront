import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  userInfoList: null,
  headers: [
    {
      text: 'User Email',
      align: 'start',
      value: 'user_email',
      groupable: false,
    },
    {
      text: 'Last Name',
      align: 'center',
      value: 'user_name',
      groupable: false,
    },
    {
      text: 'Surname',
      align: 'center',
      value: 'user_surname',
      groupable: false,
    },
    {
      text: 'Access',
      align: 'right',
      value: 'str_access',
    },
    {
      text: 'Last Login At',
      align: 'center',
      value: 'last_login_at',
      groupable: false,
    },
  ],
  footerProps: {
    itemsPerPageOptions: [5, 10, 15],
  },
})

export const mutations = {
  setUserInfoList(state, userInfoList) {
    state.userInfoList = userInfoList
  },
}

export const actions = {
  async getUserList({ commit }, params) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .get(
          `http://localhost:8080/api/admin/user?searchKind=${params[0]}&keyword=${params[1]}`,
          config
        )
        .then((res) => {
          commit('setUserInfoList', res.data.data)
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  moveToDetail(context, userId) {
    this.$router.push({
      name: 'admin-users-detail',
      params: { selUserId: userId },
    })
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
