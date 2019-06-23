<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light text-center">
    <a class="navbar-brand" href @click.prevent="do_nothing">
      <i class="fa fa-pencil text-primary fa-2x" aria-hidden="true"></i>
      <br>
      <small>MINI WP</small>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarToggle"
      aria-controls="navbarToggle"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggle">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item mx-3 text-center">
          <a @click.prevent="page_articles" v-if="isOnPage !== 'articles'" class="nav-link" href>
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <br>Feeds
          </a>
          <a
            class="nav-link active"
            v-if="isOnPage === 'articles'"
            href
            @click.prevent="do_nothing"
          >
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            <br>Feeds
          </a>
        </li>
        <li class="nav-item mx-3 text-center">
          <a
            class="nav-link"
            href
            @click.prevent="page_myarticles"
            v-if="isOnPage !== 'myarticles'"
          >
            <i class="fa fa-bookmark-o" aria-hidden="true"></i>
            <br>My
            Articles
          </a>
          <a
            class="nav-link active"
            href
            v-if="isOnPage === 'myarticles'"
            @click.prevent="do_nothing"
          >
            <i class="fa fa-bookmark-o" aria-hidden="true"></i>
            <br>My
            Articles
          </a>
        </li>
        <li class="nav-item mx-3 text-center">
          <a class="nav-link" href @click.prevent="page_setting" v-if="isOnPage !== 'setting'">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <br>Account
          </a>
          <a class="nav-link active" href v-if="isOnPage === 'setting'" @click.prevent="do_nothing">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <br>Account
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item mx-3 text-center">
          <a
            class="nav-link"
            @click.prevent="page_newarticle"
            v-if="isOnPage !== 'newarticle'"
            href
          >
            <i class="fa fa-plus" aria-hidden="true"></i>
            <br>Write
          </a>

          <a
            class="nav-link active"
            v-if="isOnPage === 'newarticle'"
            href
            @click.prevent="do_nothing"
          >
            <i class="fa fa-plus" aria-hidden="true"></i>
            <br>Write
          </a>
        </li>
        <li class="nav-item mx-3 text-center" @click.prevent="logout">
          <a class="nav-link" href>
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            <br>Sign
            Out
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["isOnPage"],
  data() {
    return {};
  },
  methods: {
    do_nothing() {},
    logout() {
      gapi.load("auth2", () => {
        var auth2 = gapi.auth2.init({
          client_id:
            "647848106811-cm0ck452dmhg5b8g38n0dh2bu8ovv7hh.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin"
        });
        gapi.auth2
          .getAuthInstance()
          .signOut()
          .then(() => {
            localStorage.clear();
            swal("Logged Out", `Goodbye!`, "success");
            this.$emit("berhasil_logout");
          })
          .catch(err => {
            console.log(err);
            this.$emit("berhasil_logout");
            localStorage.clear();
          });
      });
    },
    page_articles() {
      this.$emit("pindah_articles");
    },
    page_myarticles() {
      this.$emit("pindah_myarticles");
    },
    page_setting() {
      this.$emit("pindah_setting");
    },
    page_newarticle() {
      this.$emit("pindah_newarticle");
    }
  }
};
</script>

<style scoped>
</style>

