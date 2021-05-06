<template>
  <div class="grey--text text--darken-2 text-center text-h4">
    Сайт для использующих информационные технологии в медицине.
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
    }
  },
  computed: {
    checkLogin() {
      return this.$store.state.users.user
    },
  },
}
</script>
