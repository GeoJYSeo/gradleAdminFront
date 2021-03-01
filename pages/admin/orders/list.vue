<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Order List</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!orderInfoList" />
          <div v-else class="pa-4">
            <template>
              <v-data-table
                :headers="headers"
                :items="orderInfoList"
                :footer-props="footerProps"
                show-group-by
                @dblclick:row="getRowItem"
              >
              </v-data-table>
            </template>
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

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: { ProgressLiner },
  data() {
    return {
      expanded: [],
    }
  },
  computed: {
    ...mapState('admin/orders/list', [
      'orderInfoList',
      'headers',
      'footerProps',
    ]),
  },
  async created() {
    await this.getOrderList()
  },
  methods: {
    ...mapActions('admin/orders/list', [
      'getOrderList',
      'moveToDetail',
      'back',
    ]),
    getRowItem(event, row) {
      this.moveToDetail(row.item.id)
    },
  },
}
</script>
