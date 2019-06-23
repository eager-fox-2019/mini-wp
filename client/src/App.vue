<template>
  <v-app>
    <Navbar app :isLoginParent="isLogin" :currentLoginUser="currentLoginUser" 
      v-on:set-currentLoginUser="setCurrentLoginUser"
      v-on:change-page="setCurrentPage" v-on:set-isLogin="setIsLogin"></Navbar>
    <v-content>
      <ContentDashboard v-if="isLogin && currentPage == 'content-list-articles'"
        :parentArticles="filteredArticlesAuthorAll" v-on:change-page="setCurrentPage"
        v-on:update-articles="getListArticles()"></ContentDashboard>
      <Registration v-if="currentPage == 'content-registration'"
        v-on:set-isLogin="setIsLogin" v-on:change-page="setCurrentPage"></Registration>

      <Home v-if="currentPage == 'content-home'"
        :parentArticles="allArticlesPublished" v-on:change-page="setCurrentPage"></Home>
      <AddEdit v-if="isLogin && currentPage == 'content-edit-article'"
        :slctArticleChild="selectedArticle" v-on:update-articles="getListArticles()"
        v-on:change-page="setCurrentPage"></AddEdit>
      <ArticleDetail :article="selectedArticle" v-if="currentPage == 'content-article-detail'">
        </ArticleDetail>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import Navbar from './navbar.vue'
import ContentDashboard from './content-list-articles.vue'
import Registration from './content-registration.vue'
import Home from './content-home.vue'
import AddEdit from './content-edit-add.vue'
import ArticleDetail from './content-article-detail.vue'

export default {
  components: {
    Navbar,
    ContentDashboard,
    Registration,
    Home,
    AddEdit,
    ArticleDetail
  },
  data() {
    return {
      isLogin: false,
      currentPage: 'content-home',
      currentLoginUser: {
        _id: '',
        username: '',
        full_name: ''
      },
      selectedArticle: {
        title: '',
        content: '',
        published: false,
      },
      articles: [],
      url_server: 'http://localhost:3000',
    };
  },
  computed: {
    allArticlesPublished() {
      return this.articles.filter((article) => {
        return article.published == true
      })
    },
    filteredArticlesAuthorAll() {
      return this.articles.filter(article => {
        let articlesAuthor = article.user_id._id == this.currentLoginUser.id
        return articlesAuthor
      })
    },
  },
  methods: {
    setSelectedArticle(val) {
      this.selectedArticle = val
    },
    setIsLogin(val) {
      this.isLogin = val
    },
    setCurrentPage(val) {
      if (typeof val == 'object') {
        this.selectedArticle = this.articles.filter((article) => article._id == val[1])[0]
        console.log('ini selected article', this.selectedArticle)
        this.currentPage = val[0]
      } else {
        this.currentPage = val
        this.selectedArticle = {}
      }
    },
    setCurrentLoginUser(val) {
      this.currentLoginUser = val
    },
    getListArticles() {
      axios({
        method: 'GET',
        url: `${this.url_server}/articles`
      })
        .then(({ data }) => {
          data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
          console.log(data)
          this.articles = data
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getUserProfile() {
      axios({
        method: 'GET',
        headers: {
          token: JSON.parse(localStorage.token).token,
        },
        url: `${this.url_server}/users/myprofile`
      })
        .then(({ data }) => {
          this.currentLoginUser = {
            id: data.id,
            username: data.username,
            full_name: data.full_name,
            email: data.email,
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  created() {
    this.getListArticles()
    if (localStorage.token) {
      this.getUserProfile()
      this.isLogin = true
      this.currentPage = 'content-list-articles'
    }
  }
};
</script>