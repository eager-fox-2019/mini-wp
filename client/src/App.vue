<template>
  <div>  
    <div>
      <Navbar v-on:fetch="fetch"/>
    </div>
    <div>
      <ArticleList v-if="section === 'home'" v-on:toDetail="goTo" v-bind:articles="articles"></ArticleList>
    </div>
    <div>
      <ArticleDetail v-if="section === 'detail'" class="animated fadeIn" v-bind:detail="article" v-on:back="goBack"></ArticleDetail>
    </div>
    <div>
      <Foot v-on:withTag="getArticlesByTag"/>
    </div>
  </div>
</template>


<script>
import Navbar from './components/Navbar.vue'
import ArticleList from './components/ArticleList.vue'
import ArticleDetail from './components/ArticleDetail.vue'
import Foot from './components/Footer'
const baseUrl = 'http://localhost:3000'

export default {
  name: 'App',
  components: {
    Navbar,
    ArticleList,
    ArticleDetail,
    Foot
  },
  data() {
    return {
    isLogin: false,
    section: 'home',
    articles: [],
    article: {},
    tags: [],
    username: '',
    }
  },
  methods: {
    goTo(section, article) {
      this.section = section
      this.article = article
    },

    goBack(option) {
      this.section = option
      this.getArticles()
    },

    fetch(option) {
      if (option === 'all') this.getArticles('all')
      if (option === 'published') this.getArticles('published')
      if (option === 'draft') this.getArticles('draft')
    },

    getArticles(option) {
      this.articles = []
      axios({
        method: 'get',
        url: `${baseUrl}/articles`
      })
      .then(({data}) => {
        console.log(data.data)
        this.articles = data.data
        this.section = 'home'
        let articles = []
        if (option === 'published') {
          this.articles.forEach(article => {
            if (article.author._id === localStorage.id && article.published === true) articles.push(article)
          })     
          this.articles = articles
        } else if ( option === 'draft') {
          let articles = []
          this.articles.forEach(article => {
            if (article.author._id === localStorage.id && article.published === false) articles.push(article)
          })     
          this.articles = articles    
        } else {
          this.articles.forEach(article => {
            if (article.published === true) articles.push(article)
          })     
          this.articles = articles
        }
      })
      .catch(err => {
        console.log(err)
      })
    },

    getArticlesByTag(tag) {
      this.articles = []
      axios({
        method: 'get',
        url: `${baseUrl}/articles?tag=${tag}`
      })
      .then(({data}) => {
        console.log(data.data)
        this.section = 'home'
        this.articles = data.data
      })
      .catch(err => {
        console.log(err)
      })
    },

  },
  mounted() {
    this.getArticles()
    console.log(this.articles)
  }
};
</script>

<style scoped>
</style>