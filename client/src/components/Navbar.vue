<template>
  <div>

    <nav class="container navbar navbar-expand-lg navbar-light bg-light" style="justify-content:space-between; border-bottom: 2px solid #444">
      <div>
        <img src="https://images.vexels.com/media/users/3/150065/isolated/preview/275104d129d5b0b6247395c41816ff00-terrified-anime-eye-illustration-by-vexels.png" style="width:50px; margin-top:-15px">
        <a @click="fetchList" class="navbar-brand text-dark" style="cursor:pointer"><h1>AniBurogu</h1></a>
      </div>
      <div v-if="!isLogin" class="d-flex" style="justify-content:space-between; width: 170px; align-items: baseline">
        <button class="btn btn-success my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">Login</button>
        <button class="btn btn-success my-2 my-sm-0" data-toggle="modal" data-target="#registerModal">Register</button>
      </div>
      

      <div v-if="isLogin" class="d-flex" style="justify-content:space-between; align-items: baseline">
        <span style="margin-right:10px">Hello, {{username}}</span>
        <div class="d-flex" style="justify-content:space-between; width:200px">
          <button class="btn btn-outline-dark my-2 my-sm-0" data-toggle="modal" data-target="#newArticleModal">Add Article</button>
          <button @click="logout" class="btn btn-danger my-2 my-sm-0">Logout</button>
        </div>
      </div>
    </nav>

    <div v-if="isLogin" class="container d-flex" style="justify-content:space-between; width: 500px; margin-top: 10px">
      <a @click="fetchList" class="text-dark" style="text-decoration: none; cursor: pointer">All</a>      
      <a @click="fetchPublished" class="text-dark" style="text-decoration: none; cursor: pointer">Published</a>
      <a @click="fetchDraft" class="text-dark" style="text-decoration: none; cursor: pointer">My Draft</a>
    </div>

    <LoginModal v-on:setLogin="login" ></LoginModal>
    <RegisterModal></RegisterModal>
    <ArticleModal v-on:fetch="fetchList" v-bind:existingTags="existingTags"></ArticleModal>
  </div>
</template>

<script>
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'
import ArticleModal from './ArticleModal.vue'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
})

export default {
  props: ['existingTags'],
  components: {
    LoginModal,
    RegisterModal,
    ArticleModal
  },
  data() {
    return {
    isLogin: false,
    username: '',
    }
  },
  methods: {
    checkLogin() {
      if (localStorage.hasOwnProperty('token')) {
        this.username = localStorage.name
        this.isLogin = true
      }
      else this.isLogin = false
    },

    login(option) {
      if (option) {
        this.isLogin = true 
        this.username = localStorage.name
      } else this.isLogin = false
    },

    logout() {
      Swal.fire({
        title: 'Log out?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          Toast.fire({
          title: 'See you soon'
        })
          localStorage.removeItem('token')
          localStorage.removeItem('name')
          localStorage.removeItem('email')
          const auth2 = gapi.auth2.getAuthInstance()
          auth2.signOut()
          this.isLogin = false
        }
      })
    },
    fetchList() {
      this.$emit('fetch', 'all')
    },
    fetchPublished() {
      this.$emit('fetch', 'published')
    },
    fetchDraft() {
      this.$emit('fetch', 'draft')
    }
  },
  mounted() {
    this.checkLogin()
  }
}
</script>

<style>

</style>
