var app = new Vue({
  el: '#app',
  data: {
    isLogin: false,
    currentPage: '',
    articles: [],
    registerUser: {},
    loginUser: {
      username: '',
      password: ''
    },
    selectedArticle: {},
    url_server: 'http://localhost:3000'
  },
  methods: {
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("app").style.marginLeft = "250px";
      document.getElementById("navbar-top").style.marginLeft = "0px";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("app").style.marginLeft= "0";
      document.getElementById("navbar-top").style.marginLeft = "0";
    },
    defaultLogin() {
      let sendLoginUser = {
        username: this.loginUser.username,
        password: this.loginUser.password
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
        full_name: this.registerUser.full_name,
        username: this.registerUser.username,
        password: this.registerUser.password,
        email: this.registerUser.email,
      }
      axios({
        method: 'POST',
        data: sendRegisterUser,
        url: `${this.url_server}/user/register`,
      })
        .then(({ data }) => {
          console.log('Successfully register data');
          this.registerUser = { full_name: '', username: '', password: '', email: ''}
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
          this.loginUser = { username: '', password: ''}    
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
        })
        .catch((err) => {
          console.log(err);
        })
    },
    changePage(inputPage, id) {
      if (id) {
        this.selectedArticle = articles.filter((article) => article._id == id)[0]
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
    sendNewArticle(val) {
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
      
      axios({
        method: method,
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        data: sendArticle,
        url: `${this.url_server}/article`
      })
        .then(({ data }) => {
          console.log('get data', data);
          if (method == 'PUT') {

          } else {
            this.articles.push(data)
          }
          this.currentPage = "content-list-articles"
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  created() {
    if (localStorage.token) {
      axios({
        method: 'GET',
        url: `${this.url_server}/article`,
      })
        .then(({ data }) => {
          this.isLogin = true
          this.articles = data
          this.currentPage = "content-list-articles"
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  mounted() {
    var tabs = document.querySelectorAll('#tabs-swipe');
    tabs.forEach((tab) => M.Tabs.init(tab))
    var sidenavs = document.querySelectorAll('.sidenav')
    sidenavs.forEach(sidenav => {
      M.Sidenav.init(sidenav);
    })
    var dropdowns = document.querySelectorAll('.dropdown-trigger')
    dropdowns.forEach((dropdown) => {
      M.Dropdown.init(dropdown);
    })
  },
})






