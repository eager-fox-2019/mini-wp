<template>
  <div id="login-page">
    <div id="login" class="primary-container animated fadeInDown" style="opacity: 0.5">
      <h4 style="text-align: center">Login</h4>
      <h6 v-show="errorLogin.status === true" style=" text-align: center; color: #ef5350;">{{ errorLogin.msg }} !</h6>
      <form class="form-login" @submit.prevent="loginUser">
        <label for="login-email">Email</label>
        <input type="text" name="login-email" id="login-email" v-model="login.email" required>
        <label for="login-password">Password</label>
        <input type="password" name="login-password" id="login-password" v-model="login.password" required>
        <button type="submit" class="btn blue wave-light" style="margin-top: 10px;">Sign In</button>
      </form>
    </div>
    <div id="register" class="primary-container animated fadeInDown" style="opacity: 0.5">
      <h4 style="text-align: center">Register</h4>
      <h6 v-show="errorRegister.status === true" style=" text-align: center; color: #ef5350;"> {{ errorRegister.msg }}</h6>
      <form class="form-login" @submit.prevent="registerUser">
        <label for="register-first-name">First Name</label>
        <input type="text" name="register-first-name" id="register-first-name" v-model="register.first_name" required>
        <label for="register-last-name">Last Name</label>
        <input type="text" name="register-last-name" id="register-last-name" v-model="register.last_name" required>
        <label for="register-email">Email</label>
        <input type="text" name="register-email" id="register-id" v-model="register.email" required>
        <label for="register-password">Password</label>
        <input type="password" name="register-password" id="register-password" v-model="register.password" required>
        <button type="submit" class="btn blue">Register</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {

    }
  }
}
</script>

