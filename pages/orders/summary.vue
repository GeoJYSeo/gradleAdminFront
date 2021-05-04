<template>
  <v-container fill-height style="max-width: 1400px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <OrderUserInfoDisp
            :summary="true"
            :order-user-info="orderInfo"
            @sendConfirm="register(orderInfo)"
          />
        </v-card>
        <div class="pa-4">
          <v-row justify="end">
            <v-card color="#263238" width="600">
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
                        Number(orderInfo.total_price).toFixed(2)
                      }}</v-col>
                    </v-row>
                    <v-row v-if="orderInfo.payment_type">
                      <v-col>Payment</v-col>
                      <v-col align="end">{{ orderInfo.payment_type }}</v-col>
                    </v-row>
                  </v-list-item-subtitle>
                  <v-card-actions class="pt-5 justify-end">
                    <CompButton
                      text="confirm"
                      @sendEvent="register(orderInfo)"
                    />
                  </v-card-actions>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-row>
          <ConfirmDialog
            :disp-confirm-dialog="dispConfirmDialog"
            :dialog-contents="dispDialogContents"
            @closeDialog="confirmOrder"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import OrderUserInfoDisp from '@/components/organisms/order_register/user_info_disp'
import ConfirmDialog from '@/components/organisms/confirm_dialog'
import CompButton from '@/components/molecules/button'

export default {
  components: { OrderUserInfoDisp, ConfirmDialog, CompButton },
  data() {
    return {
      states: ['VISA', 'MASTER', 'MAESTRO', 'JBC'],
      orderInfo: null,
    }
  },
  computed: {
    ...mapState('dialog', ['dispConfirmDialog', 'result', 'dialogContents']),
    dispDialogContents() {
      return this.result === 'order'
        ? this.dialogContents[2]
        : this.dialogContents[4]
    },
  },
  async created() {
    await this.setOrderInfo()
  },
  methods: {
    ...mapMutations('dialog', ['closeDialog']),
    ...mapActions('orders/register', ['register', 'moveToMyOrderList']),
    ...mapActions('orders/cart_list', ['moveToGoodsList']),
    setOrderInfo() {
      this.orderInfo = this.$route.params.orderInfo
      if (!this.orderInfo) this.moveToGoodsList()
    },
    async confirmOrder() {
      if (this.result === 'order') {
        this.closeDialog()
        await this.moveToMyOrderList()
      } else if (this.result === 'error') {
        this.closeDialog()
      }
    },
  },
}
</script>
