<template>
  <div sticky-container>
    <canvas class="background"></canvas>
    <navbar :islogin="isLogin" @clicked="checkLogin"></navbar>
    <b-notification
      auto-close
      :type="type"
      :active.sync="isActive"
      aria-close-label="Close notification"
    >{{message}} {{email}}</b-notification>
    <router-view></router-view>
    <futer v-sticky sticky-z-index="1" sticky-side="bottom"></futer>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import futer from "./components/futer.vue";
import particle from "particlesjs";
export default {
  data() {
    return {
      message: "Not signed in",
      isLogin: false,
      email: "",
      type: "is-warning",
      isActive: false
    };
  },
  components: {
    navbar,
    futer
  },
  created() {},
  methods: {
    initParticle() {
      particle.init({
        selector: ".background",
        maxParticles: 50,
        color: "#b1b1b1",
        connectParticles: true,
        speed: 0.1
      });
    },
    checkLogin() {
      if (localStorage.hasOwnProperty("token")) {
        this.isLogin = true;
        this.email = localStorage.getItem("email");
        this.message = "Signed in as";
        this.type = "is-success";
        this.isActive = true;
      } else {
        this.isLogin = false;
        this.email = "";
        this.message = "Not signed in";
        this.type = "is-warning";
        this.isActive = true;
      }
    }
  },
  mounted() {
    this.initParticle();
    this.checkLogin();
  }
};
</script>
<style>
/* LOAD CUSTOM FONT */
@font-face {
  font-family: "Impact";
  src: url("./fonts/impact.ttf") format("truetype"); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
}

.is-divider {
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin: 20px 0;
}

.searchbar {
  max-width: 700px;
}

html {
  /* background-image: url("/static/img/bg.png"); */
  margin: 0;
  padding: 0;
  background-color: #c8c8c8;
}

body {
  background-color: #ffffff;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.hero.has-background {
  position: relative;
  overflow: hidden;
}
.hero-background {
  position: absolute;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
.hero-background.is-transparent {
  opacity: 0.3;
}
</style>
