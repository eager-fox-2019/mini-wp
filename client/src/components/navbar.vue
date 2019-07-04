<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link :to="'/'" class="navbar-item">
        <img src="/static/img/logo-1.png" alt="Buefy">
      </router-link>
      <a class="navbar-item" href="https://github.com/dion-michael" target="_blank">
        <b-icon pack="fab" icon="github"></b-icon>
      </a>
      <a
        class="navbar-item"
        href="https://www.linkedin.com/in/dion-michael-19ba3613b/"
        target="_blank"
      >
        <b-icon pack="fab" icon="linkedin"></b-icon>
      </a>
      <a
        role="button"
        class="navbar-burger"
        :class="{'is-active': showNav}"
        aria-label="menu"
        aria-expanded="false"
        @click="showNav = !showNav"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{'is-active': showNav}">
      <div class="navbar-end">
        <a class="navbar-item has-text-centered" v-if="islogin" @click="showNav = !showNav">
          <router-link to="/article/new">New Post</router-link>
        </a>
        <a class="navbar-item has-text-centered" v-if="islogin" @click="showNav = !showNav">
          <router-link to="/your-stories">Your Posts</router-link>
        </a>
        <a class="navbar-item has-text-centered" v-if="islogin" @click="logout">Logout</a>
        <b-dropdown
          position="is-bottom-left"
          class="has-text-centered"
          aria-role="menu"
          v-if="!islogin"
        >
          <a class="navbar-item has-text-centered" slot="trigger" role="button">
            <span>Login</span>
          </a>
          <b-dropdown-item aria-role="menu-item" custom v-if="!islogin">
            <div class="container" id="login-logo-container">
              <img src="/static/img/logo-1.png" alt="Buefy" style="max-width: 200px;">
            </div>
            <form @submit.prevent="doSomething" id="formLogin">
              <div class="modal-card" style="max-width: 300px">
                <section class="modal-card-body">
                  <b-field label="Name" v-if="register">
                    <input class="input" type="text" placeholder="Username" v-model="username">
                  </b-field>

                  <b-field class="file is-fullwidth" v-if="register">
                    <b-upload v-model="picture" accept="image/*" @change="onFilePicked">
                      <a class="button is-primary">
                        <b-icon icon="upload"></b-icon>
                        <span>profile picture</span>
                      </a>
                    </b-upload>
                    <span class="file-name" v-if="picture">{{ picture.name }}</span>
                  </b-field>

                  <b-field label="Email">
                    <b-input v-model="email" type="email" placeholder="Your email" required></b-input>
                  </b-field>

                  <b-field label="Password">
                    <b-input
                      v-model="password"
                      type="password"
                      password-reveal
                      placeholder="Your password"
                      required
                    ></b-input>
                  </b-field>

                  <b-checkbox v-if="!register">Remember me</b-checkbox>
                </section>
                <footer class="modal-card-foot" v-if="!register">
                  <button class="button is-primary">Login</button>
                  <span>
                    Don't have an account?
                    <a @click="register = true">Register</a>
                  </span>
                </footer>
                <footer class="modal-card-foot" v-if="register">
                  <button class="button is-primary" :class="{'is-loading': loading}">Register</button>
                  <span>
                    Already have an account?
                    <a @click="register = false">Login</a>
                  </span>
                </footer>
                <footer>
                  <GoogleLogin
                    class="button"
                    :params="params"
                    :onSuccess="onSuccess"
                    :onFailure="onFailure"
                  >
                    <b-icon pack="fab" icon="google" style="margin-right: 10px"></b-icon>Sign In
                  </GoogleLogin>
                </footer>
              </div>
            </form>
            <section>
              <b-notification
                auto-close
                :duration="5000"
                type="is-danger"
                :active.sync="isActive"
                aria-close-label="Close notification"
              >{{error.message}}</b-notification>
            </section>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>


<script>
import miniwp from "../api/miniwp";
import Swal from "sweetalert2";
import GoogleLogin from "vue-google-login";
export default {
  name: "navbar",
  data() {
    return {
      showNav: false,
      register: false,
      username: "",
      picture: null,
      imgurl: "",
      email: "",
      password: "",
      error: {
        code: 0,
        message: ""
      },
      isActive: false,
      loading: false,
      params: {
        client_id:
          "400113825781-ojq56cp3u9h4hgb5nnuekc3nl878i55g.apps.googleusercontent.com"
      }
    };
  },
  props: ["islogin"],
  mounted() {},
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);
      let id_token = googleUser.getAuthResponse().id_token;
      console.log(googleUser.getAuthResponse());
      miniwp({
        url: "/users/google",
        method: "POST",
        data: {
          googleToken: id_token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.showNav = false;
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          this.$emit("clicked");
        })
        .catch(err => {
          this.error = err.response.data;
          console.log(this.error);
          this.isActive = true;
        });
    },
    onFailure() {
      console.log("error");
    },
    doSomething() {
      if (this.register) {
        this.uploadImg();
      } else {
        this.login();
      }
    },
    login() {
      console.log(this.email);
      miniwp({
        url: "/users/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.showNav = false;
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          this.$emit("clicked");
        })
        .catch(err => {
          this.error = err.response.data;
          console.log(this.error);
          this.isActive = true;
        });
    },
    logout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You have to login to create a post",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, bye!",
        cancelButtonText: "Nope"
      }).then(result => {
        if (result.value) {
          localStorage.clear();
          this.$emit("clicked");
          this.showNav = false;
          this.$router.push(`/`);
        }
      });
    },
    uploadImg() {
      if (this.picture) {
        this.loading = true;
        let formData = new FormData();
        formData.append("image", this.picture);
        miniwp({
          url: "/upload",
          method: "POST",
          headers: {
            token: localStorage.getItem("token")
          },
          timeout: 8000,
          data: formData
        })
          .then(({ data }) => {
            this.imageurl = data.link;
            this.registerNew();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.registerNew();
      }
    },
    registerNew() {
      miniwp({
        url: "/users/register",
        method: "POST",
        timeout: 8000,
        data: {
          username: this.username,
          picture: this.imageurl,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.showNav = false;
          Swal.fire(
            "Registration successful!",
            "Please login with your newly created account",
            "success"
          );
        })
        .catch(err => {
          console.log(err.response);
          if (err.response) {
            this.error = err.response.data.err;
            console.log(this.error);
            this.loading = false;
            this.isActive = true;
          } else {
            Swal.fire("We are sorry", "something went wrong", "error");
          }
        });
    },
    onFilePicked(e) {
      const fr = new FileReader();
      fr.readAsDataURL(this.picture);
      fr.addEventListener("load", () => {
        this.imgurl = fr.result;
      });
      console.log(this.imgurl);
    }
  },
  components: {
    GoogleLogin
  }
};
</script>
<style scoped>
.modal-card-foot {
  background-color: white;
}
#login-logo-container {
  text-align: center;
}
</style>

