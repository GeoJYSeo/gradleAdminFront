export const state = () => ({
  pagination: null,
  plusCurPageNum: null,
})

export const mutations = {
  setPagination(state, payload) {
    state.pagination = payload.pagination
    state.plusCurPageNum = payload.pagination.current_page + 1
  },
}
