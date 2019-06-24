const baseUrl = 'http://localhost:3000'
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
})

const app = new Vue({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component,
    "tags-input": VoerroTagsInput,
  },
  data: {
    isLogin: false,
    section: 'home',
    articles: [],
    article: {},
    username: '',
    loginUser: {
      email: '',
      password: ''
    },
    newUser: {
      name: '',
      email: '',
      password: ''
    },
    newArticle: {
      title: '',
      content: '',
      featuredImg: '', 
      tags: [],
    },
    existingTags: { 
        'Web Development': 'Web Development' ,
        'PHP': 'PHP',
        'JavaScript': 'JavaScript',
    }
  },
  methods : {
    register () {
      axios({
        url: `${baseUrl}/users/register`,
        method: 'post',
        data: {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password
        }
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    login() {
      console.log(this.loginUser.email)
      axios({
        url: `${baseUrl}/users/login`,
        method: 'post',
        data: {
          email: this.loginUser.email,
          password: this.loginUser.password
        }
      })
      .then(({data}) => {
        console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('id', data.id)
          localStorage.setItem('email', data.email)
          this.username = data.name
          this.loginUser.email = ''
          this.loginUser.password = ''
          this.isLogin = true
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        this.loginUser.email = ''
        this.loginUser.password = ''
      })
    },

    logout() {
      Swal.fire({
        title: 'Log out?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'See u soon..',
          )
          localStorage.removeItem('token')
          localStorage.removeItem('name')
          localStorage.removeItem('email')
          const auth2 = gapi.auth2.getAuthInstance()
          auth2.signOut()
          this.isLogin = false
        }
      })
    },

    checkLogin () {
      if (localStorage.hasOwnProperty('token')) {
        this.username = localStorage.name
        this.isLogin = true
      }
      else this.isLogin = false
    },

    getArticles() {
      this.articles = []
      axios({
        method: 'get',
        url: `${baseUrl}/articles`
      })
      .then(({data}) => {
        console.log(data.data)
        this.articles = data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    
    createArticle() {
      console.log(this.newArticle)
      axios({
        url: `${baseUrl}/articles`,
        method: 'post',
        data: {
          title: this.newArticle.title,
          featuredImg: this.newArticle.featuredImg,
          content: this.newArticle.content,
          tags: this.newArticle.tags
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
      // this.newArticle.title = ''
      // this.newArticle.content = ''
      // this.newArticle.featuredImg = 'Choose Feature Image..', 
      // this.newArticle.tags = []
    },

    previewFile() {
      this.newArticle.featuredImg = this.$refs.myFile.files[0]
      console.log(this.newArticle.featuredImg)
    },

    articleDetail(id) {
      this.article = this.articles.find(article => article._id === id)
      console.log(this.article)
      this.section = 'detail'
    },

    backToHome() {
      this.section = 'home'
    },
    checkAuthor(id) {
      let article = this.articles.find(article => {
        return article._id === id
      })

      if (this.isLogin === true) {
        if (article.author._id === localStorage.id) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },

  created () {
  },

  mounted () {
    this.checkLogin()

    this.getArticles()
  },

  watch: {
    
  },
  computed: {
    momentDate() {
      return moment(this.article.postedAt).format('MMMM Do YYYY')
    },

   
  }
})

function onSignIn(googleUser) {
  const idToken= googleUser.getAuthResponse().id_token
  app.isLogin = true

  axios({
    url: `${baseUrl}/users/loginGoogle`,
    method: 'post',
    data:{idToken}
  })
  .then(({data}) => {
    console.log(data)
    localStorage.setItem('token', data.token)
    localStorage.setItem('name', data.name)
    localStorage.setItem('email', data.email)
    this.username = localStorage.name
  })
  .catch(err => {
    console.log(err.config)
  })
}

function renderButton() {
  gapi.signin2.render('g-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}