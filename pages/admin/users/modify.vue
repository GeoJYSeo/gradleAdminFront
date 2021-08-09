<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>User Modify</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!userInfoForMod" />
          <UserRegisterForm
            v-else
            :mod-user-info="userInfoForMod"
            :is-mod="true"
            :is-admin="isAdmin"
            :is-me="isMe"
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
          @modify="modify"
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
import authMiddleware from '@/middleware/auth'
import UserRegisterForm from '@/components/organisms/user_register/register_form'
import ProgressLiner from '@/components/molecules/progress_liner'
import ChgPwdFormDialog from '@/components/organisms/chg_pwd_form_dialog'
import ConfirmDialog from '@/components/organisms/confirm_dialog'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.adminAuthentication(),
  ],
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
    ...mapState('admin/users/detail', ['userDetailInfo']),
    ...mapState('login', ['userInfo']),
    ...mapState('dialog', [
      'dispChgPwdDialog',
      'dispConfirmDialog',
      'dialogContents',
    ]),
    isAdmin() {
      return this.userInfo.str_access === 'Administrator'
    },
    isMe() {
      return this.userInfo.id === this.userInfoForMod.id
    },
  },
  created() {
    this.setUserInfo()
  },
  methods: {
    ...mapMutations('dialog', ['closeDialog']),
    ...mapActions('admin/users/detail', ['getUserDetailInfo']),
    ...mapActions('admin/users/modify', ['modify', 'hasPasswdCheck', 'back']),
    async setUserInfo() {
      if (this.$route.params.userDetailInfo) {
        this.userInfoForMod = JSON.parse(
          JSON.stringify(this.$route.params.userDetailInfo)
        )
      } else {
        await this.getUserDetailInfo(sessionStorage.getItem('selUserId'))
        this.userInfoForMod = JSON.parse(JSON.stringify(this.userDetailInfo))
      }
    },
  },
}
</script>
