<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Administratior </v-card-title>
        <v-card-text>
          <p>hello</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import authMiddleware from '@/middleware/auth'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
}
</script>
