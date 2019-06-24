const BACKEND = `http://localhost:3000`
const axiosErrorHandler = (error) => {
  if (error.response) {
    if (error.response.data.message) {
      console.log(error.response.data);
      Swal.fire(
        `server says: ${error.response.status}`,
        `${error.response.data.message}`,
        "question"
      );
    } else {
      console.log(error.response.data);
      Swal.fire(
        `server says: ${error.response.status}`,
        `check the log`,
        "question"
      );
    }
  } else if (error.request) {
    Swal.fire("Server Unreachable", "check your internet", "warning");
    console.log(error.request);
  } else {
    Swal.fire("application error", "check log", "error");
    console.log(error);
  }
}


var app = new Vue({
  el: '#blog-post',
  data: {

    fetchedArticles: [],
    token: null,
    signInMethod: {
      google: false
    },
    reg: {},
    cred: {},
    user_id: null,
    user_name: null,
    user_email: null,
    mainPage: "home",
    readArticle: "",
    editArticle: "",
    newArticle: "",
    alert: null,
    search: ''
  },
  computed: {
    articles() {
      let search = this.search
      if (search && search.length > 3 && this.fetchedArticles.length > 0) {
        let searchx = RegExp(search, 'i')
        return this.fetchedArticles.filter(article =>
          article.tags.some(tag => searchx.test(tag)) ||
          searchx.test(article.title) ||
          searchx.test(article.content))
      }
      else return this.fetchedArticles
    },
    // articles: function () {

    //   return []
    // }
  },

  mounted() {

    this.fetchHomeArticles()
    if (localStorage.getItem('mwp-token')
      // && localStorage.getItem('user_id')
    ) {
      this.token = localStorage.getItem('mwp-token')
      this.user_name = localStorage.getItem('user_name')
      this.user_email = localStorage.getItem('user_email')
      this.user_id = localStorage.getItem('user_id')
    }
  },

  methods: {
    setAlert(message) {
      this.alert = message
      let self = this
      setTimeout(() => { self.alert = null }, 2000)
    },
    setRead(_id) {
      this.mainPage = "read"
      this.readArticle = this.articles.find(ar => ar._id == _id)
      // console.log(`reading this article:`, _id)
    },
    remove(_id) {
      axios({
        method: 'delete',
        url: `${BACKEND}/article/${_id}`,
        headers: { token: this.token },
      })
        .then(({ data }) => {
          this.fetchHomeArticles()          
        })
        .catch(axiosErrorHandler)
    },
    setEdit(_id) {
      console.log(`editting this article:`, _id)
      this.mainPage = "edit"
      this.editArticle = this.articles.find(ar => ar._id == _id)
    },
    setAdd(_id) {
      this.mainPage = "create"
      this.newArticle = {
        author: this.user_id,
        title: "",
        content: "",
        created_at: new Date,
        featured_image: "",
        tags: []
      }
    },
    patchArticle(article) {
      // console.log(`we are going to patch this article`)
      // Object.keys(article).forEach(key => console.log(key, article[key]))
      axios({
        method: 'patch',
        url: `${BACKEND}/article/${article._id}`,
        data: article,
        headers: { token: this.token },
      })
        .then(({ data }) => {
          this.fetchHomeArticles()          
        })
        .catch(axiosErrorHandler)        
    },

    addArticle(article) {
      axios({
        method: 'post',
        url: `${BACKEND}/article`,
        data: article,
        headers: { token: this.token },
      })
        .then(({ data }) => {
          this.fetchHomeArticles()
        })
        .catch(axiosErrorHandler)
    },
    fetchHomeArticles() {
      this.mainPage = 'home';
      axios
        .get(`${BACKEND}/article-home`)
        .then(response => (this.fetchedArticles = response.data))
        .catch(axiosErrorHandler)
    },
    fetchMyProfile() {

    },
    fetchMyArticles() {
      this.mainPage = 'home';
      axios
        .get(`${BACKEND}/article/`, { headers: { token: this.token } })
        .then(response => (this.fetchedArticles = response.data))
        .catch(axiosErrorHandler)
    },
    logout() {
      if (typeof gapi !== 'undefined' && gapi && gapi.auth2.getAuthInstance().isSignedIn.get()) {
        // if (localStorage.getItem('login-method') === 'google') {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('Google User signed out.');
        });
      }
      localStorage.clear()
      this.token = null;
      this.user_id = null;
      this.user_email = null;
      this.user_name = null;
      this.fetchHomeArticles();
    },

    regularLogin(loginData) {

      this.mainPage = 'home'

      axios.post(`${BACKEND}/auth/login`, loginData)
        .then(({ data }) => {
          this.logout()
          localStorage.setItem('mwp-token', data.token)
          localStorage.setItem('user_id', data.user._id)
          localStorage.setItem('user_email', data.user.email)
          localStorage.setItem('user_name', data.user.name)
          this.token = data.token
          this.user_id = data.user._id
          this.user_email = data.user.email
          this.user_name = data.user.name
          
        })
        .catch(axiosErrorHandler)
        .finally(_ => { this.mainPage = 'home' })
    },
    regularRegister(registerData) {

      axios.post(`${BACKEND}/auth/register`, registerData)
        .then(({ data }) => {
          Swal.fire(
            `Registered`,
            `You can now Log in to our system`,
            "success"
          );
        }).catch(axiosErrorHandler)
        .finally(_ => { this.mainPage = 'home' })
    }
  }
})

function onGoogleSignIn() {
  const googleUser = gapi.auth2.getAuthInstance().currentUser.get();

  let profile = googleUser.getBasicProfile();
  // console.log("ID: " + profile.getId());
  // console.log('Full Name: ' + profile.getName());
  // console.log('Given Name: ' + profile.getGivenName());
  // console.log('Family Name: ' + profile.getFamilyName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail());

  let id_token = googleUser.getAuthResponse().id_token;
  localStorage.setItem('login-method', 'google')

  axios({
    method: 'post',
    url: `${BACKEND}/auth/google-login`,
    data: { token: id_token }
  })
    .then(({ data }) => {
      console.log(data.user._id)
      console.log(data.user.email)
      console.log(data.user.name)
      console.log(data.token)
      app.token = data.token
      app.user_id = data.user._id
      app.user_email = data.user.email
      app.user_name = data.user.name
      app.mainPage = 'home';
    })
    .catch(err => {
      app.logout()
      axiosErrorHandler(err)
    })
  localStorage.setItem('login-method', 'google')
}