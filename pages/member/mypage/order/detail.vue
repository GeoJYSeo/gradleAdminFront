<template>
  <v-container fill-height style="max-width: 1400px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-row>
              <v-col>
                <v-toolbar-title>My Order Detail</v-toolbar-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="1">
                <IconButton text="mdi-transfer-left" @sendEvent="back" />
              </v-col>
            </v-row>
          </v-toolbar>
          <ProgressLiner v-if="!orderDetailInfo" />
          <v-card v-else class="pt-7">
            <OrderList
              :order-detail-info="orderDetailInfo"
              @changeOrderState="changeOrderState"
            />
            <v-row justify="center">
              <v-card class="pt-10" max-width="1000">
                <v-toolbar flat dark color="#00796B">
                  <v-toolbar-title>My Order Goods</v-toolbar-title>
                </v-toolbar>
                <OrderGoodsList
                  v-for="(orderGoodsInfo,
                  index) in orderDetailInfo.order_detail_api_response_list"
                  :key="index"
                  :order-detail-info="orderGoodsInfo"
                  @changeOrderState="changeOrderState"
                />
              </v-card>
            </v-row>
            <v-pagination
              v-if="pagination"
              v-model="curPageNum"
              :length="pagination.total_pages"
              :total-visible="7"
            ></v-pagination>
          </v-card>
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
import OrderList from '@/components/organisms/order_list_item'
import OrderGoodsList from '@/components/organisms/order_goods_list_item'

export default {
  middleware: [authMiddleware.loginAuthentication()],
  components: { ProgressLiner, IconButton, OrderList, OrderGoodsList },
  data() {
    return {
      curPageNum: 0,
    }
  },
  computed: {
    ...mapState('member/mypage/orders/detail', ['orderDetailInfo']),
    ...mapState('pagination', ['pagination', 'plusCurPageNum']),
  },
  watch: {
    curPageNum(newVal) {
      this.getGoodsList([newVal, this.keyword])
    },
  },
  async created() {
    await this.getOrderDetailInfo(this.$route.query.orderId)
  },
  methods: {
    ...mapActions('member/mypage/orders/detail', [
      'getOrderDetailInfo',
      'changeOrderState',
      'back',
    ]),
  },
}
</script>
