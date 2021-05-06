<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card
        elevation="2"
        height="heightCard + 'px'"
        width="600px"
        class="ma-3 pa-6"
        @click=";(alertOne = false), (alertTwo = false)"
      >
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-checkbox
            v-if="showSignUp"
            v-model="checkbox"
            :rules="checkboxRules"
            label="Я врач с действующим сертификатом специалиста."
            required
            @change="checkPhysician"
          ></v-checkbox>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            autocomplete="off"
            required
          ></v-text-field>
          <alert-login :errmsg="translatedErrMessage" :alertval="alertOne">
          </alert-login>

          <app-password
            password-label="Пароль"
            @passwordHasMade="passwordOne = $event"
          ></app-password>
          <app-password
            v-if="showSignUp"
            password-label="Подтверждение пароля"
            @passwordHasMade="passwordTwo = $event"
          ></app-password>

          <p v-if="email && btnTitle === 'войти'">
            <small class="primary--text" @click="resetPassword"
              >Не могу вспомнить пароль</small
            >
          </p>

          <alert-login :errmsg="alertTwoMsg" :alertval="alertTwo">
          </alert-login>

          <alert-login
            v-if="checkPasswIdentity"
            errmsg="Пароли не совпадают."
            alertval="true"
          ></alert-login>

          <v-btn
            :disabled="!valid && !comparePasswords"
            color="primary"
            class="mr-4 mt-4"
            @click="signUser"
          >
            {{ btnTitle }}
          </v-btn>
          <v-btn v-if="!showSignUp" class="mr-4 mt-4" @click="toSignUpUser">
            регистрация</v-btn
          >
          <v-tooltip v-if="enableGoogle" top>
            <template #activator="{ on, attrs }">
              <v-btn
                class="mr-4 mt-4"
                :disabled="!enableGoogle"
                v-bind="attrs"
                @click="signInWithGoogle"
                v-on="on"
              >
                <img src="../static/google.svg" width="24px" />
              </v-btn>
            </template>
            <span>Войти из акаунта Coogle</span>
          </v-tooltip>

          <v-btn class="mr-4 mt-4" @click="reset"> Reset </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { auth } from '@/services/firebase'
import Cookie from 'js-cookie'

export default {
  data: () => ({
    btnTitle: 'войти',
    showSignUp: false,
    alertOne: false,
    alertTwo: false,
    alertTwoMsg: '',
    errCode: '',
    valid: true,
    checkbox: false,
    checkboxRules: [(v) => !!v || 'Вы должны согласиться чтобы продолжить!'],
    email: '',
    emailRules: [
      (v) => !!v || 'Не указан E-mail',
      (v) => /.+@.+\..+/.test(v) || 'E-mail должен быть валидным',
    ],
    passwordOne: '',
    passwordTwo: '',
    isEmailVerified: false,
    enableGoogle: false,
  }),
  computed: {
    checkPasswIdentity() {
      return (
        this.passwordOne &&
        this.passwordTwo &&
        !this.comparePasswords &&
        this.btnTitle !== 'войти'
      )
    },
    heightCard() {
      return this.showSignUp ? 600 : 310
    },
    comparePasswords() {
      return this.passwordOne === this.passwordTwo
    },
    translatedErrMessage() {
      switch (this.errCode) {
        case 'auth/email-already-in-use':
          return 'Адрес электронной почты уже используется другой учетной записью.'
        case 'auth/user-not-found':
          return 'Нет записи пользователя, соответствующей этому идентификатору. Пользователь мог быть удален.'
        case 'auth/wrong-password':
          return 'Пароль недействителен или у пользователя нет пароля.'
        default:
          return ''
      }
    },
  },
  mounted() {
    const lCP = JSON.parse(localStorage.getItem('checkPhysician'))
    this.enableGoogle = lCP === null ? false : lCP
  },
  methods: {
    toSignUpUser() {
      this.showSignUp = true
      this.btnTitle = 'регистрация'
    },
    async createOrLoginUser(email, password, task) {
      const signIn = task === 'войти' ? 'login' : 'signup'
      await this.$store
        .dispatch('users/loginOrSignUp', {
          email,
          password,
          signin: signIn,
        })
        .then(() => {
          if (this.$store.getters['users/isEmailVerified']) {
            this.$router.push('/forPhysicians')
          } else {
            this.alertTwo = true
            this.alertTwoMsg =
              'На Ваш почтовый ящик отправлена ссылка для подтверждения адреса эл. почты. Подтвердив подлинность email адреса войдите на сайт.'
            this.showSignUp = false
            this.btnTitle = 'войти'
            setTimeout(() => {
              this.alertTwo = false
              this.alertTwoMsg = ''
              this.reset()
            }, 10000)
            // this.$router.push('/login')
          }
        })
        .catch((error) => {
          this.errCode = error.code
          this.openAlertOnArr(this.errCode)
        })
    },
    signUser() {
      if (this.$refs.form.validate()) {
        this.createOrLoginUser(this.email, this.passwordOne, this.btnTitle)
      }
    },
    async signInWithGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      await this.$fire.auth
        .signInWithPopup(provider)
        .then((result) => {
          this.$store.commit(
            'users/SET_EMAIL_VERIFICATION',
            result.user.emailVerified
          )
        })
        .catch((error) => {
          console.error(error.code)
        })
      const token = await auth.currentUser.getIdToken()
      const { email, uid } = auth.currentUser
      Cookie.set('access_token', token)
      this.$store.commit('users/SET_USER', {
        email,
        uid,
      })
      this.$router.push('/forPhysicians')
    },
    resetPassword() {
      if (this.email) {
        this.$fire.auth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.alertTwo = true
            this.alertTwoMsg =
              'На ваш почтовый ящик отправлено письмо для смены пароля.'
            setTimeout(() => {
              this.alertTwo = false
              this.alertTwoMsg = ''
              this.reset()
            }, 10000)
          })
          .catch((error) => {
            this.errCode = error.code
            this.openAlertOnArr(this.errCode)
          })
      }
    },
    checkPhysician() {
      localStorage.setItem('checkPhysician', JSON.stringify(this.checkbox))
      this.enableGoogle = JSON.parse(localStorage.getItem('checkPhysician'))
    },
    openAlertOnArr(errCode) {
      if (
        errCode === 'auth/email-already-in-use' ||
        errCode === 'auth/user-not-found'
      ) {
        this.alertOne = true
      }
      if (errCode === 'auth/wrong-password') {
        this.alertTwo = true
        this.alertTwoMsg = this.translatedErrMessage
      }
    },

    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
