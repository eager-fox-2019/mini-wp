<template>
  <div>
    <div class="navbar-fixed">
      <nav class="white">
        <div class="container">
          <div class="nav-wrapper">
            <img src="/public/Background.png" alt="logo" class="brand-logo" width="168px">
            <a href="#" data-target="mobile-demo" class="sidenav-trigger black-text">
              <i class="material-icons">menu</i>
            </a>
            <ul class="right hide-on-med-and-down">
              <li v-if="!isLogin">
                <a @click="login_link" class="black-text" href="#!">
                  <i class="material-icons left">account_circle</i>Login
                </a>
              </li>
              <li v-if="!isLogin">
                <a @click="register_link" class="black-text" href="#!">
                  <i class="material-icons left">assignment_ind</i>Register
                </a>
              </li>
              <li v-if="isLogin">
                <a class="userprofile black-text">Hi, {{ userName }}</a>
              </li>
              <li v-if="isLogin">
                <a @click="user_logout" class="black-text" href="#!">
                  <i class="material-icons right">last_page</i>Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <!-- MOBILE SIDE NAVBAR -->
    <ul class="sidenav" id="mobile-demo">
      <li v-if="!isLogin">
        <a @click="login_link" href="#">
          <i class="material-icons left">account_circle</i>Login
        </a>
      </li>
      <li v-if="!isLogin">
        <a @click="register_link" href="#">
          <i class="material-icons left">assignment_ind</i>Register
        </a>
      </li>
      <li v-if="isLogin">
        <a class="userprofile">
          <i class="material-icons">face</i>
          {{ userName }}
        </a>
      </li>
      <li v-if="isLogin">
        <a @click="create_article_link" href="#">
          Create Article
          <i class="material-icons right">create</i>
        </a>
      </li>
      <li v-if="isLogin">
        <a @click="read_article_link" href="#">
          Read Article
          <i class="material-icons right">local_library</i>
        </a>
      </li>
      <li @click="my_fav_article_link" v-if="isLogin">
        <a href="#test3">
          My Fav Article
          <i class="material-icons right">favorite</i>
        </a>
      </li>
      <li @click="my_article_link" v-if="isLogin">
        <a href="#test4">
          My Article
          <i class="material-icons right">chrome_reader_mode</i>
        </a>
      </li>
      <li v-if="isLogin">
        <a @click="user_logout" href="#">
          <i class="material-icons right">last_page</i>Logout
        </a>
      </li>
    </ul>

    <div v-if="isLogin" class="row container">
      <div class="col s12">
        <ul class="tabs hide-on-med-and-down">
          <li class="tab col s12 m3 l3">
            <a @click="create_article_link" href="#">Create Article</a>
          </li>
          <li class="tab col col s12 m3 l3">
            <a @click="read_article_link" href="#">Read Article</a>
          </li>
          <li class="tab col col s12 m3 l3">
            <a @click="my_fav_article_link" href="#">My Fav Article</a>
          </li>
          <li class="tab col col s12 m3 l3">
            <a @click="my_article_link" href="#">My Article</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>chrome_reader_mode

<script>
export default {
  props: ["isLogin", "userName"],
  data() {
    return {};
  },
  methods: {
    login_link() {
      // console.log("login link dari navbar");
      this.$emit("login_link");
    },
    register_link() {
      // console.log("register link dari navbar");
      this.$emit("register_link");
    },
    user_logout() {
      // console.log("logout trigger");
      this.$emit("user_logout");
    },
    create_article_link() {
      // console.log('create_article_link dari MENU')
      this.$emit("create_article_link");
    },
    read_article_link() {
      // console.log('read_article_link dari MENU')
      this.$emit("read_article_link");
    },
    my_fav_article_link() {
      // console.log('my_fav_article_link dari MENU')
      this.$emit("my_fav_article_link");
    },
    my_article_link() {
      // console.log('my_article_link MENU')
      this.$emit("my_article_link");
    }
  }
};
</script>

<style scoped>
a {
  font-family: "Mali", cursive;
  font-size: 18px;
}
</style>
