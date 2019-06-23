<template>
  <div id="navbar">
    <div class="nav-content logo-nav" @click="page = 'article'">
        <i class="fas fa-paper-plane logonya"></i>
      <div class="nav-content">Mini WordPress</div>
    </div>
    <div class="nav-content logout-nav" v-if="loginStatus === true" @click="logoutUser">
      <div class="nav-content">Sign Out</div>
      <i class="fas fa-sign-out-alt logonya"></i>
    </div>
    <div class="nav-content login-nav" v-if="!loginStatus && page != 'login'" @click="page = 'login'">
      <div class="nav-content">Sign In</div>
      <i class="fas fa-sign-in-alt logonya"></i>
    </div>
  </div> 
</template>
<script>
export default {
  props: ['page', 'login'],
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      register: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
    }
  },
  methods: {
    logoutUser() {
      $emit('logoutUser')
    },
  }
}
</script>

