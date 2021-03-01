<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Goods Register</v-toolbar-title>
          </v-toolbar>
          <GoodsRegisterForm
            btn-text="register"
            :file-input-disp="true"
            @sendEvent="register"
            @back="back"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'
import GoodsRegisterForm from '@/components/organisms/goods_register/register_form'
// import FileInput from '@/components/goods_register/file_input'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: { GoodsRegisterForm },
  // components: { FileInput },
  // data() {
  //   return {
  //     fileInputs: [FileInput],
  //   }
  // },
  methods: {
    ...mapActions('admin/goods/register', ['register', 'back']),
    // addFileInput() {
    //   this.fileInputs.push(FileInput)
    // },
    // delFileInput(i) {
    //   this.fileInputs.splice(i, 1)
    // },
  },
}
</script>
