<template>
  <div class="container min-vh-100 ">
    <div class="row min-vh-100 justify-content-center align-items-center">
      <div class="col-4 border p-3">
        <h2 class="text-center">Log in</h2>
        <hr>
        <div id="google-signin-button"></div>
        <h5 class="text-center text-secondary mt-2">OR</h5>
        <form @submit.prevent="login()">
          <div class="form-group">
            <label form="email-login">Email address:</label>
            <input v-model="emailLogin" type="email" class="form-control" id="email-login">
          </div>
          <div class="form-group">
            <label for="password-login">Password:</label>
            <input v-model="pwdLogin" type="password" class="form-control" id="password-login">
          </div>
          <div class="clearfix">
            <button type="submit" class="btn btn-primary float-right">Submit</button>
          </div>
        </form>
        <p class="mt-2">Don't have an account? Create one <a href="#" @click.prevent="$emit('loggedIn', 'register')">here</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailLogin: '',
      pwdLogin: '',
    }
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn,
      longtitle: true
    })
  },
  methods: {
    login() {
      axios({
        method: 'POST',
        url: `${this.$serverUrl}/user/login`,
        data: {
          email: this.emailLogin,
          password: this.pwdLogin
        }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        this.$emit('loggedIn', 'main')
      })
      .catch(err => { 
        // console.log(err) 
        swal.fire(err.response.data.message,"", "error")
      })
    },
    onSignIn(user) {
      console.log('here')
      const token = user.getAuthResponse().id_token
      axios({
        method: 'POST',
        url: `${this.$serverUrl}/user/glogin`,
        headers: { token: token }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        this.$emit('loggedIn', 'main')
      })
      .catch(err => {
        console.log(err)
        swal.fire("google auth error"," please check your connection", "error")
      })
    }
  }
}
</script>

<style scoped>

</style>
