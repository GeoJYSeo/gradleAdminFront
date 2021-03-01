<template>
  <v-container fill-height style="max-width: 1500px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-row>
              <v-col>
                <v-toolbar-title>Goods Order List</v-toolbar-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="1">
                <IconButton
                  text="mdi-circle-edit-outline"
                  @sendEvent="moveToCartList"
                />
              </v-col>
              <v-col cols="12" sm="1">
                <IconButton text="mdi-transfer-left" @sendEvent="back" />
              </v-col>
            </v-row>
          </v-toolbar>
          <ProgressLiner v-if="!cartInfo" />
          <div v-else class="pa-4">
            <v-row>
              <v-col cols="12" sm="10">
                <template>
                  <v-data-table
                    class="pb-4"
                    :headers="headers"
                    :items="cartInfo"
                    show-group-by
                    :footer-props="footerProps"
                  >
                    <template
                      v-slot:[`item.image`]="{
                        item,
                      }"
                    >
                      <img
                        :src="
                          require(`@/static/${item.goods_api_response.goods_image_api_response_list[0].gds_thumb_img}`)
                        "
                        height="200"
                        width="300"
                      />
                    </template>
                    <template v-slot:[`item.gds_price`]="{ item }">
                      {{ Number(item.goods_api_response.gds_price).toFixed(2) }}
                    </template>
                    <template v-slot:[`item.cart_quantity`]="{ item }">
                      <div v-if="item.goods_api_response.gds_stock === '0'">
                        Out of Stock
                      </div>
                      <div v-else>
                        {{ item.cart_quantity }}
                      </div>
                    </template>
                    <template v-slot:[`item.cart_price`]="{ item }">
                      {{ Number(item.cart_price).toFixed(2) }}
                    </template>
                    <template v-slot:[`item.delGoods`]="{ item }">
                      <v-icon @click="delOrderList(item.id)"
                        >mdi-delete-circle-outline</v-icon
                      >
                    </template>
                  </v-data-table>
                </template>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-card color="#263238" width="220">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">
                        <v-row>
                          <v-col style="text-align: right">CART SUMMARY</v-col>
                        </v-row>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <v-row>
                          <v-col>TOTAL</v-col>
                          <v-col style="text-align: right">{{
                            Number(totalPrice).toFixed(2)
                          }}</v-col>
                        </v-row>
                      </v-list-item-subtitle>
                      <v-card-actions class="justify-end">
                        <RoundButton
                          text="check out"
                          color="#009688"
                          :disabled="btnAct"
                          @sendEvent="moveToOrderInfo(cartInfo)"
                        />
                      </v-card-actions>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import progressLiner from '@/components/molecules/progress_liner'
import IconButton from '@/components/molecules/icon_button'

export default {
  components: { progressLiner, IconButton },
  data() {
    return {
      cartInfo: null,
    }
  },
  computed: {
    ...mapState('order/cart_list', ['cartInfoList']),
    ...mapState('order/list', ['headers', 'footerProps']),
    btnAct() {
      return !this.cartInfo.length || false
    },
    totalPrice() {
      if (this.cartInfo.length) {
        return this.cartInfo
          .map((cart) => cart.cart_price)
          .reduce((a, b) => a + b)
      } else {
        return 0
      }
    },
  },
  created() {
    this.setCartInfo()
  },
  methods: {
    ...mapActions('order/cart_list', ['getCartList', 'moveToCartList']),
    ...mapActions('order/list', ['delCartGoods', 'moveToOrderInfo', 'back']),
    async setCartInfo() {
      if (this.$route.params.cartInfo) {
        this.cartInfo = this.$route.params.cartInfo
      } else {
        await this.getCartList()
        this.cartInfo = this.cartInfoList
        if (!this.cartInfoList) this.moveToCartList()
      }
      this.cartInfo = this.cartInfo.filter(
        (cart) => cart.goods_api_response.gds_stock !== '0'
      )
    },
    delOrderList(cartId) {
      if (cartId) {
        this.delCartGoods(cartId)
      } else {
        this.cartInfo = []
      }
    },
  },
}
</script>
