new Vue({
  el: '#app',
  data: {
    page: "",
    articles: [],
    selectedArticle: {},
    editedArticle: {},
    editedArticleIndex: null,
    newTitle: "",
    newContent: "",
    searchTitle: "",
    selectedId: null
  },
  components: {
    'editor': Editor
  },
  created: function(){
    axios({
      method: "GET",
      url: "http://localhost:3000/article"
    })
      .then(({data}) => {
        this.articles = data
      })
  },
  computed: {
    filterTitle(){
      return this.articles.filter(article => {
        return article.title.includes(this.searchTitle)
      })
    }
  },
  methods: {
    showPage(page) {
      this.page = page
    },
    addArticle(){
      axios({
        method: "POST",
        url: "http://localhost:3000/article",
        data: {
          title: this.newTitle,
          content: this.newContent
        }
      })
        .then(({data}) => {
          this.page = "article-list"
          this.articles.push(data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteArticle(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/article/${id}`
      })
        .then(() => {
          let filter = this.articles.filter(article => article._id !== id)
          this.articles = filter
        })
        .catch(err => {
          console.log(err)
        })
    },

    editArticle(id) {
      axios({
        method: "PATCH",
        url: `http://localhost:3000/article/${id}`,
        data: {
          title: this.newTitle,
          content: this.newContent
        }
      })
        .then(() => {
          this.articles[this.editedArticleIndex].title = this.newTitle
          this.articles[this.editedArticleIndex].content = this.newContent
          this.page = "article-list"
        })
    },

    displayArticle(id) {
      for(let article of this.articles) {
        if(article._id === id) {
          this.selectedArticle = article
        }
      }
      this.page = "article-display"
    },

    displayEdit(id) {

      for(let i = 0; i<= this.articles.length-1; i++) {
        let article = this.articles[i]
        if(article._id === id) {
          this.editedArticle = article
          this.newTitle = article.title
          this.newContent = article.content
          this.editedArticleIndex = i
        }
      }
      this.page = "article-edit"
    }


  }
});

