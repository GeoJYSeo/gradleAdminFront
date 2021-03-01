<template>
  <v-container fill-height style="max-width: 1200px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-row>
              <v-col>
                <v-toolbar-title>Comments</v-toolbar-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="1">
                <IconButton text="mdi-transfer-left" @sendEvent="back" />
              </v-col>
            </v-row>
          </v-toolbar>
          <ProgressLiner v-if="!commentInfoList" />
          <div v-else-if="commentInfoList.length === 0" align="center">
            <h2>There is no DATA.</h2>
          </div>
          <div v-else class="pa-4">
            <v-data-table
              :headers="headers"
              :items="commentInfoList"
              :expanded.sync="expanded"
              :footer-props="footerProps"
              show-group-by
              show-expand
            >
              <template v-slot:[`item.delComment`]="{ item }">
                <v-icon @click="destroy(item.id)"
                  >mdi-delete-circle-outline</v-icon
                >
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-row align="center" justify="center">
                    <v-col sm="3">
                      <router-link
                        :to="{
                          name: 'goods-detail',
                          query: {
                            gdsId: item.goods_api_response.id,
                          },
                        }"
                      >
                        <v-img
                          :src="
                            require(`@/static/${item.goods_api_response.goods_image_api_response_list[0].gds_thumb_img}`)
                          "
                          contain
                          height="200"
                          width="200"
                        >
                        </v-img>
                      </router-link>
                    </v-col>
                    <v-col sm="5">
                      <CommentTextArea
                        :input-content="item.comment"
                        :is-detail="true"
                      />
                    </v-col>
                    <v-col sm="2" align="center">
                      <v-btn icon>
                        <v-icon @click="setDialogDetailComment(item)"
                          >mdi-square-edit-outline</v-icon
                        >
                      </v-btn>
                    </v-col>
                  </v-row>
                </td>
              </template>
            </v-data-table>
          </div>
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'
import ProgressLiner from '@/components/molecules/progress_liner'
import CommentTextArea from '@/components/molecules/textarea'
import CommentFormDialog from '@/components/organisms/comment_form_dialog'
import ConfirmDialog from '@/components/organisms/confirm_dialog'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: {
    ProgressLiner,
    CommentTextArea,
    CommentFormDialog,
    ConfirmDialog,
  },
  data() {
    return {
      expanded: [],
      curPageNum: 1,
      dispItemCount: 8,
    }
  },
  computed: {
    ...mapState('dialog', [
      'dispConfirmDialog',
      'dispCommentDialog',
      'regComment',
      'delComment',
      'dialogContents',
    ]),
    ...mapState('admin/comments/list', [
      'commentInfoList',
      'commentLabel',
      'headers',
      'footerProps',
    ]),
    ...mapState('admin/comments/detail', ['detailComment']),
    dispDialogContents() {
      return this.regComment === 'success'
        ? this.dialogContents[1]
        : this.delComment === 'success'
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
    ...mapMutations('admin/comments/detail', ['setDetailComment']),
    ...mapActions('admin/comments/list', ['getCommentInfoList']),
    ...mapActions('admin/comments/detail', ['modify', 'destroy', 'back']),
    setDialogDetailComment(commentInfo) {
      this.setDetailComment(commentInfo)
      this.setDispCommentDialog()
    },
  },
}
</script>
