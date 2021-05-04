<template>
  <v-container fill-height style="max-width: 1500px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-row>
              <v-col>
                <v-toolbar-title>Cart List</v-toolbar-title>
              </v-col>
              <v-spacer></v-spacer>
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
                    <template v-slot:[`item.image`]="{ item }">
                      <v-img
                        :src="
                          require(`../../../uploadedImages/${item.goods_api_response.goods_image_api_response_list[0].gds_thumb_img}`)
                        "
                        height="200"
                        width="300"
                      />
                    </template>
                    <template v-slot:[`item.gds_price`]="{ item }">
                      {{ Number(item.goods_api_response.gds_price).toFixed(2) }}
                    </template>
                    <template v-slot:[`item.cart_price`]="{ item }">
                      {{ Number(item.cart_price).toFixed(2) }}
                    </template>
                    <template v-slot:[`item.modCartGoods`]="{ item }">
                      <v-icon @click="modify(item)"
                        >mdi-square-edit-outline</v-icon
                      >
                    </template>
                    <template v-slot:[`item.delCartGoods`]="{ item }">
                      <v-icon @click="destroy(item)"
                        >mdi-delete-circle-outline</v-icon
                      >
                    </template>
                    <template v-slot:[`item.cart_quantity`]="{ item }">
                      <div v-if="item.goods_api_response.gds_stock === '0'">
                        Out of Stock
                      </div>
                      <v-row v-else no-gutters justify="center">
                        <v-col sm="2">
                          <v-btn icon @click="plusQty(item)">
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col sm="3">
                          <v-text-field
                            v-model="item.cart_quantity"
                            :rules="stockRules"
                            dense
                            hide-details
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col sm="2">
                          <v-btn icon @click="minusQty(item)">
                            <v-icon>mdi-minus-circle-outline</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
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
                          text="order"
                          color="#009688"
                          :disabled="btnAct"
                          @sendEvent="moveToOrderList"
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
import authMiddleware from '@/middleware/auth'
import ProgressLiner from '@/components/molecules/progress_liner'
import IconButton from '@/components/molecules/icon_button'
import RoundButton from '@/components/molecules/round_button'

export default {
  middleware: [authMiddleware.loginAuthentication()],
  components: { ProgressLiner, RoundButton, IconButton },
  computed: {
    ...mapState('validation', ['stockRules']),
    ...mapState('orders/cart_list', ['cartInfoList', 'headers', 'footerProps']),
    cartInfo() {
      return JSON.parse(JSON.stringify(this.cartInfoList))
    },
    totalPrice() {
      if (this.cartInfo.length) {
        this.cartInfo.forEach((cart) => {
          if (cart.goods_api_response.gds_stock === '0') {
            cart.cart_price = 0
          }
        })
        return this.cartInfo
          .map((cart) => cart.cart_price)
          .reduce((a, b) => a + b)
      } else {
        return 0
      }
    },
    btnAct() {
      return !this.cartInfo.length || false
    },
  },
  async created() {
    await this.getCartList()
  },
  methods: {
    ...mapActions('orders/cart_list', [
      'getCartList',
      'modify',
      'destroy',
      'moveToOrderList',
      'back',
    ]),
    plusQty(item) {
      const gdsStock = this.cartInfo.find(
        (cart) => cart.goods_api_response.id === item.goods_api_response.id
      ).goods_api_response.gds_stock

      item.cart_quantity =
        ++item.cart_quantity > gdsStock
          ? item.goods_api_response.gds_stock
          : item.cart_quantity
    },
    minusQty(item) {
      item.cart_quantity = --item.cart_quantity < 1 ? 1 : item.cart_quantity--
    },
    async modGoods(item) {
      await this.modify(item)
      // this.setCartInfo()
    },
  },
}
</script>
