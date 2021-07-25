<template>
  <v-container fill-height style="max-width: 1000px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>My Informtion</v-toolbar-title>
          </v-toolbar>
          <ProgressLiner v-if="!userInfo" />
          <UserRegisterForm
            v-else
            :de-user-info="userInfo"
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
  middleware: [authMiddleware.loginAuthentication()],
  components: { UserRegisterForm, ProgressLiner },
  computed: {
    ...mapState('login', ['userInfo']),
  },
  methods: {
    ...mapActions('member/register', ['moveToModify', 'destroy', 'back']),
  },
}
</script>
