<template>
  <div class="container">
        <h3>Register</h3>
        <form @submit.prevent="userRegister">
          <div class="form-group">
            <label for="registerEmail">Email address</label>
            <input
              v-model="register.email"
              type="email"
              class="form-control"
              id="registerEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            >
          </div>
          <div class="form-group">
            <label for="registerPassword">Password</label>
            <input
              v-model="register.password"
              type="password"
              class="form-control"
              id="registerPassword"
              placeholder="Password"
            >
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <br>
        <div id="errorRegister">
          <p class="error" style="color:red;">{{ error.register }}</p>
        </div>

  </div>
</template>
<script>
const url = `http://localhost:3000`;
export default {
  name: "register-page",
  props: ["islogin"],
  data() {
    return {
      register: {
        email: "",
        password: ""
      },
      error: {
        register: ""
      }
    };
  },
  created() {},
  methods: {
    clearAll() {
      this.register.email = "";
      this.register.password = "";
      this.error.register = "";
    },
    userRegister() {
      axios({
        method: "POST",
        url: `${url}/register`,
        data: {
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(result => {
          console.log(result.data);
          this.clearAll();
        })
        .catch(error => {
          this.error.register = `${error.response.data}`;
        });
    }
  }
};
</script>
