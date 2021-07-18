<template>
  <v-flex class="pt-15" xs12>
    <v-card>
      <v-toolbar flat dark>
        <v-toolbar-title>{{ label }}</v-toolbar-title>
      </v-toolbar>
      <div v-if="isDetail" class="pa-4">
        <div v-if="commentInfoList">
          <v-row
            v-for="(commentItem, index) in commentInfoList"
            :key="index"
            align="center"
          >
            <v-col v-if="dispImages" sm="2">
              <router-link
                :to="{
                  name: 'goods-detail',
                  query: {
                    gdsId: commentItem.goods_api_response.id,
                  },
                }"
              >
                <v-img
                  :src="`${commentItem.goods_api_response.goods_image_api_response_list[0].img_name}`"
                  contain
                  height="200"
                  width="200"
                >
                </v-img>
              </router-link>
              <div style="text-align: center">
                {{ commentItem.goods_api_response.gds_name }}
              </div>
            </v-col>
            <v-col>
              <FormTextarea
                :input-content="commentItem.comment"
                :is-detail="isDetail"
                :rules="isDetail ? [true] : commentRules"
                :label="commentItem.comment_label"
              />
            </v-col>
            <v-col cols="12" sm="2">
              <CompButton
                text="modify"
                color="#1E88E5"
                @sendEvent="modDialog(commentItem)"
              />
              <br />
              <CompButton
                text="delete"
                color="#D32F2F"
                @sendEvent="delData(commentItem)"
              />
            </v-col>
          </v-row>
        </div>
        <div v-else align="center">
          <h2>There is no DATA.</h2>
        </div>
      </div>
      <div v-else class="pa-4">
        <v-row align="center">
          <v-col>
            <FormTextarea
              :is-detail="isDetail"
              :input-content.sync="commentInfo.comment"
              :rules="isDetail ? [true] : commentRules"
              label="Comment"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <CompButton text="confirm" color="#43A047" @sendEvent="sendEvent" />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'
import FormTextarea from '@/components/molecules/textarea'
import CompButton from '@/components/molecules/button'

export default {
  components: { FormTextarea, CompButton },
  props: {
    label: {
      type: String,
      required: true,
    },
    commentInfoList: {
      type: Array,
      required: false,
      default: () => {
        return null
      },
    },
    isDetail: {
      type: Boolean,
      required: true,
    },
    dispImages: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
    goodsId: {
      type: Number,
      required: false,
      default: () => {
        return null
      },
    },
  },
  data() {
    return {
      commentInfo: {
        comment: null,
        goods_id: null,
      },
    }
  },
  computed: {
    ...mapState('validation', ['commentRules']),
  },
  methods: {
    sendEvent() {
      this.commentInfo.goods_id = this.goodsId
      this.$emit('sendEvent', this.commentInfo)
      this.commentInfo = { comment: null, goods_id: null }
    },
    modDialog(commentInfo) {
      this.$emit('modDialog', commentInfo)
    },
    delData(commentItem) {
      this.$emit('delData', commentItem.id)
    },
  },
}
</script>
