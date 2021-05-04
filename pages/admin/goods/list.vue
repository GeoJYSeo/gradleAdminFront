<template>
  <v-container fill-height style="max-width: 1200px" class="pa-15">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-row>
              <v-col>
                <v-toolbar-title>Goods List</v-toolbar-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <v-text-field
                  v-model="keyword"
                  prepend-icon="mdi-magnify"
                  clearable
                  hide-details
                  single-line
                  @click:prepend="getGoodsList([curPageNum, keyword])"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="1">
                <IconButton text="mdi-refresh" @sendEvent="init" />
              </v-col>
            </v-row>
          </v-toolbar>
          <ProgressLiner v-if="!goodsInfoList || !pagination" />
          <div v-else-if="goodsInfoList.length === 0" align="center">
            <h2>There is no DATA.</h2>
          </div>
          <div v-else class="pa-4">
            <v-card flat>
              <v-container>
                <v-row>
                  <v-col
                    v-for="(goodsInfo, index) in goodsInfoList"
                    :key="index"
                    cols="12"
                    sm="4"
                  >
                    <v-row :justify="justify">
                      <v-card>
                        <router-link
                          :to="{
                            name: 'admin-goods-detail',
                            query: { gdsId: goodsInfo.id },
                          }"
                        >
                          <v-img
                            :src="
                              require(`../../../../uploadedImages/${goodsInfo.goods_image_api_response_list[0].gds_thumb_img}`)
                            "
                            contain
                            height="200"
                            width="300"
                          >
                          </v-img>
                        </router-link>
                      </v-card>
                    </v-row>
                    <v-row :justify="justify">
                      ({{ goodsInfo.cate_code }})
                      {{ goodsInfo.gds_name }}
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-pagination
              v-model="curPageNum"
              :length="pagination.total_pages"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-card>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="2">
            <v-btn
              block
              large
              depressed
              color="#424242"
              class="white--text"
              @click="back"
              >back</v-btn
            >
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'
import ProgressLiner from '@/components/molecules/progress_liner'

export default {
  components: { ProgressLiner },
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  data() {
    return {
      curPageNum: 1,
      keyword: '',
      justify: 'center',
      accessToken: null,
    }
  },
  computed: {
    ...mapState('admin/goods/list', ['goodsInfoList']),
    ...mapState('pagination', ['pagination', 'plusCurPageNum']),
  },
  watch: {
    curPageNum(newVal) {
      this.getGoodsList([newVal, this.keyword])
    },
  },
  async created() {
    await this.getGoodsList([this.curPageNum, this.keyword])
  },
  methods: {
    ...mapActions('admin/goods/list', ['getGoodsList', 'back']),
    init() {
      this.keyword = ''
      this.getGoodsList([this.curPageNum, this.keyword])
    },
  },
}
</script>
