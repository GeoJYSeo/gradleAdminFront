<template>
  <v-container class="container mt-10">
    <v-row justify="center" class="mt-15">
      <img src="@/assets/error.png" />
    </v-row>
    <v-row justify="center" class="mt-10">
      <h1>An error occurred</h1>
    </v-row>
    <v-row justify="center" class="mt-2">
      <h3>Please Go back to Home Page and try again.</h3>
    </v-row>
    <v-row justify="center" class="mt-8">
      <NuxtLink to="/"><h4>Go To Home page</h4></NuxtLink>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  height: 100%;
  background-color: #ffffff;
  height: 80%;
}
h1,
h3 {
  color: #000000;
}
</style>
