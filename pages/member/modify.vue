<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>My Modify</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!userInfoForMod" />
          <UserRegisterForm
            v-else
            :mod-user-info="userInfoForMod"
            :is-mod="true"
            :is-me="true"
            btn-text="confirm"
            @sendEvent="modify"
            @hasPasswdCheck="hasPasswdCheck"
            @back="back"
          />
        </v-card>
        <ChgPwdFormDialog
          :disp-chg-pwd-dialog="dispChgPwdDialog"
          :dialog-contents="dialogContents[6]"
          :user-id="userInfoForMod.id"
          @changePassword="changePassword"
          @closeDialog="closeDialog"
        />
        <ConfirmDialog
          :disp-confirm-dialog="dispConfirmDialog"
          :dialog-contents="dialogContents[7]"
          @closeDialog="closeDialog"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import UserRegisterForm from '@/components/organisms/user_register/register_form'
import ProgressLiner from '@/components/molecules/progress_liner'
import ChgPwdFormDialog from '@/components/organisms/chg_pwd_form_dialog'
import ConfirmDialog from '@/components/organisms/confirm_dialog'

export default {
  components: {
    UserRegisterForm,
    ProgressLiner,
    ChgPwdFormDialog,
    ConfirmDialog,
  },
  data() {
    return {
      userInfoForMod: null,
    }
  },
  computed: {
    ...mapState('login', ['userInfo']),
    ...mapState('dialog', [
      'dispChgPwdDialog',
      'dispConfirmDialog',
      'dialogContents',
    ]),
  },
  created() {
    this.setUserInfo()
  },
  methods: {
    ...mapMutations('dialog', ['closeDialog']),
    ...mapActions('login', ['getMemberInfo']),
    ...mapActions('member/modify', ['modify', 'hasPasswdCheck', 'back']),
    async setUserInfo() {
      if (this.$route.params.userInfo) {
        this.userInfoForMod = JSON.parse(
          JSON.stringify(this.$route.params.userInfo)
        )
      } else {
        await this.getMemberInfo()
        this.userInfoForMod = JSON.parse(JSON.stringify(this.userInfo))
      }
    },
    changePassword(oldPasswd, newPasswd) {
      this.userInfoForMod.passwd = oldPasswd
      this.userInfoForMod.new_passwd = newPasswd
      this.modify(this.userInfoForMod)
    },
  },
}
</script>
