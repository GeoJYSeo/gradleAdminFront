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
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="isAdmin">
            <CompButton
              class="orderSatus"
              :block="false"
              text="Ready to order"
              @sendEvent="changeOrderState(0)"
            />
            <CompButton
              class="orderSatus"
              :block="false"
              text="Shipped"
              @sendEvent="changeOrderState(1)"
            />
          </div>
          <CompButton
            v-else
            class="orderSatus"
            :block="false"
            text="Cancel"
            @sendEvent="orderCancel"
          />
        </v-card-actions>
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
    changeOrderState(orderStatus) {
      this.orderDetailInfo.order_status = orderStatus
      this.$emit('changeOrderState', this.orderDetailInfo)
    },
    orderCancel() {
      this.$emit('orderCancel')
    },
  },
}
</script>

<style scoped>
.orderItemText {
  text-align: right;
}
</style>
