import axios from 'axios'
import auth from '@/middleware/auth'

export const actions = {
  register(context, userInfo) {
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
        .post(`http://localhost:8080/api/admin/user`, reqObj, config)
        .then(() => {
          this.$router.push({ name: 'admin-users-list' })
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  back() {
    this.$router.push({ name: 'admin' })
  },
}
