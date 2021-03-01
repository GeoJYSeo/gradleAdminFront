export const state = () => ({
  dispConfirmDialog: false,
  dispCommentDialog: false,
  dispChgPwdDialog: false,
  addCart: null,
  regOrder: null,
  regComment: null,
  delComment: null,
  dialogContents: [
    {
      btn_color: '#1E88E5',
      text: 'The product has been added to your shopping cart!!',
    },
    {
      btn_color: '#1E88E5',
      text: 'The comment has been registerd sucessfully!!',
    },
    {
      btn_color: '#1E88E5',
      text: 'Your order has been registerd sucessfully!!',
    },
    {
      btn_color: '#1E88E5',
      text: 'The comment has been deleted sucessfully!!',
    },
    {
      btn_color: '#D32F2F',
      text: 'An unexpected error has occurred.',
    },
    {
      con_btn_color: '#1E88E5',
      can_btn_color: '#D32F2F',
      text: 'Comment',
    },
    {
      con_btn_color: '#1E88E5',
      can_btn_color: '#D32F2F',
      text: 'Please enter New Password.',
    },
    {
      btn_color: '#D32F2F',
      text: 'Wrong Password. Please check the password.',
    },
  ],
})

export const mutations = {
  setAddCart(state, result) {
    state.addCart = result
    state.dispConfirmDialog = true
  },
  setRegOrder(state, result) {
    state.regOrder = result
    state.dispConfirmDialog = true
  },
  setRegComment(state, result) {
    state.regComment = result
    state.dispConfirmDialog = true
  },
  setDelComment(state, result) {
    state.delComment = result
    state.dispConfirmDialog = true
  },
  setDispConfirmDialog(state) {
    state.dispConfirmDialog = true
  },
  setDispCommentDialog(state) {
    state.dispCommentDialog = true
  },
  setDispChgPwdDialog(state, result) {
    state.dispChgPwdDialog = true
  },
  closeDialog(state) {
    state.addCart = null
    state.regOrder = null
    state.dispConfirmDialog = false
    state.dispCommentDialog = false
    state.dispChgPwdDialog = false
  },
}
