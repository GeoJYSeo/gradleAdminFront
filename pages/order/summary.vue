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
        <ConfirmDialog
          :disp-confirm-dialog="dispConfirmDialog"
          :dialog-contents="dispDialogContents"
          @closeDialog="confirmOrder"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import OrderUserInfoDisp from '@/components/organisms/order_register/user_info_disp'
import ConfirmDialog from '@/components/organisms/confirm_dialog'

export default {
  components: { OrderUserInfoDisp, ConfirmDialog },
  data() {
    return {
      states: ['VISA', 'MASTER', 'MAESTRO', 'JBC'],
      orderInfo: null,
    }
  },
  computed: {
    ...mapState('dialog', ['dispConfirmDialog', 'regOrder', 'dialogContents']),
    dispDialogContents() {
      return this.regOrder === 'success'
        ? this.dialogContents[2]
        : this.dialogContents[4]
    },
  },
  async created() {
    await this.setInfo()
  },
  methods: {
    ...mapMutations('dialog', ['closeDialog']),
    ...mapActions('order/register', ['register', 'moveToMyOrderList']),
    ...mapActions('order/cart_list', ['moveToGoodsList']),
    setInfo() {
      this.orderInfo = this.$route.params.orderInfo
      if (!this.orderInfo) this.moveToGoodsList()
    },
    confirmOrder() {
      this.closeDialog()
      if (!this.dispConfirmDialog) {
        this.moveToMyOrderList()
      }
    },
  },
}
</script>
