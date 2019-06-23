<template>
  <div class="container">
    <div class="row">
      <div class="col m6 l5 s12 offset-l3 offset-m3">
        <div class="card-panel center">
          <form @submit.prevent="login_button">
            <div class>
              <h5>Login Form</h5>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input
                  type="email"
                  v-model="login_email"
                  id="login_email"
                  class="validate"
                  required
                >
                <label for="login_email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">vpn_key</i>
                <input type="password" v-model="login_password" id="login_password">
                <label for="login_password">Password</label>
              </div>
            </div>
            <button class="btn" type="submit">Sign In</button>
            <p>
              Not a member?
              <a @click="register_link" href="#">Register</a>
            </p>
            <div class>
              <p>Or Sign In with:</p>
              <GoogleSignIn @initialization="initialization" :myServer="myServer"></GoogleSignIn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleSignIn from "../components/GoogleSignIn";

export default {
  components: {
    GoogleSignIn
  },
  props: ["myServer"],
  data() {
    return {
      login_email: "",
      login_password: ""
    };
  },
  methods: {
    initialization() {
      this.$emit("initialization");
    },
    register_link() {
      // console.log("register link dari navbar");
      this.$emit("register_link");
    },
    trigger_start_loading(){
      this.$emit('trigger_start_loading')
    },
    trigger_stop_loading(){
      this.$emit('trigger_stop_loading')
    },
    login_button() {
      // console.log("login button trigger");
      this.trigger_start_loading()
      axios({
        method: "post",
        url: `${this.myServer}/login`,
        data: {
          email: this.login_email,
          password: this.login_password
        }
      })
        .then(({ data }) => {
          // console.log(data);
          this.trigger_stop_loading()
          Swal.fire({
            position: "center",
            type: "success",
            title: "You have successfully logged in.",
            showConfirmButton: false,
            timer: 2000
          });
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          (this.login_email = ""), (this.login_password = "");
          this.initialization();
        })
        .catch(err => {
          // console.log("masuk error");
          this.trigger_stop_loading()
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
          console.log(err);
        });
    }
  }
};
</script>