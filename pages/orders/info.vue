<template>
  <v-container fill-height style="max-width: 1500px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <ProgressLiner v-if="!orderUserInfo" />
        <div v-else class="pa-4">
          <v-row>
            <v-col cols="12" sm="10">
              <v-row>
                <v-col>
                  <OrderUserInfoDisp
                    v-if="modOrderUserInfoFlg"
                    :order-user-info="orderUserInfo"
                    @sendOrderInfo="setOrderInfo(orderUserInfo)"
                    @modOrderUserInfo="modOrderUserInfo"
                  />
                  <OrderUserInfoForm
                    v-else
                    :de-order-user-info="orderUserInfo"
                    :color-title="colorTitle"
                    @sendOrderUserInfo="execModAndSend"
                  />
                </v-col>
              </v-row>
              <v-row class="pt-15">
                <v-col>
                  <OrderUserInfoForm @sendOrderUserInfo="setOrderInfo" />
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
              <v-row>
                <v-col>
                  <v-card color="#263238" width="220">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-1">
                          <v-row>
                            <v-col align="center">CART SUMMARY</v-col>
                          </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <v-row>
                            <v-col>TOTAL</v-col>
                            <v-col align="end">{{
                              Number(totalPrice).toFixed(2)
                            }}</v-col>
                          </v-row>
                          <v-row v-if="orderInfo.payment_type">
                            <v-col>Payment</v-col>
                            <v-col align="end">{{
                              orderInfo.payment_type
                            }}</v-col>
                          </v-row>
                        </v-list-item-subtitle>
                        <v-card-actions class="pt-5 justify-end">
                          <RoundButton
                            text="check out"
                            color="#009688"
                            :disabled="btnAct"
                            @sendEvent="moveToOrderSum(orderInfo)"
                          />
                        </v-card-actions>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <div class="pt-10">
                    <CompButton text="back" @sendEvent="back" />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <v-dialog v-model="paymentDialog" persistent width="800">
          <ExpansionList
            @sendPaymentType="setPaymentType"
            @closeDialog="closePaymentDialog"
          />
        </v-dialog>
        <ConfirmDialog
          :disp-confirm-dialog="dispConfirmDialog"
          :dialog-contents="stockError"
          @closeDialog="closeOutOfStock"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'
import ProgressLiner from '@/components/molecules/progress_liner'
import OrderUserInfoDisp from '@/components/organisms/order_register/user_info_disp'
import OrderUserInfoForm from '@/components/organisms/order_register/user_info_form'
import ExpansionList from '@/components/organisms/order_register/expansion_list'
import CompButton from '@/components/molecules/button'
import ConfirmDialog from '@/components/organisms/confirm_dialog'

export default {
  middleware: [authMiddleware.loginAuthentication()],
  components: {
    ProgressLiner,
    OrderUserInfoDisp,
    OrderUserInfoForm,
    ExpansionList,
    CompButton,
    ConfirmDialog,
  },
  data() {
    return {
      cartInfo: null,
      orderInfo: { payment_type: null },
      orderUserInfo: null,
      modOrderUserInfoFlg: true,
      colorTitle: {
        title: 'Modify User Address',
        color: '#2E7D32',
      },
      paymentDialog: false,
      btnAct: true,
    }
  },
  computed: {
    ...mapState('orders/cart_list', ['cartInfoList']),
    ...mapState('login', ['userInfo']),
    ...mapState('orders/info', ['stockError', 'dispConfirmDialog']),
    totalQuantity() {
      return this.cartInfo
        .map((cart) => cart.cart_quantity)
        .reduce((a, b) => a + b)
    },
    totalPrice() {
      return this.cartInfo
        .map((cart) => cart.cart_price)
        .reduce((a, b) => a + b)
    },
  },
  async created() {
    await this.setCartUserInfo()
    await this.hasUserAddress()
  },
  methods: {
    ...mapMutations('orders/info', ['closeOutOfStock']),
    ...mapActions('login', ['getMemberInfo']),
    ...mapActions('orders/cart_list', ['getCartList']),
    ...mapActions('orders/info', [
      'orderUserInfoModify',
      'moveToOrderSum',
      'moveToGoodsList',
      'moveToOrderList',
      'back',
    ]),
    async setCartUserInfo() {
      if (this.$route.params.cartInfoList) {
        this.cartInfo = this.$route.params.cartInfoList
        this.getMemberInfo()
        this.orderUserInfo = JSON.parse(JSON.stringify(this.userInfo))
      } else {
        await this.getCartList()
        this.cartInfo = JSON.parse(JSON.stringify(this.cartInfoList))
        this.orderUserInfo = this.cartInfo[0].user_api_response
      }
      if (!this.cartInfo) {
        this.moveToGoodsList()
      } else {
        this.cartInfo.forEach((cart) => {
          if (cart.goods_api_response.gds_stock === '0') {
            cart.cart_price = 0
          }
        })
      }
    },
    hasUserAddress() {
      delete this.orderUserInfo.birthday
      this.modOrderUserInfoFlg = !Object.values(this.orderUserInfo).includes(
        null
      )
    },
    setOrderInfo(newOrderUserInfo) {
      this.orderInfo = { ...this.orderInfo, ...newOrderUserInfo }
      this.orderInfo.cart_api_request = this.cartInfo
      this.orderInfo.total_price = this.totalPrice
      this.orderInfo.total_quantity = this.totalQuantity
      this.orderInfo.user_id = this.orderUserInfo.id
      this.paymentDialog = true
    },
    modOrderUserInfo() {
      if (confirm('Are you sure to modify ADDRESS in your profile?')) {
        this.modOrderUserInfoFlg = false
      }
    },
    execModAndSend(orderUserInfo) {
      this.orderUserInfoModify(orderUserInfo)
      this.setOrderInfo(orderUserInfo)
    },
    setPaymentType(paymentType) {
      this.orderInfo.payment_type = paymentType
      this.btnAct = false
      this.closePaymentDialog()
    },
    closePaymentDialog(close) {
      this.paymentDialog = close
    },
  },
}
// this.orderUserInfo = this.$route.params.cartInfo
//   ? this.$route.params.cartInfo[0].user_api_response
//   : {}
// const emptyOrderUserInfo = new Set(Object.values(this.orderUserInfo))
</script>
