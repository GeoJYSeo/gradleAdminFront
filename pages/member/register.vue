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
import UserRegisterForm from '@/components/organisms/user_register/register_form'
import ConfirmDialog from '@/components/organisms/confirm_dialog'

export default {
  components: { UserRegisterForm, ConfirmDialog },
  computed: {
    ...mapState('member/register', ['hasEmailResult', 'EmailCheckMessage']),
    ...mapState('dialog', ['dispConfirmDialog']),
  },
  methods: {
    ...mapActions('member/register', ['emailCheck', 'register', 'back']),
    ...mapMutations('dialog', ['closeDialog']),
  },
}
</script>
