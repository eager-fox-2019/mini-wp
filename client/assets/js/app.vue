<template>
  <div>
    <navbarContainer login="login" page="page" />
    <p style="text-align: center; font-size: 16px;" id="successAlert" v-if="successRegister === true"  :class="{ 'animated fadeIn primary-container' : successRegister  }">Success created an account {{register.email}} !</p>
    <loginContainer v-if="!loginStatus"/>
  </div>
</template>
<script>
import navbar from './components/navbar'
import login from './components/login'

export default {
  data() {
    return {
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
    }
  },
  components: {
    navbarContainer : navbar,
    loginContainer: login
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
      url: `${baseUrl}articles`
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
  }
}
</script>
<style scoped>

</style>


