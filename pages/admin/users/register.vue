<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>User Register</v-toolbar-title>
          </v-toolbar>
          <UserRegisterForm
            btn-text="register"
            :is-admin="true"
            :btn-disabled="hasEmailResult"
            @emailCheck="emailCheck"
            @sendEvent="register"
            @back="back"
          />
        </v-card>
        <ConfirmDialog
          :disp-confirm-dialog="dispConfirmDialog"
          :dialog-contents="EmailCheckMessage"
          @closeDialog="closeDialog"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import authMiddleware from '@/middleware/auth'
import UserRegisterForm from '@/components/organisms/user_register/register_form'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.adminAuthentication(),
  ],
  components: { UserRegisterForm },
  computed: {
    ...mapState('member/register', ['hasEmailResult', 'EmailCheckMessage']),
    ...mapState('dialog', ['dispConfirmDialog']),
  },
  methods: {
    ...mapActions('admin/users/register', ['register', 'back']),
    ...mapActions('member/register', ['emailCheck']),
    ...mapMutations('dialog', ['closeDialog']),
  },
}
</script>
