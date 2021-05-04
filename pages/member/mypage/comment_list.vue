<template>
  <v-container fill-height style="max-width: 1400px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <CommentDetailForm
          label="Comment List"
          :disp-images="true"
          :is-detail="true"
          :comment-info-list="dispCommentsList"
          @modDialog="setDialogDetailComment"
          @delData="destroy"
        />
        <v-row v-if="dispCommentsList" class="pt-5" justify="end">
          <v-pagination
            v-model="curPageNum"
            :length="totalPages"
            :total-visible="7"
          ></v-pagination>
        </v-row>
        <CommentFormDialog
          :comment-info="JSON.parse(JSON.stringify(detailComment))"
          :disp-comment-dialog="dispCommentDialog"
          :dialog-contents="dialogContents[5]"
          @modify="modify"
          @closeDialog="closeDialog"
        />
        <ConfirmDialog
          :disp-confirm-dialog="dispConfirmDialog"
          :dialog-contents="dispDialogContents"
          @closeDialog="closeDialog"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ConfirmDialog from '@/components/organisms/confirm_dialog'
import CommentDetailForm from '@/components/organisms/goods_register/comment_form'
import CommentFormDialog from '@/components/organisms/comment_form_dialog'

export default {
  components: { ConfirmDialog, CommentDetailForm, CommentFormDialog },
  data() {
    return {
      curPageNum: 1,
      dispItemCount: 8,
    }
  },
  computed: {
    ...mapState('dialog', [
      'dispConfirmDialog',
      'dispCommentDialog',
      'result',
      'dialogContents',
    ]),
    ...mapState('comments/list', ['commentInfoList', 'commentLabel']),
    ...mapState('comments/detail', ['detailComment']),
    dispDialogContents() {
      return this.result === 'regComment'
        ? this.dialogContents[1]
        : this.result === 'delComment'
        ? this.dialogContents[3]
        : this.dialogContents[4]
    },
    totalPages() {
      return this.commentInfoList
        ? Math.ceil(this.commentInfoList.length / this.dispItemCount)
        : 0
    },
    dispCommentsList() {
      return this.commentInfoList.length === 0
        ? null
        : this.commentInfoList.slice(
            (this.curPageNum - 1) * this.dispItemCount,
            this.dispItemCount * this.curPageNum
          )
    },
  },
  async created() {
    await this.getCommentInfoList()
  },
  methods: {
    ...mapMutations('dialog', ['setDispCommentDialog', 'closeDialog']),
    ...mapMutations('comments/detail', ['setDetailComment']),
    ...mapActions('comments/list', ['getCommentInfoList']),
    ...mapActions('comments/detail', ['modify', 'destroy']),
    setDialogDetailComment(commentInfo) {
      this.setDetailComment(commentInfo)
      this.setDispCommentDialog()
    },
  },
}
</script>
