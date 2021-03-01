<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Goods Modify</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!goodsInfoForMod" />
          <div v-else class="pa-4">
            <v-carousel height="400">
              <v-carousel-item
                v-for="(image, index) in imagesInfo"
                :key="index"
                :src="require(`@/static/${image.gds_img}`)"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
            <GoodsRegisterForm
              :file-input-disp="true"
              :mod-goods-info="goodsInfoForMod"
              :images-info="imagesInfo"
              btn-text="confirm"
              @sendEvent="modify"
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
import GoodsRegisterForm from '@/components/organisms/goods_register/register_form'
import ProgressLiner from '@/components/molecules/progress_liner'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: { GoodsRegisterForm, ProgressLiner },
  data() {
    return {
      goodsInfoForMod: null,
    }
  },
  computed: {
    ...mapState('admin/goods/detail', ['goodsdetailInfo']),
    imagesInfo() {
      return this.goodsInfoForMod.goods_image_api_response_list
    },
  },
  async created() {
    await this.setGoodsInfoForMod()
  },
  methods: {
    ...mapActions('admin/goods/modify', ['modify', 'back']),
    ...mapActions('admin/goods/detail', ['getGoodsDetailInfo']),
    async setGoodsInfoForMod() {
      if (this.$route.params.goodsdetailInfo) {
        this.goodsInfoForMod = JSON.parse(
          JSON.stringify(this.$route.params.goodsdetailInfo)
        )
      } else {
        await this.getGoodsDetailInfo(this.$route.query.gdsId)
        this.goodsInfoForMod = JSON.parse(
          JSON.stringify(this.goodsdetailInfo.goods_api_response)
        )
      }
    },
  },
}
</script>
