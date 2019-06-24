<template>
  <div>
    <div v-show="logintype">
      <navigation/>
    </div>
    <div v-if="logintype">
      <listArticles/>
    </div>
    <main class="container" v-show="!logintype">
      <div class="content">
        <div class="row">
          <div class="col-sm-4 offset-sm-4">
            <!--login form-->
            <div id="loginForm">
              <form class="text-center border border-light p-5" @submit.prevent="login">
                <h1>
                  <img src="https://img.icons8.com/ios/50/000000/medium-logo-filled.png">
                </h1>
                <p class="h4 mb-4">Sign in</p>

                <input
                  type="email"
                  id="email"
                  class="form-control mb-4"
                  placeholder="E-mail"
                  v-model="datauser.email"
                >

                <input
                  type="password"
                  id="password"
                  class="form-control mb-4"
                  placeholder="Password"
                  v-model="datauser.password"
                >

                <button class="btn btn-info btn-block my-4" type="submit" id="login">Sign in</button>
                <p class="error" style="color:red;">{{ error.login }}</p>

                <p>or sign in with:</p>
                <div class="g-signin2 center" data-onsuccess="onSignIn"></div>
              </form>
            </div>
            <!--register form-->
            <div id="regisForm">
              <form class="text-center border border-light p-5" @submit.prevent="register">
                <p class="h4 mb-4">Sign up</p>
                <input
                  type="email"
                  id="Email1"
                  class="form-control mb-4"
                  placeholder="E-mail"
                  v-model="datauser.email"
                >

                <input
                  type="password"
                  id="Password1"
                  class="form-control mb-4"
                  placeholder="Password"
                  v-model="datauser.password"
                  aria-describedby="defaultRegisterFormPasswordHelpBlock"
                >

                <input
                  type="text"
                  id="Username1"
                  class="form-control"
                  placeholder="Username"
                  v-model="datauser.username"
                >

                <button class="btn btn-info my-4 btn-block" type="submit" id="register">Sign Up</button>

                <hr>

                <div id="errorRegister">
                  <p class="error" style="color:red;">{{ error.register }}</p>
                </div>
                <p>
                  By clicking
                  <em>Sign up</em> you agree to our
                  <a href target="_blank">terms of service</a>
                </p>
              </form>
            </div>
            <!--End register form-->
          </div>
        </div>
      </div>
    </main>
    <footer class="page-footer font-small blue-grey lighten-5">
      <div style="background-color: #21d192;">
          <div class="container">
            <div class="row py-4 d-flex align-items-center">
              <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6 class="mb-0">Get connected with us on social networks!</h6>
              </div>
              <div class="col-md-6 col-lg-7 text-center text-md-right">
                <a class="fb-ic">
                  <i class="fa fa-lg fa-facebook-f white-text mr-4"> </i>
                </a>
                <a class="tw-ic">
                  <i class="fa fa-lg fa-twitter white-text mr-4"> </i>
                </a>
                <a class="gplus-ic">
                  <i class="fa fa-lg fa-google-plus white-text mr-4"> </i>
                </a>
                <a class="li-ic">
                  <i class="fa fa-lg fa-linkedin white-text mr-4"> </i>
                </a>
                <a class="ins-ic">
                  <i class="fa fa-lg fa-instagram white-text"> </i>
                </a>
      
              </div>
            </div>
          </div>
        </div>

    <div class="footer-copyright text-center text-black-50 py-3 bg-light">© 2019 Copyright:
          <a> eager-fox</a>
        </div>
    </footer>
  </div>
</template>

<script>
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000
});
let baseUrl = `http://localhost:3006`;

import navigation from "./nav.vue";
import listArticles from "./listArticles.vue";

export default {
  components: {
    navigation,
    listArticles
  },
  data() {
    return {
      datauser: {
        username: "",
        email: "",
        password: ""
      },
      logintype: false,
      registype: false,
      error: {
        register: "",
        login: "",
        fetch: ""
      }
    };
  },
  created() {
    if (localStorage.token) {
      this.logintype = true;
    } else {
      this.logintype = false;
    }
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: `${baseUrl}/users/login`,
        data: {
          email: this.datauser.email,
          password: this.datauser.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          Toast.fire({
            type: "success",
            title: "Logged in successfully"
          });
          this.logintype = true;
        })
        .catch(err => {
          console.log(err);
          this.error.login = ` Error : ${err.response.data.message}`;
        });
    },
    register() {
      axios({
        method: "POST",
        url: `${baseUrl}/users/register`,
        data: {
          username: this.datauser.username,
          email: this.datauser.email,
          password: this.datauser.password
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "register successfully, please login ^^"
          });
          console.log(data, "regis");
        })
        .catch(err => {
          console.log(err);
          this.error.register = ` Error : ${err.response.data.message}`;
        });
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);

      $.ajax({
        url: `${baseUrl}/users/tokensignin`,
        method: "POST",
        data: {
          id_token: id_token
        },
        success: function(data) {
          localStorage.setItem("token", data.accessToken);
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style>
footer{
    margin-top: 7rem; 
}

#loginForm{
  background-color: aliceblue;
}

#regisForm{
  background-color: rgb(234, 248, 151);
}

</style>
