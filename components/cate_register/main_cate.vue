<template>
  <v-card flat>
    <div class="pa-4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col>
            <FormTextField
              :input-content.sync="mainCateInfo.cate_name"
              :rules="cateNameRules"
              label="Category Name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <FormTextField
              :input-content.sync="mainCateInfo.cate_code"
              :rules="cateCodeRules"
              label="Category Code"
            />
          </v-col>
        </v-row>
        <FormButton text="register" @sendEvent="validate" @back="back" />
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormTextField from '@/components/molecules/text_field'
import FormButton from '@/components/organisms/button_form'

export default {
  components: { FormTextField, FormButton },
  data() {
    return {
      mainCateInfo: {
        cate_name: null,
        cate_code: null,
        cate_code_ref: null,
      },
      valid: true,
    }
  },
  computed: {
    ...mapState('validation', ['cateNameRules', 'cateCodeRules']),
  },
  methods: {
    ...mapActions('admin/goods/cate_register', ['register', 'back']),
    validate() {
      if (this.$refs.form.validate()) {
        this.mainCateInfo.cate_code_ref = this.mainCateInfo.cate_code
        this.register(this.mainCateInfo)
      }
    },
  },
}
</script>
