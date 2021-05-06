<template>
  <v-alert dense outlined type="info" dismissible :value="alertval">
    {{ errmsg }}
  </v-alert>
</template>

<script>
export default {
  props: {
    errmsg: {
      type: String,
      default: '',
    },
    alertval: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
