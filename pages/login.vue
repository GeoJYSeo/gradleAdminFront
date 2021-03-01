<template>
  <v-container fill-height style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-alert type="error" :value="isLoginError">
          Please Check The Email or Password.
        </v-alert>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <div class="pa-4">
            <v-text-field
              v-model="loginInfo.user_email"
              :rules="emailRules"
              type="email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="loginInfo.passwd"
              :rules="passwordRules"
              type="password"
              label="Password"
            ></v-text-field>
            <v-btn
              block
              large
              depressed
              color="#424242"
              class="white--text"
              @click="login(loginInfo)"
              >Login</v-btn
            >
          </div>
        </v-card>
        <v-flex text-sm-right>
          <NuxtLink to="/member/register"> Register </NuxtLink>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      loginInfo: {
        user_email: null,
        passwd: null,
      },
    }
  },
  computed: {
    ...mapState('login', ['isLoginError']),
    ...mapState('validation', ['passwordRules', 'emailRules']),
  },
  methods: {
    ...mapActions('login', ['login']),
  },
}
</script>
