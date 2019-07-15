<template>
  <nav class="navbar navbar-expand-lg bg-primary" style="opacity:0.7">
    <a v-if="!islogin" class="navbar-brand" style="color:white">Mini WordPress</a>

    <a
      v-if="islogin"
      class="navbar-brand"
      style="cursor:pointer;color:white"
      v-on:click="showHome"
    >Mini WordPress</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span v-if="islogin" class="navbar-toggler-icon"></span>
    </button>
    <div v-if="islogin" class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" style="cursor:pointer;color:white" v-on:click="showArticle">MyArticle</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor:pointer;color:white" v-on:click="showCreate">Create</a>
        </li>
      </ul>

      <a class="nav-link disabled" style="cursor:pointer;color:white" v-on:click="logout">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar-home",
  props: ["islogin"],
  data() {
    return {
      message: "component navbar"
    };
  },
  created() {},
  methods: {
    showHome() {
      this.$emit("showHome");
    },
    showArticle() {
      this.$emit("showArticle");
    },
    showCreate() {
      this.$emit("showCreate");
    },
    logout() {
      localStorage.clear();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
      this.$emit("logout");
    }
  }
};
</script>