<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Goods Detail</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!goodsdetailInfo" />
          <div v-else class="pa-4">
            <v-carousel height="400">
              <v-carousel-item
                v-for="(image, index) in imagesInfo"
                :key="index"
                :src="`${image.img_name}`"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
            <GoodsRegisterForm
              :is-admin="true"
              :de-goods-info="goodsdetailInfo.goods_api_response"
              :images-info="imagesInfo"
              btn-text="modify"
              @sendEvent="moveToModify"
              @destroy="destroy"
              @back="back"
            />
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
import GoodsRegisterForm from '@/components/organisms/goods_register/register_form'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: { GoodsRegisterForm, ProgressLiner },
  computed: {
    ...mapState('admin/goods/detail', ['goodsdetailInfo']),
    imagesInfo() {
      return this.goodsdetailInfo.goods_api_response
        .goods_image_api_response_list
    },
  },
  async created() {
    await this.getGoodsDetailInfo(this.$route.query.gdsId)
  },
  methods: {
    ...mapActions('admin/goods/detail', [
      'getGoodsDetailInfo',
      'moveToModify',
      'destroy',
      'back',
    ]),
  },
}
</script>
