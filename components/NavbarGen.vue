<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary app light>
      <v-list>
        <v-list-item
          v-for="(item, i) in menuToolbarItems"
          v-show="item.show"
          :key="i"
          :to="item.to"
          router
          exact
          @click="item.title === 'Выйти' ? logout() : ''"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="primary" fixed app>
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click.stop="drawer = !drawer"
      />
      <v-img
        src="/smui-blue.png"
        max-height="16px"
        max-width="16px"
        class="mr-1"
      ></v-img>
      <v-toolbar-title v-text="'SmartMedUI'"></v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="d-none d-md-block">
        <v-btn
          v-for="(item, i) in menuToolbarItems"
          v-show="item.show"
          :key="i"
          text
          nuxt
          :to="item.to"
          @click="item.title === 'Выйти' ? logout() : ''"
        >
          <v-icon left>{{ item.icon }}</v-icon
          >{{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { auth } from '@/services/firebase'
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      drawer: false,
      isLogin: false,
    }
  },
  computed: {
    checkLogin() {
      return !!this.$store.state.users.user
    },

    menuToolbarItems() {
      return [
        {
          icon: 'mdi mdi-home',
          title: 'На главную',
          to: '/',
          show: true,
        },
        {
          icon: 'mdi mdi-login',
          title: 'Войти',
          to: '/login',
          show: !this.checkLogin,
        },
        {
          icon: 'mdi mdi-apps',
          title: 'программы',
          to: '/forPhysicians/programs',
          show: this.checkLogin,
        },
        {
          icon: 'mdi mdi-logout',
          title: 'Выйти',
          show: this.checkLogin,
        },
      ]
    },
  },
  methods: {
    async logout() {
      await auth.signOut()
      await Cookie.remove('access_token')
      location.href = '/'
    },
  },
}
</script>
<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
