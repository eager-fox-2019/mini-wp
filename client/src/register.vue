<template>
  <div class="container min-vh-100 ">
    <div class="row min-vh-100 justify-content-center align-items-center">
      <div class="col-4 border p-3">
        <h2 class="text-center">Register</h2>
        <hr>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <h5 class="text-center text-secondary mt-2">OR</h5>
        <form @submit.prevent="register()">
          <div class="form-group">
            <label form="name-register">Name:</label>
            <input v-model="nameReg" type="text" class="form-control" id="name-register">
          </div>
          <div class="form-group">
            <label form="email-register">Email address:</label>
            <input v-model="emailReg" type="email" class="form-control" id="email-register">
          </div>
          <div class="form-group">
            <label for="password-register">Password:</label>
            <input v-model="pwdReg" type="password" class="form-control" id="password-register">
          </div>
          <div class="clearfix">
            <button type="submit" class="btn btn-primary float-right">Register</button>
          </div>
        </form>
        <p class="mt-2">Have an account? Log In <a href="#" @click.prevent="$emit('registered', 'login')">here</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameReg: '',
      emailReg: '',
      pwdReg: ''
    }
  },
  methods: {
    register() {
      axios({
        method: 'POST',
        url: `${this.$serverUrl}/user/register`,
        data: {
          name: this.nameReg,
          email: this.emailReg,
          password: this.pwdReg
        }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        this.$emit('registered', 'main')
      })
      .catch(err => { swal.fire(err.response.data.message,"", "error") })
    }
  }
}
</script>

<style scoped>

</style>
