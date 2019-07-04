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
          <readArticle v-else-if="articlePage === 'read-article'" :article="article"></readArticle>
          <addArticle v-else-if="articlePage === 'add-article'" @add-article="articlePage = 'list-article'"></addArticle>
          <editArticle v-else-if="articlePage === 'edit-article'" @article-action="articleAction" :articleEdit="article"></editArticle>
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
import addArticle from "./addArticle"
import editArticle from "./editArticle"

export default {
  components: {
    loginPage,
    registerPage,
    navbar,
    sidebar,
    listArticle,
    readArticle,
    addArticle,
    editArticle
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
      if (action === 'read') this.articlePage = 'read-article'
      else if(action === 'edit') this.articlePage = 'edit-article'

      this.article = articleDetail
    }
  }
}
</script>

<style scoped>

</style>


