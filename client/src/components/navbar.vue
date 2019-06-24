<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand" v-if="isLogin">
        <a class="navbar-item" @click="$emit('click', 'home')">
          <i class="fab fa-wordpress" style="font-size:32px; color:darkblue; margin-right:15px"></i>
          <strong> MINI WP</strong>
        </a>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-brand" v-if="!isLogin">
        <a class="navbar-item" @click="$emit('click', 'login')">
          <i class="fab fa-wordpress" style="font-size:32px; color:darkblue; margin-right:15px"></i>
          <strong> MINI WP</strong>
        </a>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start" v-if="isLogin">
          <a class="navbar-item" @click="$emit('click', 'newArticle')" v-if="page != 'newArticle'"><i class="far fa-edit"></i> New Article</a>

          <a class="navbar-item" @click="$emit('click', 'myArticles')" v-if="page != 'myArticles'"><i class="far fa-newspaper"></i> My Articles</a>

          <!-- <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>

            <div class="navbar-dropdown">
              <a class="navbar-item">About</a>
              <a class="navbar-item">Jobs</a>
              <a class="navbar-item">Contact</a>
              <hr class="navbar-divider">
              <a class="navbar-item">Report an issue</a>
            </div>
          </div> -->
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a @click="$emit('click', 'register')" v-if="!isLogin" class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a @click="$emit('click', 'login')" v-if="!isLogin" class="button is-light">
                Log in
              </a>
              <a @click="$emit('click', 'logout')" v-if="isLogin" class="button is-light">
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import dropLogin from './dropdownSignIn.vue';

export default {
  props : ["isLogin", "page"],
  components : {
    dropLogin,
  },
  data(){
    return{
      loginClick : false
    }
  },
  methods : {

  }
}
</script>

