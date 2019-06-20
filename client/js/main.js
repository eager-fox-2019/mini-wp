var app = new Vue({
  el: '#app',
  data: {
    isLogin: false,
    currentLoginUser: {
      id: '',
      username: '',
      full_name: '',
      email: '',
    },
    currentPage: 'content-home',
    articles: [],
    selectedArticle: {
      title: '',
      published: null,
      content: '',
    },
    url_server: 'http://localhost:3000', //localhost:3000 34.87.23.92:80
    navTab: {
      drawer: null,
      menus: [
        { title: 'Home', icon: 'home', pageName: 'content-home' },
        { title: 'Add Article', icon: 'add_box', pageName: 'content-edit-article' },
        { title: 'All Articles', icon: 'dashboard', pageName: 'content-list-articles' },
      ],
    },
    right: null,
    logRegForm: {
      activeTab: null,
      registerUser: {},
      loginUser: {
        username: '',
        password: ''
      },
    },
    articlesPage: {
      activeTab: null,
    },
    searchArticle: "",
  },
  computed: {
    filteredArticlesAuthorAll() {
      return this.articles.filter(article => {
        let search = article.title.toLowerCase().includes(this.searchArticle.toLowerCase())
        let articlesAuthor = article.user_id._id == this.currentLoginUser.id
        return search && articlesAuthor
      })
    },
    filteredArticlesAuthorPublished() {
      return this.articles.filter(article => {
        let search = article.title.toLowerCase().includes(this.searchArticle.toLowerCase())
        let articlesAuthor = article.user_id._id == this.currentLoginUser.id
        let articlesPublished = article.published == true
        return search && articlesAuthor && articlesPublished
      })
    },
    filteredArticlesAuthorDraft() {
      return this.articles.filter(article => {
        let search = article.title.toLowerCase().includes(this.searchArticle.toLowerCase())
        let articlesAuthor = article.user_id._id == this.currentLoginUser.id
        let articlesDraft = article.published == false
        return search && articlesAuthor && articlesDraft
      })
    },
    allArticlesPublished() {
      return this.articles.filter((article) => {
        return article.published == true
      })
    }
  },
  methods: {
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
    defaultLogin() {
      let sendLoginUser = {
        username: this.logRegForm.loginUser.username,
        password: this.logRegForm.loginUser.password
      }
      axios.post(`${this.url_server}/users/login`, sendLoginUser)
        .then(({ data }) => {
          if (data.token) {
            let token = {
              token: data.token,
              token_type: 'default'
            }
            localStorage.setItem('token', JSON.stringify(token))
            this.getListArticles()
            this.getUserProfile()
            this.isLogin = true
            this.currentPage = "content-list-articles"
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    sendRegisterUser() {
      let sendRegisterUser = {
        full_name: this.logRegForm.registerUser.full_name,
        username: this.logRegForm.registerUser.username,
        password: this.logRegForm.registerUser.password,
        email: this.logRegForm.registerUser.email,
      }
      axios({
        method: 'POST',
        data: sendRegisterUser,
        url: `${this.url_server}/users/register`,
      })
        .then(({ data }) => {
          console.log('Successfully register data');
          this.logRegForm.registerUser = { full_name: '', username: '', password: '', email: ''}
        })
        .catch((err) => {
          console.log(err);
        })
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios.post(`${this.url_server}/users/login`, {
        google_id_token: id_token
      })
        .then(({ data }) => {
          let token = {
            token: data.token,
            token_type: 'google'
          }
          localStorage.setItem('token', JSON.stringify(token))
          this.logRegForm.loginUser = { username: '', password: ''}    
          this.isLogin = true
          this.currentPage = "content-list-articles"   
        })
        .catch(err => {
          console.log(err);
        })
    },
    logout() {
      axios({
        method: 'POST',
        headers: {
          token: localStorage.token
        },
        url: `${this.url_server}/users/logout`
      })
        .then(({ data }) => {
          localStorage.removeItem("token");
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(() => {
            console.log('User signed out.');
          });
          this.isLogin = false
          this.currentPage = ""
          this.currentLoginUser = {
            id: '',
            username: '',
            email: '',
            full_name: '',
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    clearSelectedArticle() {
      this.selectedArticle = {
        title: '', 
        published: null,
        content: ''
      }
    },
    changePage(inputPage, id) {
      if (id) {
        this.selectedArticle = Object.assign({},this.articles.filter((article) => article._id == id)[0])
      } else {
        this.clearSelectedArticle()
      }
      this.currentPage = inputPage
    },
    getListArticles() {
      axios({
        method: 'GET',
        url: `${this.url_server}/articles`
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch((err) => {
          console.log(err);
        })
    },
    sendArticle(val) {
      event.preventDefault()
      let method
      if (val) {
        val = `/${val}`
        method = 'PUT'        
      } else {
        val = ''
        method = 'POST'
      }

      let sendArticle = {
        title: this.selectedArticle.title,
        published: this.selectedArticle.published,
        content: this.selectedArticle.content,
      }

      axios({
        method: method,
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        data: sendArticle,
        url: `${this.url_server}/articles${val}`
      })
        .then(({ data }) => {
          this.clearSelectedArticle()
          this.getListArticles()
          this.currentPage = "content-list-articles"
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteArticle(id) {
      axios({
        method: 'DELETE',
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        url: `${this.url_server}/articles/${id}`
      })
        .then(({ data }) => {
          this.articles = this.articles.filter((article) => article._id !== id)
          console.log('Berhasil delete');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  created() {
    if (localStorage.token) {
      this.isLogin = true
      this.currentPage = "content-list-articles"
      this.getUserProfile()
    }
    this.getListArticles()
  },
})