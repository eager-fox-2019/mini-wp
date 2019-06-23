<template>
  <header>
      <nav class="navbar navbar-dark navbar-expand bg-dark">
        <!-- Brand -->
        <h1 class="navbar-brand"><i class="fas fa-award"></i> Mini WP</h1>

        <!-- Links -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item"><span class="navbar-brand"><i class="fas fa-user-ninja"> {{ name }}</i></span></li>
          <li class="nav-item"><a @click.prevent="logout()" href="#" class="nav-link"><i class='fas fa-sign-out-alt'></i> Logout</a></li>
        </ul>
      </nav>
    </header>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = localStorage.getItem('name')
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.$emit('logout')
    }
  }
}
</script>
