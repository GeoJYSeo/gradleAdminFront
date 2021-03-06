<template>
  <v-container fill-height style="max-width: 1400px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Goods Detail</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!cartInfo.goods_api_response" />
          <div v-else class="pa-4">
            <v-row>
              <v-col>
                <v-carousel height="500">
                  <v-carousel-item
                    v-for="(image, index) in goodsDetailInfo.goods_api_response
                      .goods_image_api_response_list"
                    :key="index"
                    :src="require(`@/static/${image.gds_img}`)"
                    style="width: 1000px"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  ></v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col>
                <v-row>
                  <v-card color="#000000" width="360">
                    <v-row justify="center">
                      <div class="pt-6">
                        <img
                          :src="
                            require(`@/static/${goodsDetailInfo.goods_api_response.goods_image_api_response_list[0].gds_thumb_img}`)
                          "
                        />
                      </div>
                    </v-row>
                    <v-row class="px-3">
                      <v-card-title class="pl-10">{{
                        cartInfo.goods_api_response.gds_name
                      }}</v-card-title>
                    </v-row>
                    <v-row class="px-3">
                      <v-spacer></v-spacer>
                      <v-card-title class="px-5">
                        ${{
                          Number(cartInfo.goods_api_response.gds_price).toFixed(
                            2
                          )
                        }}
                      </v-card-title>
                    </v-row>
                    <v-row v-if="outOfStock">
                      <v-col align="center"><h1>Out of Stock</h1></v-col>
                    </v-row>
                    <v-row v-else class="px-3">
                      <v-col>
                        <v-card-actions class="justify-center">
                          <v-btn
                            color="#E65100"
                            outlined
                            rounded
                            @click="cartRegister(cartInfo)"
                          >
                            Add to CART
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col sm="5">
                        <v-card-actions class="justify-center">
                          <v-btn icon @click="plusQty">
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-btn>
                          <v-text-field
                            v-model="cartInfo.cart_quantity"
                            :rules="stockRules"
                            dense
                            hide-details
                            outlined
                          ></v-text-field>
                          <v-btn icon @click="minusQty">
                            <v-icon>mdi-minus-circle-outline</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-row>
                <v-row class="pt-5">
                  <v-col>
                    <RoundButton
                      text="order"
                      color="#69F0AE"
                      :disabled="outOfStock"
                      @sendEvent="moveToOrder([cartInfo])"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <RoundButton
                      text="back"
                      color="#651FFF"
                      @sendEvent="back"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="cartInfo.goods_api_response.gds_desc"
                  label="Gooods Description"
                  outlined
                  readonly
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <ConfirmDialog
          :disp-confirm-dialog="dispConfirmDialog"
          :dialog-contents="dispDialogContents"
          @closeDialog="closeDialog"
        />
      </v-flex>
      <v-flex v-if="!isLogin" class="pt-15" xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title class="flex text-center"
              >Should<v-btn color="#1565C0" text :to="{ name: 'login' }"
                >LOGIN</v-btn
              >{{ commentLabel }}</v-toolbar-title
            >
          </v-toolbar>
        </v-card>
      </v-flex>
      <CommentRegisterForm
        v-else
        label="Comment"
        :is-detail="false"
        :goods-id="Number(this.$route.query.gdsId)"
        @sendEvent="commentRegister"
      />
      <CommentRegisterForm
        label="Comment List"
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
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ProgressLiner from '@/components/molecules/progress_liner'
import ConfirmDialog from '@/components/organisms/confirm_dialog'
import CommentRegisterForm from '@/components/organisms/goods_register/comment_form'
import CommentFormDialog from '@/components/organisms/comment_form_dialog'
import RoundButton from '@/components/molecules/round_button'

export default {
  components: {
    ProgressLiner,
    ConfirmDialog,
    CommentRegisterForm,
    CommentFormDialog,
    RoundButton,
  },
  data() {
    return {
      cartInfo: {
        cart_quantity: 1,
        cart_price: null,
      },
      isLogin: null,
      curPageNum: 1,
      dispItemCount: 8,
    }
  },
  computed: {
    ...mapState('validation', ['stockRules']),
    ...mapState('goods/detail', ['goodsDetailInfo']),
    ...mapState('dialog', [
      'dispConfirmDialog',
      'dispCommentDialog',
      'addCart',
      'regComment',
      'delComment',
      'dialogContents',
    ]),
    ...mapState('comments/list', ['commentInfoList', 'commentLabel']),
    ...mapState('comments/detail', ['detailComment']),
    dispDialogContents() {
      return this.addCart === 'success'
        ? this.dialogContents[0]
        : this.regComment === 'success'
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
    outOfStock() {
      return this.goodsDetailInfo.goods_api_response.gds_stock === '0'
    },
  },
  async created() {
    await this.setCartInfo()
    await this.getCommentInfoList(this.cartInfo.goods_api_response.id)
    this.isLogin = !!sessionStorage.getItem('accessToken')
  },
  methods: {
    ...mapMutations('dialog', ['setDispCommentDialog', 'closeDialog']),
    ...mapMutations('comments/detail', ['setDetailComment']),
    ...mapActions('goods/detail', [
      'getGoodsDetailInfo',
      'moveToOrder',
      'back',
    ]),
    ...mapActions('orders/cart_register', ['cartRegister']),
    ...mapActions('comments/list', ['getCommentInfoList']),
    ...mapActions('comments/register', ['commentRegister']),
    ...mapActions('comments/detail', ['modify', 'destroy']),
    async setCartInfo() {
      await this.getGoodsDetailInfo(this.$route.query.gdsId)
      this.cartInfo.cart_price = this.goodsDetailInfo.goods_api_response.gds_price
      this.cartInfo.goods_api_response = this.goodsDetailInfo.goods_api_response
      this.cartInfo.user_api_response = this.goodsDetailInfo.user_api_response
      this.cartInfo.goods_ids = [this.goodsDetailInfo.goods_api_response.id]
    },
    plusQty() {
      this.cartInfo.cart_quantity =
        ++this.cartInfo.cart_quantity >
        this.cartInfo.goods_api_response.gds_stock
          ? this.cartInfo.goods_api_response.gds_stock
          : this.cartInfo.cart_quantity++
      this.setCartPrice()
    },
    minusQty() {
      this.cartInfo.cart_quantity =
        --this.cartInfo.cart_quantity < 1 ? 1 : this.cartInfo.cart_quantity--
      this.setCartPrice()
    },
    setCartPrice() {
      this.cartInfo.cart_price =
        Number(this.cartInfo.cart_quantity).toFixed(2) *
        this.goodsDetailInfo.goods_api_response.gds_price
    },
    setDialogDetailComment(commentInfo) {
      this.setDetailComment(commentInfo)
      this.setDispCommentDialog()
    },
  },
}
</script>
