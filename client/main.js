var app = new Vue({
  el: '#app',
  data: {
    isLogin: true,
    message: 'Hello Vue!',
    page: 'articleList',
    articleTitle: '',
    articleDescription: '',
    articleSearchTitle: '',
    articles: []
  },
  components: {
    'editor': Editor // <- Important part
  },
  created() {
    axios({
        method: 'GET',
        url: 'http://localhost:3000/api/articles'
      })
      .then(({data}) => {
        this.articles = data;
      })
      .catch((err) => {
        console.log('anyong lou shan');
      })
  },
  methods: {
    changePage(pageString) {
      this.page = pageString
    },
    addArticle() {
      if (this.articleTitle.length == 0) {
        Swal.fire({
          title: 'Oops',
          text: 'Title cannot be empty',
          type: 'error',
          confirmButtonText: 'Cool'
        })
        return '';
      }
      axios({
          method: 'POST',
          url: 'http://localhost:3000/api/articles',
          data: {
            title: this.articleTitle,
            description: this.articleDescription
          }
        })
        .then((response) => {
          Swal.fire(
            'Success',
            'Data added succesfully',
            'success'
          )
          this.articles.push(response.data);
          this.changePage('articleList');
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  computed: {
    filteredArticle() {
      return this.articles.filter((article) => {
        return article.title.toLowerCase().includes(this.articleSearchTitle.toLowerCase());
      })
    }
  }
})

