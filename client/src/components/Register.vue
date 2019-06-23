<template>
  <div class="container">
    <div class="row">
      <div class="col m6 l5 s12 offset-l3 offset-m3">
        <div class="card-panel center">
          <form @submit="register_button" action="#">
            <div class>
              <h5>Register Form</h5>
              <div class="input-field">
                <i class="material-icons prefix">account_circle</i>
                <input
                  v-model="register_name"
                  type="text"
                  id="register_name"
                  required
                  class="validate"
                >
                <label for="register_name">Name</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input
                  v-model="register_email"
                  type="email"
                  id="register_email"
                  class="validate"
                  required
                >
                <label for="register_email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">vpn_key</i>
                <input
                  v-model="register_password"
                  type="password"
                  id="register_password"
                  class="validate"
                  required
                >
                <label for="register_password">Password</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">vpn_key</i>
                <input
                  v-model="confirmpassword"
                  type="password"
                  id="confirmpassword"
                  class="validate"
                  required
                >
                <label for="confirmpassword">Confirm Password</label>
              </div>
            </div>
            <button class="btn" type="submit">Sign Up</button>
            <p>
              Already have an account?
              <a @click="login_link" href="#">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["myServer"],
  data() {
    return {
      register_name: "",
      register_email: "",
      register_password: "",
      confirmpassword: ""
    };
  },
  methods: {
    trigger_start_loading() {
      this.$emit("trigger_start_loading");
    },
    trigger_stop_loading() {
      this.$emit("trigger_stop_loading");
    },

    login_link() {
      // console.log("login link dari navbar");
      this.$emit("login_link");
    },
    register_button() {
      this.trigger_start_loading();
      if (this.register_password !== this.confirmpassword) {
        this.trigger_stop_loading();
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Your password and confirmation password do not match`
        });
      } else {
        axios({
          method: "post",
          url: `${this.myServer}/register`,
          data: {
            name: this.register_name,
            email: this.register_email,
            password: this.register_password
          }
        })
          .then(response => {
            this.trigger_stop_loading();
            Swal.fire(
              "Register Successfully!",
              "Please Login First",
              "success"
            );
            // console.log(response.data);
            (this.register_name = ""),
              (this.register_email = ""),
              (this.register_password = "");
            this.confirmpassword = "";
            this.login_link();
          })
          .catch(err => {
            this.trigger_stop_loading();
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data.message}`
            });
            console.log(err.response.data.message);
          });
      }
    }
  }
};
</script>