<template>
  <v-footer class="primary">
    <span>&copy; SmartMedUI {{ new Date().getFullYear() }}</span>
    <v-spacer></v-spacer>
    <v-btn
      class="mr-1"
      text
      nuxt
      href="https://t.me/joinchat/AAAAAFRFI0I5J0HxfzoSHQ"
      target="_blank"
    >
      <v-icon class="mr-1">mdi mdi-telegram</v-icon>
      контакты</v-btn
    >
    <v-btn text nuxt to="/about">
      <v-icon class="mr-1">mdi mdi-information</v-icon>
      о нас</v-btn
    >
  </v-footer>
</template>
