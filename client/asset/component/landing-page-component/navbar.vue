<template>
  <nav class="navbar navbar-expand navbar-light justify-content-between" style="min-height: 50px; max-height: 60px; background-color: #c1e2fa;">
    <div class="nav-size">
      <div class="navbar-item">
        <img src="https://s.w.org/style/images/about/WordPress-logotype-wmark.png" width="40" height="40" alt="logo">
      </div>
    </div>

    <div class="nav-size d-flex justify-content-center">
        <h1>My Wordpress</h1>
    </div>

    <div class="nav-size d-flex justify-content-end">
      <div>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
              <a class="nav-link register-button" href="#" @click="rendRegister" v-if="isLogin == false">Register</a>
          </li>
          <li class="nav-item">
              <a class="nav-link login-button" href="#" @click="rendLogin" v-if="isLogin == false">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" id="user" v-if="isLogin == true">{{user.name}}</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#" id="logoff" @click="signOut" v-if="isLogin == true">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    'isLogin': Boolean,
    'user' : Object
  },
  data() {
    return {

    };
  },
  methods: {
    rendRegister (){
      this.$emit('rendRegister')
    },
    rendLogin () {
      this.$emit('rendLogin')
    },
    signOut () {
      this.$emit('signOut')
    }
  }
};
</script>

<style scoped>
  .nav-size{
    width: 30%;
  }
  #user {
    color: black;
  }
</style>