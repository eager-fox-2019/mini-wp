<template>
  <div class="container login" v-if="page == 'login'">
    <h2 class="text-center">Login Form</h2>
    <form class="form-user center p-3 border border-secondary rounded" id="login-form" @submit.prevent="login">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" v-model="user.email" aria-describedby="emailHelp" placeholder="Enter email" required>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="user.password" placeholder="Password" required>
      </div>
      <div class="form-group">
        <p>Don't have an account? <a href="#" class="register-button" @click="rendRegister">Register Here</a></p>
      </div>
      <p>Or login with:</p>
      <div class="row justify-content-center">
        <div class="col-auto">
          <div id="google-signin-button"></div>
        </div>
      </div>
      <div class="col text-center">
        <br>
        <button type="submit" class="btn btn-primary center">Submit</button>
      </div>
    </form>
    <br>
  </div>
</template>

<script>
export default {
  props: {
    'page' : String,
    'user' : Object,
  },
  data() {
    return {

    };
  },
  methods: {
    login () {
      this.$emit('login')
    },
    rendRegister () {
      this.$emit('rendRegister')
    }
  }
};
</script>

<style scoped>
  .container{
    max-width: 100%;
    margin: 15px 0;
    height: 700px;
  }
  .form-user {
    width: 30%;
    border-color: grey;
    border-width: 2px !important;
    -webkit-box-shadow: 10px 10px 11px -3px rgba(107,107,107,1);
    -moz-box-shadow: 10px 10px 11px -3px rgba(107,107,107,1);
    box-shadow: 10px 10px 11px -3px rgba(107,107,107,1);
  }
  .center {
    margin: 0px auto;
  }
</style>
