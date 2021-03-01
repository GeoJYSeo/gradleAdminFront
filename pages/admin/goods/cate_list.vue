<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Category List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn router :to="{ name: 'admin-goods-cate_register' }"
              >Register</v-btn
            >
          </v-toolbar>
          <ProgressLiner v-if="!cateInfo" />
          <div v-else class="pa-4">
            <template>
              <v-data-table
                :headers="headers"
                :items="cateInfo"
                show-group-by
              ></v-data-table>
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
  computed: {
    ...mapState('admin/goods/cate_list', ['cateInfo', 'headers']),
  },
  async created() {
    await this.getCateList()
  },
  methods: {
    ...mapActions('admin/goods/cate_list', ['getCateList']),
  },
}
</script>
