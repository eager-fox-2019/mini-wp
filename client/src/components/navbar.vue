<template>
  <nav class="navbar navbar-dark bg-dark">
    <div id="brand-header">
      <a class="navbar-brand" href="#">
        <span id="logo"><i class="fab fa-wordpress"></i></span>
        <p id="brand-text">Mini Wordpress</p>
      </a>
    </div>
    <div id="navbar-avatar-section">
      <a id="logout-link" @click.prevent="logout" href=""><span><i class="fas fa-sign-out-alt"></i></span> Log Out</a>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      logout() {
        this.$emit('logout');
      }
    }
  }
</script>

<style>

</style>
