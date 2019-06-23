<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card xs6 offset-xs3>
        <v-tabs v-model="activeTab" color="cyan" dark slider-color="yellow">
          <v-tab key="login" ripple>Login</v-tab>
          <v-tab key="registration" ripple>Registration</v-tab>
          <v-tab-item key="login">
            <v-card flat>
              <form>
                <v-text-field v-model="loginUser.username" label="Username" required></v-text-field>
                <v-text-field v-model="loginUser.password" :type="'password'" label="Password" required></v-text-field>
                <v-btn @click="defaultLogin()" class="success">Submit</v-btn>
                <p>Or sign in using Google</p>
                <g-signin-button
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">
                  Sign in with Google
                </g-signin-button>
              </form>
            </v-card>
          </v-tab-item>
          <v-tab-item key="registration">
            <v-card flat>
              <form>
                <v-text-field v-model="registerUser.full_name" label="Full Name" required></v-text-field>
                <v-text-field v-model="registerUser.username" label="Username" required></v-text-field>
                <v-text-field v-model="registerUser.password" label="Password" :type="'password'" required></v-text-field>
                <v-text-field v-model="registerUser.email" label="Email" required></v-text-field>
                <v-btn @click="sendRegisterUser()">Register</v-btn>
              </form>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      activeTab: null,
      registerUser: {
        full_name: '',
        username: '',
        password: '',
        email: '',
      },
      loginUser: {
        username: '',
        password: ''
      },
      googleSignInParams: {
        client_id: '59429130458-pjjh5rks1fe5encqq7ien9r3us6uknjq.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    defaultLogin() {
      event.preventDefault();
      let sendLoginUser = {
        username: this.loginUser.username,
        password: this.loginUser.password,
        login_type: 'default'
      }
      axios.post(`${this.$root.url_server}/users/login`, sendLoginUser)
        .then(({ data }) => {
          if (data.token) {
            let token = {
              token: data.token,
              token_type: 'default'
            }
            localStorage.setItem('token', JSON.stringify(token))
            Swal.fire({
              title: `Welcome back ${sendLoginUser.username}!`,
              text: 'Success Login',
              type: 'success',
              confirmButtonText: 'Ok'
            })
            this.$root.getListArticles()
            this.$root.getUserProfile()
            this.$emit('set-isLogin', true)
            this.$emit('change-page', "content-list-articles")
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error',
            confirmButtonText: 'Cancel'
          })
        })
    },
    sendRegisterUser() {
      let sendRegisterUser = {
        full_name: this.registerUser.full_name,
        username: this.registerUser.username,
        password: this.registerUser.password,
        email: this.registerUser.email,
      }
      axios({
        method: 'POST',
        data: sendRegisterUser,
        url: `${this.$root.url_server}/users/register`,
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Success!',
            text: 'Successfully register! Please login to continue using.',
            type: 'success',
            confirmButtonText: 'Okay'
          })
          this.registerUser = { full_name: '', username: '', password: '', email: ''}
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error',
            confirmButtonText: 'Cancel'
          })
        })
    },
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      console.log('ini hasil profile', profile)
      let sendUser = {
        full_name: profile.ig,
        email: profile.U3,
        username: profile.U3.split('@')[0],
        login_type: 'google'
      }
      console.log('ini sendUser', sendUser)
      axios.post(`${this.$root.url_server}/users/login`, sendUser)
        .then(({ data }) => {
          console.log('ini data hasil reques', data)
          if (data.token) {
            let token = {
              token: data.token,
              token_type: 'google'
            }
            localStorage.setItem('token', JSON.stringify(token))
            Swal.fire({
              title: `Welcome back ${sendUser.username}!`,
              text: 'Success Login',
              type: 'success',
              confirmButtonText: 'Ok'
            })
            this.$root.getListArticles()
            this.$root.getUserProfile()
            this.$emit('set-isLogin', true)
            this.$emit('change-page', "content-list-articles")
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error',
            confirmButtonText: 'Cancel'
          })
        })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        type: 'error',
        confirmButtonText: 'Cancel'
      })
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios.post(`${this.$root.url_server}/users/login`, {
        google_id_token: id_token
      })
        .then(({ data }) => {
          let token = {
            token: data.token,
            token_type: 'google'
          }
          localStorage.setItem('token', JSON.stringify(token))
          this.loginUser = { username: '', password: ''}    
          this.isLogin = true
          this.currentPage = "content-list-articles"   
        })
        .catch(({ message }) => {
          console.log('ini  error yang diterima', message);
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error',
            confirmButtonText: 'Cancel'
          })
        })
    },
  }
}
</script>
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style> 