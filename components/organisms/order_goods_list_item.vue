<template>
  <v-card class="mb-5 mx-auto" width="1000" outlined>
    <v-list-item>
      <v-list-item-content>
        <v-row>
          <v-col align="center" sm="3">
            <router-link
              :to="{
                name: 'goods-detail',
                query: {
                  gdsId: orderDetailInfo.goods_api_response.id,
                },
              }"
            >
              <v-img
                :src="`${orderDetailInfo.goods_api_response.goods_image_api_response_list[0].img_name}`"
                contain
                height="200"
                width="200"
              >
              </v-img>
            </router-link>
          </v-col>
          <v-col>
            <h3>Goods Name</h3>
            <v-list-item-title class="mb-4">
              <div class="orderGoodsItemText">
                {{ orderDetailInfo.goods_api_response.gds_name }}
              </div>
            </v-list-item-title>
            <h3>Goods Price</h3>
            <v-list-item-title class="mb-4">
              <div class="orderGoodsItemText">
                {{
                  Number(orderDetailInfo.goods_api_response.gds_price).toFixed(
                    2
                  )
                }}
              </div>
            </v-list-item-title>
            <h3>Goods Order Quantity</h3>
            <v-list-item-title class="mb-4">
              <div class="orderGoodsItemText">
                {{ orderDetailInfo.goods_quantity }}
              </div>
            </v-list-item-title>
            <h3>Goods Order Total Price</h3>
            <v-list-item-title class="mb-4">
              <div class="orderGoodsItemText">
                {{ Number(orderDetailInfo.goods_total_price).toFixed(2) }}
              </div>
            </v-list-item-title>
            <h3>Goods Key</h3>
            <v-list-item-title class="mb-4">
              <div
                v-for="goods_key in orderDetailInfo.goods_key_api_response_list"
                :key="goods_key.id"
                class="orderGoodsItemText mb-4"
              >
                <div v-if="!!goods_key.status" class="orderGoodsItemText">
                  <div v-if="goods_key.status === 'CANCELLED'">
                    {{ goods_key.status }}
                  </div>
                  <div v-else>
                    {{ goods_key.reg_key }}
                  </div>
                </div>
                <div v-else>
                  <CompButton
                    class="orderSatus"
                    :block="false"
                    text="Click to REVEAL"
                    @sendEvent="changeGoodsKeyState(goods_key.id)"
                  />
                </div>
              </div>
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    {{ orderDetailInfo.goods_key_api_response_list }}
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
    orderId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changeGoodsKeyState(goodsKeyId) {
      const ids = {
        goodsKeyId,
        orderId: this.orderId,
      }
      this.$emit('changeGoodsKeyState', ids)
    },
  },
}
</script>

<style scoped>
.orderGoodsItemText {
  text-align: right;
}
</style>
