<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h3>Sign In</h3>
        </div>
        <div class="card-body">
          <form method="post" v-on:submit.prevent="loginDetail">
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-at"></i></span>
              </div>
              <input type="email" class="form-control" placeholder="email" v-model="loginEmail" required>
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" class="form-control" placeholder="password" v-model="loginPass" required>
            </div>
            <div class="form-group d-flex justify-content-between align-middle" style="margin-top: 30px;">
              <div id="google-signin">Google Sign in</div>
              <input type="submit" value="Login" class="btn float-right login_btn">
            </div>
          </form>
        </div>
        
        <!-- <div class="card-footer">
          <div class="d-flex flex-column justify-content-center links" >
              <div id="google-signin">Google Sign in</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        loginEmail: "",
        loginPass: ""
      };
    },
    methods: {
      loginDetail(){
        this.$emit('loginDetail', {
          email: this.loginEmail,
          password: this.loginPass
        })
      },
    }
  };
</script>

<style scoped>
</style>
