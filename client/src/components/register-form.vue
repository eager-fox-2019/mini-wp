<template>
  <div class="login-register-page">
    <div id="register-form-container">
      <div class="login-register-header-container">
        <h1 class="login-register-header-text"><i class="fas fa-user-plus"></i> Sign Up</h1>
      </div>
      <div class="login-register-form-container">
        <input type="text" v-model="registerData.firstName" class="login-register-input" placeholder="First Name">
        <input type="text" v-model="registerData.lastName" class="login-register-input" placeholder="Last Name">
        <input type="text" v-model="registerData.email" class="login-register-input" placeholder="Email">
        <input type="password" v-model="registerData.password" class="login-register-input" placeholder="Password">
        <button @click.prevent="register" class="login-register-button">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['registerData'],
  data() {
    return {

    };
  },
  methods: {
    register(){
      this.$emit('register');``
    }
  }
}
</script>

<style>

</style>
