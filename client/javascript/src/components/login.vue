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
                  <img src="https://img.icons8.com/ios/60/000000/infinity-large-filled.png">
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

                <p>
                  Not a member?
                  <a href id="regisButton">Register</a>
                </p>

                <p>or sign in with:</p>

                <!-- <div class="g-signin2 center" data-onsuccess="onSignIn"></div> -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
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
      logintype: false
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
      console.log(this.datauser);
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
        //  Toast.fire({
        //     type: 'success',
        //     title: 'Logged in successfully'
        //   })
          this.logintype = true;
        })
        .catch(err => {
          console.log(err);
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
          console.log(data, "regis");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
