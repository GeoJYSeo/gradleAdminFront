import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  cateInfo: null,
  headers: [
    {
      text: 'Category Name',
      align: 'start',
      value: 'cate_name',
      groupable: false,
    },
    {
      text: 'Category Code',
      align: 'right',
      value: 'cate_code',
      groupable: false,
    },
    {
      text: 'Category Code Ref',
      align: 'right',
      value: 'cate_code_ref',
    },
  ],
})

export const mutations = {
  setCateInfo(state, cateInfo) {
    state.cateInfo = cateInfo
  },
}

export const actions = {
  async getCateList({ commit }) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .get('http://localhost:8080/api/admin/category', config)
        .then((res) => {
          commit('setCateInfo', res.data.data)
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
}
