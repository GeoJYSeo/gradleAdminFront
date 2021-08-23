<template>
  <div class="pa-4">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row v-if="isDetail">
        <v-col>
          <FormTextField
            :is-detail="isDetail"
            :input-content.sync="category.cate_name"
            :rules="[true]"
            label="Category Name"
          />
        </v-col>
        <v-col>
          <FormTextField
            :is-detail="isDetail"
            :input-content.sync="category.cate_code_ref"
            :rules="[true]"
            label="Category Main Code"
          />
        </v-col>
        <v-col>
          <FormTextField
            :is-detail="isDetail"
            :input-content.sync="category.cate_code"
            :rules="[true]"
            label="Category Sub Code"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-select
            v-model="cate_code_ref"
            prepend-icon="mdi-star-circle"
            :items="allCateCodeRefs"
            :rules="selCateCodeRefRules"
            label="Category Main Code"
            clearable
            @change="changeAllCateCodeRefs"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="goodsInfo.cate_code"
            prepend-icon="mdi-star-circle"
            :items="selAllCateCodes"
            :rules="selCateCodeRules"
            label="Category Sub Code"
            clearable
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <FormTextField
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="goodsInfo.gds_name"
            :rules="isDetail ? [true] : gdsNameRules"
            label="Goods Name"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <FormTextField
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="goodsInfo.gds_price"
            :rules="isDetail ? [true] : priceRules"
            label="Goods Price"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <FormTextField
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="goodsInfo.gds_stock"
            :rules="isDetail ? [true] : stockRules"
            label="Goods Stock"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <FormTextarea
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="goodsInfo.gds_desc"
            label="Goods Description"
          />
        </v-col>
      </v-row>
      <div v-if="imagesInfo ? imagesInfo[0].id : false">
        <div v-if="isDetail || fileInputDisp">
          <v-row
            v-for="(image, index) in imagesInfo"
            :key="index"
            align="center"
          >
            <v-col>
              <FormTextField
                :is-detail="true"
                :input-content.sync="image.ori_name"
                :rules="[true]"
                label="Image"
              />
            </v-col>
            <v-col v-if="fileInputDisp" cols="12" sm="3">
              <v-btn
                block
                large
                depressed
                color="#424242"
                class="white--text"
                @click="setDelImageIds(index)"
                >delete</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </div>
      <v-row v-if="fileInputDisp">
        <v-col>
          <v-file-input
            v-model="images"
            multiple
            color="blue darken-4 accent-4"
            counter
            label="File input"
            placeholder="Select your images"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip v-if="index < 2" dark label small>
                {{ text }}
              </v-chip>

              <span
                v-else-if="index === 2"
                class="overline grey--text text--darken-3 mx-2"
              >
                +{{ images.length - 2 }} File(s)
              </span>
            </template>
          </v-file-input>
        </v-col>
      </v-row>
      <FormButton
        :text="btnText"
        :is-goods-del="isGoodsDel"
        @sendEvent="validate"
        @delData="delData"
        @back="back"
      />
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormTextField from '@/components/molecules/text_field'
import FormTextarea from '@/components/molecules/textarea'
import FormButton from '@/components/organisms/button_form'

export default {
  components: { FormTextField, FormTextarea, FormButton },
  props: {
    deGoodsInfo: {
      type: Object,
      required: false,
      default: () => {
        return null
      },
    },
    modGoodsInfo: {
      type: Object,
      required: false,
      default: () => {
        return null
      },
    },
    imagesInfo: {
      type: Array,
      required: false,
      default: () => {
        return null
      },
    },
    btnText: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
    isGoodsDel: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
    fileInputDisp: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      valid: true,
      chdGoodsInfo: {
        gds_name: null,
        cate_code: null,
        gds_price: null,
        gds_stock: null,
        gds_desc: null,
      },
      images: [],
      del_image_ids: [],
      cate_code_ref: null,
      selAllCateCodes: [],
      allCateCodeRefs: [],
    }
  },
  computed: {
    ...mapState('admin/goods/cate_list', ['cateInfo']),
    ...mapState('validation', [
      'gdsNameRules',
      'priceRules',
      'stockRules',
      'selCateCodeRules',
      'selCateCodeRefRules',
    ]),
    goodsInfo() {
      return this.deGoodsInfo || this.modGoodsInfo || this.chdGoodsInfo
    },
    isDetail() {
      return !!this.deGoodsInfo
    },
    category() {
      return this.goodsInfo ? this.goodsInfo.category_api_response : []
    },
  },
  async created() {
    await this.setSelCateCodeRef()
  },
  methods: {
    ...mapActions('admin/goods/cate_list', ['getCateList']),
    async setSelCateCodeRef() {
      await this.getCateList()
      this.allCateCodeRefs = this.cateInfo
        .filter((code) => code.cate_code_ref === code.cate_code)
        .map((code) => `<${code.cate_code_ref}> ${code.cate_name}`)
      this.cate_code_ref = !Object.values(this.goodsInfo).includes(null)
        ? `<${this.goodsInfo.category_api_response.cate_code_ref}> ${this.goodsInfo.category_api_response.cate_name}`
        : null
      this.selAllCateCodes.push(this.goodsInfo.cate_code || '')
    },
    changeAllCateCodeRefs() {
      const cateCode = this.cate_code_ref
        .split(' ')[0]
        .replace('<', '')
        .replace('>', '')
      this.selAllCateCodes = this.cateInfo
        .filter((code) => cateCode === code.cate_code_ref)
        .map((ref) => ref.cate_code)
    },
    setDelImageIds(index) {
      this.del_image_ids.push(
        this.imagesInfo.splice(index, 1).map((image) => image.id)
      )
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.goodsInfo.del_image_ids = this.del_image_ids
        this.$emit('sendEvent', [this.goodsInfo, this.images])
      }
    },
    delData() {
      this.$emit('destroy', this.goodsInfo.id)
    },
    back() {
      this.$emit('back', this.goodsInfo.id)
    },
  },
}
</script>
