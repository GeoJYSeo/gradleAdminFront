<template>
  <v-container fill-height style="max-width: 1400px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-row>
              <v-col>
                <v-toolbar-title>My Order List</v-toolbar-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="1">
                <IconButton text="mdi-transfer-left" @sendEvent="back" />
              </v-col>
            </v-row>
          </v-toolbar>
          <ProgressLiner v-if="!orderInfoList" />
          <div v-else-if="orderInfoList.length === 0" align="center">
            <h2>There is no DATA.</h2>
          </div>
          <v-card v-else class="pt-7">
            <v-card
              v-for="(orderInfo, index) in orderInfoList"
              :key="index"
              class="mt-5 mx-auto"
              max-width="1000"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <h3>Order Number</h3>
                  <v-list-item-title class="mb-4">
                    <div class="orderItemText">
                      <router-link
                        :to="{
                          name: 'member-mypage-order-detail',
                          query: {
                            orderId: orderInfo.id,
                          },
                        }"
                        >{{ orderInfo.order_num }}
                      </router-link>
                    </div>
                  </v-list-item-title>
                  <h3>Orderer</h3>
                  <v-list-item-subtitle class="mb-4">
                    <div class="orderItemText">
                      {{ orderInfo.user_api_response.user_email }}
                    </div>
                  </v-list-item-subtitle>
                  <h3>Order Recipient</h3>
                  <v-list-item-subtitle class="mb-4">
                    <div class="orderItemText">{{ orderInfo.order_rcp }}</div>
                  </v-list-item-subtitle>
                  <h3>Order Address</h3>
                  <v-list-item-subtitle class="mb-4">
                    <div class="orderItemText">
                      ({{ orderInfo.post_code }}) {{ orderInfo.user_addr1 }}
                      {{ orderInfo.user_addr2 }} {{ orderInfo.user_addr3 }}
                    </div>
                  </v-list-item-subtitle>
                  <h3>Order Total Price</h3>
                  <v-list-item-subtitle class="mb-4">
                    <div class="orderItemText">
                      {{ Number(orderInfo.total_price).toFixed(2) }}
                    </div>
                  </v-list-item-subtitle>
                  <h3>Order Date</h3>
                  <v-list-item-subtitle class="mb-4">
                    <div class="orderItemText">
                      {{ orderInfo.order_date }}
                    </div>
                  </v-list-item-subtitle>
                  <h3>Order Status</h3>
                  <v-list-item-subtitle class="mb-4">
                    <div class="orderItemText">
                      {{ orderInfo.order_status }}
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
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
import ProgressLiner from '@/components/molecules/progress_liner'
import IconButton from '@/components/molecules/icon_button'

export default {
  components: { ProgressLiner, IconButton },
  data() {
    return {
      curPageNum: 0,
    }
  },
  computed: {
    ...mapState('member/mypage/orders/list', ['orderInfoList']),
    ...mapState('pagination', ['pagination', 'plusCurPageNum']),
  },
  watch: {
    curPageNum(newVal) {
      this.getOrderInfoList(--newVal)
    },
  },
  async created() {
    await this.getOrderInfoList(this.curPageNum)
  },
  methods: {
    ...mapActions('member/mypage/orders/list', ['getOrderInfoList', 'back']),
  },
}
</script>

<style scoped>
.orderItemText {
  text-align: right;
}
</style>
