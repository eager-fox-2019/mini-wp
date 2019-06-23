<template>
  <div>
    <v-toolbar app color="primary" dark fixed>
      <v-toolbar-side-icon v-if="isLoginParent" @click.stop="drawer = !drawer">=</v-toolbar-side-icon>
      <v-toolbar-title href="#" @click="submitPage('content-home')">
        <i id="navbar-logo" class="far fa-smile-wink valign-wrapper"></i>
        <span>Mini WP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="">
        <v-btn v-if="!isLoginParent" flat @click="submitPage('content-registration')">Login</v-btn>
        <v-btn flat @click="submitPage('content-home')"><v-icon>home</v-icon></v-btn>
        <v-btn v-if="isLoginParent" flat @click="logout()">Logout</v-btn>
        <v-btn v-if="isLoginParent" flat>{{ currentLoginUser.full_name }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout>
      <v-navigation-drawer v-if="isLoginParent" v-model="drawer" absolute temporary>
        <v-list class="pa-1">
          <v-list-tile>
            <v-list-tile-title class="title">
              Mini WP
            </v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="menu in navTab.menus" :key="menu.title" @click="submitPage(menu.pageName)">
            <v-list-tile-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
import Navtab from './navtab.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  props: ['isLoginParent', 'currentLoginUser'],
  data() {
    return {
      drawer: null,
      navTab: {
        drawer: null,
        menus: [
          { title: 'Home', icon: 'home', pageName: 'content-home' },
          { title: 'Add Article', icon: 'add_box', pageName: 'content-edit-article' },
          { title: 'All Articles', icon: 'dashboard', pageName: 'content-list-articles' },
        ],
      },
    }
  },
  methods: {
    submitPage(val) {
      console.log(val)
      this.$emit('change-page', val)
    },
    submitDrawer(val) {
      this.$emit('show-drawer', val)
    },
    logout() {
      Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to logout?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, i want to logout!'
      })
        .then((result) => {
          if (result.value) {
            return axios({
              method: 'POST',
              headers: {
                token: localStorage.token
              },
              url: `${this.$root.url_server}/users/logout`
            })
          }
        })
        .then(({ data }) => {
          Swal.fire(
            'Successfull!',
            "You're successfully logout",
            'success'
          )
          localStorage.removeItem("token");
          // var auth2 = gapi.auth2.getAuthInstance();
          // auth2.signOut().then(() => {
          //   console.log('User signed out.');
          // });
          this.$emit('set-isLogin', false)
          this.$emit('change-page', 'content-home')
          let blank = {
            id: '',
            username: '',
            email: '',
            full_name: '',
          }
          this.$emit('set-currentLoginUser', blank)
        })
        .catch((err) => {
          console.log(err);
        })
    },
  }
}
</script>