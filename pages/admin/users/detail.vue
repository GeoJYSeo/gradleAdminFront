<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>User Detail</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!userDetailInfo" />
          <UserRegisterForm
            v-else
            :is-admin="isAdmin"
            :de-user-info="userDetailInfo"
            btn-text="modify"
            @sendEvent="moveToModify"
            @destroy="destroy"
            @back="back"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'
import UserRegisterForm from '@/components/organisms/user_register/register_form'
import ProgressLiner from '@/components/molecules/progress_liner'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: { UserRegisterForm, ProgressLiner },
  data() {
    return {
      selUserId: null,
    }
  },
  computed: {
    ...mapState('admin/users/detail', ['userDetailInfo']),
    isAdmin() {
      return this.userDetailInfo.str_access === 'Administrator'
    },
  },
  async created() {
    await this.setSelUserId()
    await this.getUserDetailInfo(this.selUserId)
    await this.setSessionSelUserId(this.userDetailInfo.id)
  },
  methods: {
    ...mapActions('admin/users/detail', [
      'setSessionSelUserId',
      'getUserDetailInfo',
      'moveToModify',
      'destroy',
      'back',
    ]),
    setSelUserId() {
      this.selUserId =
        this.$route.params.selUserId || sessionStorage.getItem('selUserId')
    },
  },
}
</script>
