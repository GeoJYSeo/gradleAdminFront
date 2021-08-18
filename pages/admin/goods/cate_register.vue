<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Category Register</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!cateInfo" />
          <v-tabs v-else background-color="transparent">
            <v-tab>Main Category</v-tab>
            <v-tab>Sub Category</v-tab>
            <v-tab-item>
              <MainCate />
            </v-tab-item>
            <v-tab-item>
              <SubCate :all-cate-codes="allCateCodes" />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'
import MainCate from '@/components/cate_register/main_cate'
import SubCate from '@/components/cate_register/sub_cate'
import ProgressLiner from '@/components/molecules/progress_liner'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: { MainCate, SubCate, ProgressLiner },
  data() {
    return {
      allCateCodes: [],
    }
  },
  computed: {
    ...mapState('admin/goods/cate_list', ['cateInfo', 'headers']),
  },
  created() {
    this.setCateList()
  },
  methods: {
    ...mapActions('admin/goods/cate_list', ['getCateList']),
    async setCateList() {
      if (!this.cateInfo) await this.getCateList()
      this.allCateCodes = this.cateInfo
        .filter((cate) => cate.cate_code_ref !== 'N/A')
        // .map((cate) => `${cate.cate_name}<${cate.cate_code_ref}>`)
        .filter((cate) => cate.cate_code_ref === cate.cate_code)
        .map((cate) => `<${cate.cate_code_ref}> ${cate.cate_name}`)
        .sort()
    },
  },
}
</script>
