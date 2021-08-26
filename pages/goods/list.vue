<template>
  <v-container fill-height style="max-width: 1600px" class="pa-15">
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
              <v-col cols="12" sm="1">
                <IconButton text="mdi-transfer-left" @sendEvent="back" />
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
                  >
                    <v-row class="justify-center">
                      <v-card min-width="440" color="#424242">
                        <div class="image-wrapper">
                          <router-link
                            :to="{
                              name: 'goods-detail',
                              query: { gdsId: goodsInfo.id },
                            }"
                          >
                            <v-img
                              :src="`${goodsInfo.goods_image_api_response_list[0].img_name}`"
                              contain
                              height="200"
                              width="300"
                            >
                            </v-img>
                          </router-link>
                        </div>
                        <v-card color="#263238">
                          <v-card-title class="justify-center">
                            [{{ goodsInfo.category_api_response.cate_name }}-
                            {{ goodsInfo.cate_code }}]
                            {{ goodsInfo.gds_name }}
                          </v-card-title>
                          <v-card-actions class="justify-right">
                            <v-spacer></v-spacer>
                            <v-btn
                              color="#009688"
                              outlined
                              rounded
                              :disabled="goodsInfo.gds_stock === '0'"
                              @click="setCartInfo(goodsInfo)"
                            >
                              <div v-if="goodsInfo.gds_stock === '0'">
                                Out of Stock
                              </div>
                              <div v-else>
                                ${{ Number(goodsInfo.gds_price).toFixed(2) }}
                              </div>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-card>
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
        <ConfirmDialog
          :disp-confirm-dialog="dispConfirmDialog"
          :dialog-contents="dialogContents[0]"
          @closeDialog="closeDialog"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ProgressLiner from '@/components/molecules/progress_liner'
import ConfirmDialog from '@/components/organisms/confirm_dialog'
import IconButton from '@/components/molecules/icon_button'

export default {
  components: { ProgressLiner, ConfirmDialog, IconButton },
  data() {
    return {
      curPageNum: 1,
      keyword: '',
      accessToken: null,
    }
  },
  computed: {
    ...mapState('goods/list', [
      'goodsInfoList',
      'pagination',
      'plusCurPageNum',
    ]),
    ...mapState('dialog', ['dispConfirmDialog', 'dialogContents']),
  },
  watch: {
    curPageNum(newVal) {
      this.getGoodsList([newVal, this.keyword])
    },
  },
  async created() {
    await this.getGoodsList([
      this.curPageNum,
      this.keyword,
      this.$route.params.categoryName,
    ])
  },
  destroyed() {
    this.initGoodsInfo()
  },
  methods: {
    ...mapMutations('dialog', ['closeDialog']),
    ...mapMutations('goods/list', ['initGoodsInfo']),
    ...mapActions('goods/list', ['getGoodsList', 'back']),
    ...mapActions('orders/cart_register', ['cartRegister']),
    init() {
      this.keyword = ''
      this.getGoodsList([this.curPageNum, this.keyword])
    },
    setCartInfo(goodsInfo) {
      this.cartRegister({ cart_quantity: 1, goods_api_response: goodsInfo })
    },
  },
}
</script>

<style scoped>
.image-wrapper {
  display: flex;
  padding: 20px;
  justify-content: center;
}
</style>
