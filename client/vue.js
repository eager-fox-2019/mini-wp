let app = new Vue({
  el: '#app',
  data: {
    newUser : {
      name: "",
      email: "",
      password: "",
    },
    user : {
      name: "",
      email: "",
      password: "",
    },
    notifStat : false,
    message : "",
    page: "login",
    menu: "list",
    isLogin: false,
    articles: [],
    article: {
      id: "",
      title: "",
      content: "",
      created_at: "",
    },
    filter: "",
  },
  components: {
    'editor': Editor
  },
  methods: {
    register () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password
        }
      })
      .then((response) => {
        this.notifStat = true
        this.message = "Register Success!"
        app.$bvModal.show('notif-modal')
        this.newUser.name = ""
        this.newUser.email = ""
        this.newUser.password = ""
        this.rendLogin()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    login (){
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
      .then(({data}) => {
        this.user.name = data.name
        this.notifStat = true
        this.message = "Login Success!"
        app.$bvModal.show('notif-modal')
        this.isLogin = true
        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.name)
        this.rendHome()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    rendLogin () {
      this.page = "login"
    },
    rendRegister () {
      this.page = "register"
    },
    rendHome () {
      this.page = "home"
      this.rendList()
    },
    rendList () {
      this.menu = "list"
      this.getAll()
    },
    rendAdd () {
      this.article.title = ""
      this.article.content = ""
      this.menu = "add"
    },
    rendEdit () {
      axios({
        method: 'get',
        url: `http://localhost:3000/article/${this.article.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.article.title = data.title
        this.article.content = data.content
        this.article.id = data._id
        this.menu = "edit"
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    signOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.isLogin = false
      this.user.name = ""
      this.user.email = ""
      this.user.password = ""
      this.rendLogin()
    },
    getAll () {
      this.articles = []
      axios({
        method: 'get',
        url: 'http://localhost:3000/article/list',
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        for(i in data){
          data[i].preview = data[i].content.slice(0,20)
          this.articles.push(data[i])
        }
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    addArticle () {
      let data = {
        title: this.article.title,
        content: this.article.content,
        created_at: new Date(),
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/article/create',
        data: data,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.article.title = ""
        this.article.content = ""
        this.notifStat = true
        this.message = "Article Created!"
        app.$bvModal.show('notif-modal')
        this.rendList()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    convertDate (date) {
      let createdDate = new Date (date)
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `${days[createdDate.getDay()]}, ${createdDate.toString().slice(4,25)}`
    },
    getFilter() {
      this.articles = []
      axios({
        method: 'get',
        url: `http://localhost:3000/article/filter/title/${this.filter}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        for(i in data){ 
          this.articles.push(data[i])
        }
        if (this.articles.length === 0){
          this.notifStat = false
          this.message = `No articles found match with title ${this.filter}`
          app.$bvModal.show('notif-modal')
        }
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    getDetail(id) {
      axios({
        method: 'get',
        url: `http://localhost:3000/article/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        console.log(data)
        this.article.title = data.title
        this.article.content = data.content
        this.article.created_at = data.created_at
        this.article.id = data._id
        this.menu = "detail"
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    deleteArticle () {
      axios({
        method: 'delete',
        url: `http://localhost:3000/article/delete/${this.article.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.article.title = ""
        this.article.content = ""
        this.article.created_at = ""
        this.notifStat = true
        this.message = "Article Deleted!"
        app.$bvModal.show('notif-modal')
        this.rendList()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    updateArticle () {
      axios({
        method: 'patch',
        url: `http://localhost:3000/article/update/${this.article.id}`,
        data: {
          title: this.article.title,
          content: this.article.content
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.notifStat = true
        this.message = "Article Updated!"
        app.$bvModal.show('notif-modal')
        this.rendList()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    errorHandler (error){
      this.notifStat = false
      this.message = error.responseJSON.message
      app.$bvModal.show('notif-modal')
    }
  }
})