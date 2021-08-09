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
      text: 'Status',
      align: 'right',
      value: 'status',
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
    await this.$axios
      .get(`api/admin/user?searchKind=${params?.[0]}&keyword=${params?.[1]}`)
      .then((res) => {
        commit('setUserInfoList', res.data.data)
      })
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
