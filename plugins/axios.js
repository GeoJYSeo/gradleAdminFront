import auth from '@/middleware/auth'

export default ({ $axios, redirect, store }) => {
  if (process.env.NODE_ENV !== 'production') {
    $axios.setBaseURL(process.env.API_BASE_URL)
  } else {
    $axios.setBaseURL('https://test-gradlemall.com/')
  }

  $axios.onRequest((config) => {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      config.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      }
    }
  })

  $axios.onResponse((res) => {
    const description = res.data.description
    if (description === 'Not Found') {
      store.commit('dialog/setResult', 'error', { root: true })
    }
  })

  $axios.onError((err) => {
    const message = err.response.data.message
    if (!message.includes('Login')) {
      redirect('/error')
    }
  })
}
