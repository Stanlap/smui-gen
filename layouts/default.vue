<template>
  <v-app>
    <navbar-gen></navbar-gen>
    <v-main class="bg">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>
<style scoped>
.bg {
  background: url('../assets/medImg3.jpg') no-repeat center center;
  background-size: cover;
}
</style>
