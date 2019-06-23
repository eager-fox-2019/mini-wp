<template>
  <div class="container">
          <div class="d-flex justify-content-center h-100">
            <div class="card">
              <div class="card-header">
                <h3>Register</h3>
              </div>
              <div class="card-body">
                <form method="post" v-on:submit.prevent="registerDetail">
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="first name" v-model="registerFirst" required>
                  </div>
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="last name" v-model="registerLast" required>
                  </div>
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-at"></i></span>
                    </div>
                    <input type="email" class="form-control" placeholder="email" v-model="registerEmail" required>
                  </div>
                  <div class="input-group form-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input type="password" class="form-control" placeholder="password" v-model="registerPass" required>
                  </div>
                  <div class="form-group">
                    <input type="submit" value="Sign Up" class="btn float-right login_btn">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
</template>


<script>
  export default {
    data() {
      return {
        registerFirst: "",
        registerLast: "",
        registerEmail: "",
        registerPass: ""
      };
    },
    methods: {
      registerDetail() {
        this.$emit('registerDetail', {
          firstName: this.registerFirst,
          lastName: this.registerLast,
          email: this.registerEmail,
          password: this.registerPass
        })
      }
    }
  };
</script>

<style scoped>
</style>
