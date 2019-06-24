<template>
  <div class="app">
    <navbar :isLogin="isLogin" :user="user" @signOut="signOut" @rendLogin="rendLogin" @rendRegister="rendRegister"></navbar>

    <register-page :page="page" :newUser="newUser" @register="register" @rendLogin="rendLogin"></register-page>
  
    <login-page :page="page" :user="user" @login="login" @rendRegister="rendRegister"></login-page>
  
    <home-page :page="page" :menu="menu" :article="article" :articles="articles" :user="user" @rendAdd="rendAdd" @rendList="rendList" @addArticle="addArticle" @changeImg="changeImg" @updateArticle="updateArticle" @filterByTitle="filterByTitle" @getAll="getAll" @getDetail="getDetail" @rendEdit="rendEdit" @deleteConfirm="$bvModal.show('delete-modal')" @addTag="addTag" @removeTag="removeTag" @filterByTag="filterByTag"></home-page>

    <notif-modal :notifStat="notifStat" :message="message"></notif-modal>

    <delete-confirm-modal @deleteArticle="deleteArticle"></delete-confirm-modal>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import navbar from './landing-page-component/navbar'
import register from './landing-page-component/register'
import login from './landing-page-component/login'
import home from './landing-page-component/home'
import notifModal from './landing-page-component/notif-modal'
import deleteConfirm from './landing-page-component/delete-confirm-modal'
import footer from './landing-page-component/footer'
export default {
  components: {
    'navbar': navbar,
    'register-page' : register,
    'login-page' : login,
    'home-page' : home,
    'notif-modal' : notifModal,
    'footer-bar' : footer,
    'delete-confirm-modal' : deleteConfirm
  },
  data() {
    return {
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
        user: {},
        img: "",
        imgSend: "",
        title: "",
        content: "",
        created_at: "",
        tags: []
      }
    };
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem('token')) {
        this.user.name = localStorage.getItem("name")
        this.isLogin = true
        this.rendHome()
      }
    },
    register () {
      axios({
        method: 'post',
        url: 'http://my-mini-wordpress-server.lyxcious.xyz/user/register',
        data: {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password
        }
      })
      .then((response) => {
        this.notifStat = true
        this.message = "Register Success!"
        this.$bvModal.show('notif-modal')
        this.newUser.name = ""
        this.newUser.email = ""
        this.newUser.password = ""
        this.page = "login"
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    login (){
      axios({
        method: 'post',
        url: 'http://my-mini-wordpress-server.lyxcious.xyz/user/login',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
      .then(({data}) => {
        this.user.name = data.name
        this.user.email = data.email
        this.user.password = ""
        this.notifStat = true
        this.message = "Login Success!"
        this.$bvModal.show('notif-modal')
        this.isLogin = true
        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.name)
        this.rendHome()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      let token = id_token
      axios({
        method: 'post',
        url: 'http://my-mini-wordpress-server.lyxcious.xyz/user/signingoogle',
        data: {
          token
        }
      })
      .then(({data}) => {
        this.user.name = data.name
        this.user.email = data.email
        this.user.password = ""
        this.notifStat = true
        this.message = "Login Success!"
        this.$bvModal.show('notif-modal')
        this.isLogin = true
        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.name)
        this.rendHome()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    signOut () {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.notifStat = true
      this.message = "Logout Success!"
      this.$bvModal.show('notif-modal')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.isLogin = false
      this.user.name = ""
      this.user.email = ""
      this.user.password = ""
      this.newUser.name = ""
      this.newUser.email = ""
      this.newUser.password = ""
      this.page = "login"
    },
    rendLogin () {
      this.newUser.name = ""
      this.newUser.email = ""
      this.newUser.password = ""
      this.page = "login"
    },
    rendRegister () {
      this.newUser.name = ""
      this.newUser.email = ""
      this.newUser.password = ""
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
      this.article.tags = []
      this.article.img = "http://www.jaipuriaschoolkanpurroad.in/gorakhpur-website/wp-content/uploads/2016/11/blank-img.jpg"
      this.menu = "add"
    },
    rendEdit () {
      axios({
        method: 'get',
        url: `http://my-mini-wordpress-server.lyxcious.xyz/article/${this.article.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.article.title = data.title
        this.article.content = data.content
        this.article.id = data._id
        this.article.img = data.img
        this.article.tags = data.tags
        this.menu = "edit"
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    getAll () {
      this.articles = []
      let token = localStorage.getItem("token")
      axios({
        method: 'get',
        url: 'http://my-mini-wordpress-server.lyxcious.xyz/article/list',
        headers: {
          token
        }
      })
      .then(({data}) => {
        for(let i in data){
          this.articles.push(data[i])
        }
        this.articles.sort((a, b) => { return new Date(b.created_at) - new Date(a.created_at) })
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    addArticle () {
      let formData = new FormData();
      formData.append("title", this.article.title);
      formData.append("img", this.article.imgSend);
      formData.append("content", this.article.content);
      formData.append("tags", JSON.stringify(this.article.tags))
      axios({
        method: 'post',
        url: 'http://my-mini-wordpress-server.lyxcious.xyz/article/create',
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        },
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(({data}) => {
        this.article.title = ""
        this.article.content = ""
        this.article.img = ""
        this.article.imgSend = ""
        this.article.tags = []
        this.notifStat = true
        this.message = "Article Created!"
        this.$bvModal.show('notif-modal')
        this.rendList()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    filterByTag(value) {
      this.articles = []
      axios({
        method: 'get',
        url: `http://my-mini-wordpress-server.lyxcious.xyz/article/filter/tags/${value}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        for(let i = 0; i < data.length; i++){ 
          this.articles.push(data[i])
        }
        if (this.articles.length === 0){
          this.notifStat = false
          this.message = `No articles found match with tags ${value}`
          this.$bvModal.show('notif-modal')
        }
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    filterByTitle(value) {
      this.articles = []
      axios({
        method: 'get',
        url: `http://my-mini-wordpress-server.lyxcious.xyz/article/filter/title/${value}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        for(let i = 0; i < data.length; i++){ 
          this.articles.push(data[i])
        }
        if (this.articles.length === 0){
          this.notifStat = false
          this.message = `No articles found match with title ${value}`
          this.$bvModal.show('notif-modal')
        }
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    getDetail(id) {
      axios({
        method: 'get',
        url: `http://my-mini-wordpress-server.lyxcious.xyz/article/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({data}) => {
        this.article.title = data.title
        this.article.img = data.img
        this.article.content = data.content
        this.article.created_at = data.created_at
        this.article.id = data._id
        this.article.user = data.user
        this.article.tags = data.tags
        this.menu = "detail"
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    deleteArticle () {
      axios({
        method: 'delete',
        url: `http://my-mini-wordpress-server.lyxcious.xyz/article/delete/${this.article.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.article.title = ""
        this.article.content = ""
        this.article.img = ""
        this.article.imgSend = ""
        this.article.created_at = ""
        this.notifStat = true
        this.message = "Article Deleted!"
        this.$bvModal.show('notif-modal')
        this.rendList()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    updateArticle () {
      let formData = new FormData();
      formData.append("title", this.article.title);
      formData.append("img", this.article.imgSend);
      formData.append("content", this.article.content);
      formData.append("tags", JSON.stringify(this.article.tags))
      axios({
        method: 'patch',
        url: `http://my-mini-wordpress-server.lyxcious.xyz/article/update/${this.article.id}`,
        data: formData,
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        }
      })
      .then(({data}) => {
        this.notifStat = true
        this.message = "Article Updated!"
        this.$bvModal.show('notif-modal')
        this.rendList()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    errorHandler (error){
      this.notifStat = false
      if (error.response){
        this.message = error.response.data.message
      } else {
        this.message = `Connection to server error!`
      }
      this.$bvModal.show('notif-modal')
    },
    changeImg(event) {
      var file = event.target.files[0];
      if (file){
        this.article.imgSend = file
      } else {
        this.article.imgSend = ''
      }
      var reader  = new FileReader();

      reader.onloadend = () => {
        this.article.img = reader.result;
      }
      if (file) {
        this.article.img = reader.readAsDataURL(file);
      } else {
        this.article.img = "http://i.stack.imgur.com/2OrtT.jpg";
      }
    },
    addTag(tagInput) {
      if (tagInput.length != 0){
        let found = false
        for (let i = 0; i < this.article.tags.length; i++){
          if (tagInput == this.article.tags[i]){
            found = true
          }
        }
        if (!found){
          this.article.tags.push(tagInput)
        } else {
          this.notifStat = false
          this.message = `Tag already added!`
          this.$bvModal.show('notif-modal')
        }
      }
    },
    removeTag(tag){
      for (let i = 0; i < this.article.tags.length; i++){
        if (this.article.tags[i] === tag){
          this.article.tags.splice(i,1)
          break
        }
      }
    },
  }
};
</script>

<style scoped>
  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>