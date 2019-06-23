new Vue({
  el: '#app',
  data: {
    searchInput : "",
    page: '',
    loginStatus: localStorage.getItem('token') ? true : false,
    articles: [],
    error: '',
    newArticle: {
      title: '',
      description: '',
      content: '',
      image: ''
    },
    editArticle: {
      id: '',
      title: '',
      description: '',
      content: ''
    },
    login: {
      email: '',
      password: ''
    },
    register: {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    },
    errorLogin: {
      status: false,
      msg: ''
    },
    errorRegister: {
      status: false,
      msg: ''
    },
    loggedUser: {
      id: '',
      first_name: '',
      last_name: '',
      email: ''
    },
    successRegister: false,
    createdHook: false,
    listState: '',
    imagePreview: '',
    displayingArticle : '',
  },
  created: function() {
    if(this.loginStatus){
      this.page = 'article'
      let user = JSON.parse(localStorage.getItem('user'))
      this.loggedUser = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    } else {
      this.page = 'login'
    }
    this.createdHook = true
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/articles'
    })
    .then(({data}) => { 
      data.forEach(article => {
        if(article.user) {
          if(article.user.first_name && article.user.last_name) {
            article.user.first_name = article.user.first_name.charAt(0).toUpperCase() + article.user.first_name.slice(1)
            article.user.last_name = article.user.last_name.charAt(0).toUpperCase() + article.user.last_name.slice(1)
            article.creator = article.user.first_name + ' ' + article.user.last_name
          }
        }
        article.createdAt = new Date(article.createdAt).toLocaleString()
      });
      this.articles = data
      this.listState = 'all'
    })
  },
  methods: {
    getArticles() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/api/articles'
      })
      .then(({data}) => {
        data.forEach(article => {
          if(article.user) {
            if(article.user.first_name && article.user.last_name) {
              article.user.first_name = article.user.first_name.charAt(0).toUpperCase() + article.user.first_name.slice(1)
              article.user.last_name = article.user.last_name.charAt(0).toUpperCase() + article.user.last_name.slice(1)
              article.creator = article.user.first_name + ' ' + article.user.last_name
            }
          }
          article.createdAt = new Date(article.createdAt).toLocaleString()
        });
        this.page = 'article'
        this.articles = data
        this.listState = 'all'
      })
    },
    deleteArticle(id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/articles/${id}`
      })
      .then(() => {
        let filterNih = this.articles.filter(article => article._id !== id)
        this.articles = filterNih
        this.page = 'article'
      })
    },
    addArticle() {
      let formData = new FormData()
      formData.append('title', this.newArticle.title)
      formData.append('description', this.newArticle.description)
      formData.append('content', this.newArticle.content)
      formData.append('image', this.newArticle.image)
      axios({
        method: 'POST',
        url:  `http://localhost:3000/api/articles`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem('token')
        }
      })
      .then(result => {
        this.imagePreview = ''
        this.getByUser()
        this.newArticle = {
          title: '',
          description: '',
          content: ''
        }
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    registerUser(event) {
      let input = this.register
      axios({ 
        method: 'POST',
        url: `http://localhost:3000/api/users/register`,
        data: input
      })
      .then(({data}) => {
        for(let i in this.register) {
          this.register[i] = ''
        }
        this.successRegister = true
        this.errorRegister.status = false
        event.target.reset();
      })
      .catch(err => {
        this.errorRegister.status = true
        this.errorRegister.msg = err.response.data.message.split(':')[2]
      })
    },
    loginUser(event) {
      let input = this.login
      axios({ 
        method: 'POST',
        url: `http://localhost:3000/api/users/login`,
        data: input
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        event.target.reset();
        this.loggedUser = {
          id: data.user._id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email
        }
        this.errorRegister.status = false
        this.page = 'article'
        this.loginStatus = true
        this.errorLogin.status = false
        this.successRegister = false
        this.getByUser()
      })
      .catch(err => {
        this.errorLogin.status = true
        this.errorLogin.msg = err.response.data.message
      })
    },
    logoutUser() {
      this.login.email = ''
      this.login.password = ''
      localStorage.clear()
      this.loginStatus = false
      this.page = 'login'
    },
    findArticle(id) {
      axios({ 
        method: 'GET',
        url: `http://localhost:3000/api/articles/find/${id}`
      })
      .then(({data}) => {
        this.page = 'edit'
        this.editArticle = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    edit() {
      let formData = new FormData()
      formData.append('title', this.editArticle.title)
      formData.append('description', this.editArticle.description)
      formData.append('content', this.editArticle.content)
      formData.append('image', this.editArticle.picture)
      axios({ 
        method: 'PATCH',
        url: `http://localhost:3000/api/articles/${this.editArticle._id}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.imagePreview = ''
        this.getByUser()
        this.page = 'article'
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    getByUser() {
      axios({ 
        method: 'GET',
        url: `http://localhost:3000/api/articles/user/${this.loggedUser.id}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        data.forEach(article => {
          article.createdAt = new Date(article.createdAt).toLocaleString()
        });
        this.page = 'article'
        this.articles = data
        this.listState = 'owner'
      })
      .catch(err => {
        console.log(err.response)
        console.log(err.response.data.message)
      })
    },
    getDisplayingArticle(article) {
      this.displayingArticle = article
      this.page = 'display'
    },
    getPreview(e) {
      const file = e.target.files[0];
      if(!file) return
      this.newArticle.image = file
      this.editArticle.picture = file
      this.imagePreview = URL.createObjectURL(file);
    }
  },
  computed: {
    filteredList() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    },
    fullName() {
      this.loggedUser.first_name = this.loggedUser.first_name.charAt(0).toUpperCase() + this.loggedUser.first_name.slice(1)
      this.loggedUser.last_name = this.loggedUser.last_name.charAt(0).toUpperCase() + this.loggedUser.last_name.slice(1)
      return this.loggedUser.first_name + ' ' + this.loggedUser.last_name
    }
  },
  components: {
    'editor': Editor
  }
})