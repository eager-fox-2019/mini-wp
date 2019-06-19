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
    articlesAuthor: [],
    selectedArticle: {
      title: '',
      published: null,
      content: '',
    },
    url_server: 'http://localhost:3000',
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
        url: `${this.url_server}/user/myprofile`
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
      axios.post(`${this.url_server}/user/login`, sendLoginUser)
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
        url: `${this.url_server}/user/register`,
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
      axios.post(`${this.url_server}/user/login`, {
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
        url: `${this.url_server}/user/logout`
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
    changePage(inputPage, id) {
      if (id) {
        this.selectedArticle = this.articles.filter((article) => article._id == id)[0]
      }
      this.currentPage = inputPage
    },
    getListArticles() {
      axios({
        method: 'GET',
        url: `${this.url_server}/article`
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
      console.log('masuk sendNewaArticle');
      
      let method
      if (val) {
        method = 'PUT'        
      } else {
        method = 'POST'
      }

      let sendArticle = {
        title: this.selectedArticle.title,
        published: this.selectedArticle.published,
        content: this.selectedArticle.content,
      }
      console.log(sendArticle);
      console.log('method used', method);
      console.log('ini nilai val', val);
      
      
      axios({
        method: method,
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        data: sendArticle,
        url: `${this.url_server}/article/${val}`
      })
        .then(({ data }) => {
          console.log('get data', data);
          this.getListArticles()
          // if (method == 'PUT') {
          //   let indexChanged = this.articles.findIndex(article => article._id === val);
          //   console.log('ini nilai indexchanged', indexChanged);
          //   this.articles.splice(indexChanged, 1, data)
          //   console.log('hasil splice', this.articles);
          // } else {
          //   this.articles.push(data)
          // }
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
        url: `${this.url_server}/article/${id}`
      })
        .then(({ data }) => {
          this.articles = this.articles.filter((article) => article._id !== id)
          console.log('Berhasil delete');
        })
        .catch((err) => {
          console.log(err);
        })
    },
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