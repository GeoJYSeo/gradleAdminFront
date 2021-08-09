<template>
  <v-card class="mt-5 mx-auto" max-width="1000" outlined>
    <v-list-item>
      <v-list-item-content>
        <h3>Order Number</h3>
        <v-list-item-title class="mb-4">
          <div class="orderItemText">
            {{ orderDetailInfo.order_num }}
          </div>
        </v-list-item-title>
        <h3>Orderer</h3>
        <v-list-item-subtitle class="mb-4">
          <div class="orderItemText">
            {{ orderDetailInfo.user_api_response.user_email }}
          </div>
        </v-list-item-subtitle>
        <h3>Order Recipient</h3>
        <v-list-item-subtitle class="mb-4">
          <div class="orderItemText">
            {{ orderDetailInfo.order_rcp }}
          </div>
        </v-list-item-subtitle>
        <h3>Order Address</h3>
        <v-list-item-subtitle class="mb-4">
          <div class="orderItemText">
            ({{ orderDetailInfo.post_code }})
            {{ orderDetailInfo.user_addr1 }}
            {{ orderDetailInfo.user_addr2 }}
            {{ orderDetailInfo.user_addr3 }}
          </div>
        </v-list-item-subtitle>
        <h3>Order Total Price</h3>
        <v-list-item-subtitle class="mb-4">
          <div class="orderItemText">
            {{ Number(orderDetailInfo.total_price).toFixed(2) }}
          </div>
        </v-list-item-subtitle>
        <h3>Order Date</h3>
        <v-list-item-subtitle class="mb-4">
          <div class="orderItemText">
            {{ orderDetailInfo.order_date }}
          </div>
        </v-list-item-subtitle>
        <h3>Order Status</h3>
        <v-card-actions
          v-if="
            isAdmin &&
            !['CANCELLED', 'Order Confirmed'].includes(
              orderDetailInfo.order_status
            )
          "
        >
          <v-spacer />
          <div>
            <CompButton
              class="orderSatus"
              :block="false"
              text="Confirm Cancel"
              @sendEvent="confirmCancelOrder"
            />
          </div>
        </v-card-actions>
        <v-card-actions
          v-else-if="
            !isAdmin &&
            !['CANCELLED', 'Cancel Pending'].includes(
              orderDetailInfo.order_status
            )
          "
        >
          <v-spacer />
          <div>
            <CompButton
              class="orderSatus"
              :block="false"
              text="Cancel"
              @sendEvent="cancelOrder"
            />
          </div>
        </v-card-actions>
        <div v-else>
          <v-list-item-subtitle class="mb-4">
            <div class="orderItemText">
              {{ orderDetailInfo.order_status }}
            </div>
          </v-list-item-subtitle>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import CompButton from '@/components/molecules/button'

export default {
  components: { CompButton },
  props: {
    orderDetailInfo: {
      type: Object,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
  },
  methods: {
    cancelOrder() {
      this.$emit('cancelOrder', this.orderDetailInfo)
    },
    confirmCancelOrder() {
      this.$emit('confirmCancelOrder', this.orderDetailInfo)
    },
  },
}
</script>

<style scoped>
.orderItemText {
  text-align: right;
}
</style>
