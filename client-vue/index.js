let vm = new Vue({
  el: "#app",
  data: {
    page: "",
    isLogin: true,
    articles: [],
    article: {
      title: "",
      content: ""
    },
    search: "",
    addEdit: "",
    showMessage: false,
    message: ""
  },
  methods: {
    listArticle() {
      axios.get('http://localhost:3000/api/article')
      .then(({ data }) => {
        data.forEach(item => {
          item.createdAt = item.createdAt.substring(0,10)
        })
        this.articles = data
        this.page='list-article'
      })
      .catch(err => {
        console.log(err)
      })
    },
    addArticle() {
      this.article = {
        title: "",
        content: ""
      }
      this.addEdit = 'Add'
      this.page='add-edit-article'
      this.$nextTick(() => {
        let quill = new Quill('#article-editor', {
          theme: 'snow'
        });
        quill.on('text-change', () => { this.article.content = quill.getText() } )
      })
    },
    editArticle(article) {
      this.article = {
        title: article.title,
        content: article.content,
        _id: article._id
      }
      this.addEdit = 'Edit'
      this.page = 'add-edit-article'
      this.$nextTick(() => {
        let quill = new Quill('#article-editor', {
          theme: 'snow'
        });
        quill.setText(this.article.content)
        quill.on('text-change', () => { this.article.content = quill.getText() } )
      })
    },
    saveArticle() {
      let serverUrl = `http://localhost:3000/api/article`
      let reqMethod = 'post'
      if (this.article._id) {
        serverUrl = `http://localhost:3000/api/article/${this.article._id}`
        reqMethod = 'put'
      }
      axios({
        method: reqMethod,
        url: serverUrl,
        data: this.article
      })
      .then(({ data }) => {
        this.showMessage = true
        this.message = `${this.article.title} successfully ${this.addEdit}ed`
        this.listArticle()
      })
      .catch(err => console.log(err))
    },
    readArticle(id) {
      let index = this.articles.findIndex(i => i._id === id)
      this.article = this.articles[index]
      this.page='read-article'
    },
    searchArticle() {
      axios.get(`http://localhost:3000/api/article/search?title=${this.search}`)
      .then(({ data }) => {
        this.articles = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteArticle(id) {
      axios.delete(`http://localhost:3000/api/article/${id}`)
      .then(() => {
        this.articles = this.articles.filter(element => element._id !== id)
        this.showMessage = true
        this.message = `${this.article.title} successfully deleted`
      })
      .catch(err => console.log(err))
    },
    listUser() {
      this.page='list-user'
    },
    hideMessage() {
      this.showMessage = false;
      this.message = "";
    }
  },
})

