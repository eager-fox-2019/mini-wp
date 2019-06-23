<template>
  <div class="container">
    <meta
      name="google-signin-client_id"
      content="313761182339-mjt8tld6afecdnkb8s9vscpg9q24o05f.apps.googleusercontent.com"
    >
   
        <h3>Login</h3>
        <form @submit.prevent="userLogin">
          <div class="form-group">
            <label for="loginEmail">Email address</label>
            <input
              v-model="login.email"
              type="email"
              class="form-control"
              id="loginEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            >
          </div>
          <div class="form-group">
            <label for="loginPassword">Password</label>
            <input
              v-model="login.password"
              type="password"
              class="form-control"
              id="loginPassword"
              placeholder="Password"
            >
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >Sign in with Google</g-signin-button>
        </form>
        <br>
        <div id="errorLogin">
          <p class="error" style="color:red;">{{ error.login }}</p>
        </div>

  </div>
</template>
<script>
const url = `http://localhost:3000`;
export default {
  name: "login-page",
  props: ["islogin"],
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      error: {
        login: ""
      },
      googleSignInParams: {
        client_id:
          "313761182339-mjt8tld6afecdnkb8s9vscpg9q24o05f.apps.googleusercontent.com"
      }
    };
  },
  created() {},
  methods: {
    clearAll() {
      this.login.email = "";
      this.login.password = "";
      this.errorLogin = "";
    },
    onSignInSuccess(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: `${url}/google`,
        data: {
          googleToken: id_token
        }
      })
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          this.clearAll();
          this.showHome();
        })
        .catch(error => {
          this.error.login = `${error.response.data.message}`;
        });
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    },
    userLogin() {
      axios({
        method: "POST",
        url: `${url}/login`,
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.clearAll();
          this.showHome();
        })
        .catch(error => {
          this.error.login = `${error.response.data.message}`;
        });
    },
    showHome() {
      this.$emit("showHome");
    }
  }
};
</script>
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>