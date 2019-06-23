<template>
  <div class="login-register-page">
    <div id="login-form-container">
      <div class="login-register-header-container">
        <h1 class="login-register-header-text"><span><i class="fab fa-wordpress"></i></span> Mini Wordpress</h1>
      </div>
      <div class="login-register-form-container">
        <input type="text" v-model="loginData.email" class="login-register-input" placeholder="Email">
        <input type="password" v-model="loginData.password" class="login-register-input" placeholder="Password">
        <button class="login-register-button" @click.prevent="login">Log In</button>
        <div id="google-signin-button"></div>
        <p class="login-register-text">Do not have an account? <a href=""
            @click.prevent="changePage('register')">Register</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['loginData'],
    data() {
      return {

      }
    },
    methods: {
      changePage(val) {
        this.$emit('changePage', val);
      },
      login(){
        this.$emit('login');
      },
      onSignIn(){
        this.$emit('onSignIn');
      }
    }
  }
</script>

<style>

</style>
