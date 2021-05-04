export const actions = {
  register(context, userInfo) {
    const reqObj = {
      transaction_time: new Date(),
      data: userInfo,
    }
    this.$axios.post('api/admin/user', reqObj).then(() => {
      this.$router.push({ name: 'admin-users-list' })
    })
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
