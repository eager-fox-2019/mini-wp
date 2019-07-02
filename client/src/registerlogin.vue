<template>
  <div>
    <div id="title">Mini WP</div>
    <div id="subtitle">Register for a new account / login to an existing account.</div>
    <div id="front-forms" v-show="section === 0">
      <div style="display: flex; justify-content: center;">
        <form id="register-form" class="form1" @submit.prevent="sendRegister" autocomplete="off">
          <p class="form1title">Register</p>
          <input class="input1" type="text" placeholder="New Email" name="email" required><br>
          <input class="input1" type="password" placeholder="New Password" name="password" required><br>
          <button class="button1" type="submit">Register</button>
        </form>
        <form id="login-form" class="form1" @submit.prevent="sendLogin" autocomplete="off">
          <p class="form1title">Login</p>
          <input class="input1" type="text" placeholder="Email" name="email" required><br>
          <input class="input1" type="password" placeholder="Password" name="password" required><br>
          <button class="button1" type="submit">Login</button>
        </form>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 0.8rem; position: relative;">
        <!-- <p style="margin-bottom: 0.7rem; color: #ccc">Or sign in with Google:</p> -->
        <!-- <div id="my-signin2"></div> -->
      </div>
    </div>
    <div id="reg-message" v-show="section === 1">
      <p>Successfully Registered</p>
      <button class="button1" @click="goTo(0)">Return</button>
    </div>
  </div>
</template>

<script>
import ax from './helpers/axiosInstance'

export default {
  props: ['section'],
  methods: {
    sendRegister(event) {
      let inputs = event.target.elements
      ax.post('users/register', {
        email: inputs.email.value,
        password: inputs.password.value,
      })
        .then(() => {
          this.goTo(1);
        })
        .catch(err => console.log(err.response.data))
        .finally(() => {
          event.target.reset()
        })
    },
    sendLogin(event) {
      let inputs = event.target.elements
      ax.post('users/login', {
        email: inputs.email.value,
        password: inputs.password.value,
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token); // Save token to local storage
          this.$emit('login')
          this.goTo(4);
        })
        .catch(err => console.log(err.response.data))
        .finally(() => {
          event.target.reset()
        })
    },
    goTo(num) {
      this.$emit('section', num)
    },
  }
}
</script>
