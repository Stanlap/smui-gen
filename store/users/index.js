import { auth } from '@/services/firebase'
import Cookie from 'js-cookie'

export const state = () => ({
  user: null,
  emailVerification: false,
  userErr: '',
})

export const getters = {
  isEmailVerified: (state) => {
    return state.emailVerification
  },
  isUserError: (state) => {
    return state.userErr
  },
}

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account
  },
  SET_EMAIL_VERIFICATION: (state, payload) => {
    state.emailVerification = payload
  },
  SET_USER_ERROR: (state, payload) => {
    state.userErr = payload
  },
}

export const actions = {
  async loginOrSignUp({ commit }, account) {
    if (account.signin === 'login') {
      await auth
        .signInWithEmailAndPassword(account.email, account.password)
        .then((userCredential) => {
          const user = userCredential.user
          const isEmailVerified = user.emailVerified
          if (!isEmailVerified) {
            user.sendEmailVerification()
          } else {
            commit('SET_EMAIL_VERIFICATION', isEmailVerified)
          }
        })
    } else {
      await auth
        .createUserWithEmailAndPassword(account.email, account.password)
        .then((userCredential) => {
          const user = userCredential.user
          user.sendEmailVerification().catch((error) => {
            console.error(error)
          })
        })
    }
    // Get JWT from Firebase
    const token = await auth.currentUser.getIdToken()
    const { email, uid } = auth.currentUser
    // Set JWT to the cookie
    Cookie.set('access_token', token)
    // Set the user locally
    commit('SET_USER', {
      email,
      uid,
    })
  },
}
