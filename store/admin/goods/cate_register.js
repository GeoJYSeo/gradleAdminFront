import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  cateInfo: null,
})

export const mutations = {
  setCateInfo(state, cateInfo) {
    state.cateInfo = cateInfo
  },
}

export const actions = {
  register(context, cateInfo) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const reqObj = {
        transaction_time: new Date(),
        data: cateInfo,
      }
      axios
        .post('http://localhost:8080/api/admin/category', reqObj, config)
        .then((res) => {
          this.$router.push({ name: 'admin-goods-cate_list' })
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({ name: 'error' })
        })
    }
  },
  back() {
    this.$router.push({ name: 'admin-goods-cate_list' })
  },
}
