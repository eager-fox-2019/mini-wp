<template>
  <div>
    <div v-if="page === 'login'" >
      <loginPage @loggedIn="page = $event"></loginPage>  
    </div>

    <div v-else-if="page === 'register'" >
      <registerPage @registered="page = $event"></registerPage>
    </div>

    <div v-else-if="page === 'main'">
      <navbar @logout="page = 'login'"></navbar>
      <section class="container-fluid">
        <div class="row">
          <sidebar @main-page="articlePage = $event"></sidebar>
          <listArticle v-if="articlePage === 'list-article'"  @article-action="articleAction"></listArticle>
          <readArticle v-if="articlePage === 'read-article'" :article="article"></readArticle>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import loginPage from "./login"
import registerPage from "./register"
import navbar from "./navbar"
import sidebar from "./sidebar"
import listArticle from "./listArticle"
import readArticle from "./readArticle"

export default {
  components: {
    loginPage,
    registerPage,
    navbar,
    sidebar,
    listArticle,
    readArticle
  },
  data() {
    return {
      page: 'login',
      articlePage: 'list-article',
      article: ''
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      // axios({
      //   method: 'POST',
      //   url: `${this.$serverUrl}/user/auth`,
      //   headers: {'token': localStorage.getItem('token')}
      // })
      // .then(() => {
      //   this.page = 'main'
      // })
      // .catch(() => swal.fire("Invalid token", "Please login", "error"))
      this.page = 'main'
    }
  },
  methods: {
    articleAction(action, articleDetail) {
      if (action === 'read') {
        console.log('here')
        this.articlePage = 'read-article'
        this.article = articleDetail
      }
    }
  }
}
</script>

<style scoped>

</style>


