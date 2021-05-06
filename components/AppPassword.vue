<template>
  <v-text-field
    v-model="password"
    :rules="passwordRules"
    :label="passwordLabel"
    :counter="8"
    required
    autocomplete="off"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    @click:append="show = !show"
    @input="addPassword"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    passwordLabel: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    show: false,
    password: '',
    passwordRules: [
      (v) => !!v || 'Не указан пароль',
      (v) =>
        /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(
          v
        ) ||
        'Пароль должен быть от 8 символов с использованием цифр, спец. символов, латиницы, наличием строчных и прописных символов',
    ],
  }),
  methods: {
    addPassword() {
      if (this.passwordRules) {
        this.$emit('passwordHasMade', this.password)
      }
    },
  },
}
</script>
