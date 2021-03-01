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
                :src="
                  require(`@/static/${orderDetailInfo.goods_api_response.goods_image_api_response_list[0].gds_thumb_img}`)
                "
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
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    orderDetailInfo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.orderGoodsItemText {
  text-align: right;
}
</style>
