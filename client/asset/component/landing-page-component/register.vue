<template>
  <div class="container register" v-if="page == 'register'">
    <h2 class="text-center">Register Form</h2>
    <form class="form-user center border border-secondary p-3 rounded" @submit.prevent="register">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="newUser.name" placeholder="Enter name" required>
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" v-model="newUser.email" aria-describedby="emailHelp" placeholder="Enter email" required>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="newUser.password" placeholder="Password" required>
      </div>
      <div class="form-group">
        <p>Already have an account? <a href="#" class="login-button" @click="rendLogin">Login Here</a></p>
      </div>
      <div class="col text-center">
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
    'newUser' : Object
  },
  data() {
    return {

    };
  },
  methods: {
    register () {
      this.$emit('register')
    },
    rendLogin () {
      this.$emit('rendLogin')
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