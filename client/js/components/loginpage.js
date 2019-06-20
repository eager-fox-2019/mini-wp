Vue.component("login-page", {
  props: ["input"],
  data() {
    return {
      inputLoginRegister: {
        email: "",
        password: ""
      }
    };
  },
  created() {
    this.load();
    this.inputLoginRegister = this.input;
  },
  mounted() {},
  methods: {
    load() {
      this.$emit("load");
    },
    login() {
      let { email, password } = this.inputLoginRegister;
      let inputValue = { email, password };
      console.log(inputValue);

      if (inputValue.email !== "" && inputValue.password !== "") {
        ax({
          method: "POST",
          url: "/users/login",
          data: inputValue
        })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            this.$emit("berhasil_login");
          })
          .catch(err => {
            if (err.response.data.message) {
              swal("attention", err.response.data.message, "error");
            } else {
              swal("Sorry", "Internal Server Error", "error");
            }
            console.log("error login biasa");
            console.log(JSON.stringify(err.response, null, 2));
          });
      }
    },
    page_register() {
      this.$emit("pindah_register");
    }
  },
  template: `
      <div>
        <form class="form-signin p-3 border" @submit.prevent="login">
          <div class="m-5">
            <center class="mb-4">
              <div class="my-3">
                <i
                  class="fa fa-pencil fa-5x text-primary border rounded-circle p-5 cus-shadow"
                  aria-hidden="true"
                ></i>
              </div>
              <h1>Mini WP</h1>
            </center>
            <center>
              <h5 class="font-weight-normal">Sign in to proceed</h5>
            </center>
            <div class="my-3">
              <label for="email" class="sr-only">Email address</label>
              <input
                v-model="inputLoginRegister.email"
                type="email"
                id="email"
                class="form-control"
                placeholder="Email address"
              />
              <label for="password" class="sr-only">Password</label>
              <input
                v-model="inputLoginRegister.password"
                type="password"
                id="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <input value="Sign In" class="btn btn-lg btn-primary btn-block my-3" type="submit">
              
            <div class="row mt-3 mb-3 align-items-center">
              <div class="col-md-7 mt-2">
                <small>
                  Have a Google account? Access this app using your Google
                  account!
                </small>
              </div>
              <div class="col-md-5 mt-2 justify-content-center">
                <center>
                  <div id="g-signin2"></div>
                </center>
              </div>
            </div>
            <div class="text-center">
              New to Us?
              <a href="" @click.prevent.prevent="page_register">Register</a>
            </div>
            <center>
              <p class="mt-3 mb-3 text-muted">© Novi Irnawati</p>
            </center>
          </div>
        </form>
      </div>
  `
});
