<template>
  <div>
    <div id="landing-page" v-if="!isLoggedIn">

    <div class="container-fluid">
      <div id="landing-title">
        <h1 class="animated slideInDown">Welcome to Mini WordPress</h1>
        <h3 class="animated fadeIn delay-1s">Create your own articles for free.</h3>
      </div>

      <div id="landing-content" class="animated fadeIn delay-1s">
        <loginForm v-on:loginDetail="loginUser"></loginForm>
        <registerForm v-on:registerDetail="registerUser"></registerForm>
      </div>
    </div>
  </div>

  <div id="main-content" v-if="isLoggedIn" class="animated slideInDown">
    <navbar v-on:reqLogOut="logOutUser" :fullName="user"></navbar>
    <div class="wrapper"> 
        <div id="content">  

            <!-- ADD ARTICLE -->
            <div id="article-add" v-if="page === 'article-add'" class="animated slideInLeft">
              <addArticle v-on:reqBack="showPage('article-list')" v-on:articleDetail="addArticle"></addArticle>
            </div>

            <!-- EDIT ARTICLE -->
            <div id="article-edit" v-if="page === 'article-edit'" class="animated slideInLeft">
              <editArticle v-bind:editArticle="selectedArticle" v-on:reqEditArticle="editArticle" v-on:reqBackEdit="showPage('article-list')"></editArticle>
            </div>

            <!-- DISPLAY ARTICLE -->
            <div id="article-display" v-if="page === 'article-display'" class="animated slideInLeft">
              <div class ="panel panel-default">
                <div class="panel-heading">
                  <a href ="#" v-on:click="showPage('article-list')">Back</a>
                  <h2>{{selectedArticle.title}}</h2>
                </div>
                <div class="display-image">
                  <img v-bind:src="selectedArticle.image">
                </div>
                <div class="panel-body" v-html="selectedArticle.content">
                </div>
              </div>
            </div>

            <!-- ARTICLE LIST-->
            <div id="article-list" v-if="page === 'article-list'" v-bind:class="{ 'animated slideInRight' : isActive}">
              <listArticle v-on:reqDisplay="displayArticle" v-on:reqAdd="showPage('article-add')" v-on:reqDelete="deleteArticle" :list="articles" v-on:reqEdit="displayEdit"></listArticle>
            </div>
        </div>
      </div>
      <footer>
        <p>Made by Shandi Yuwono</p>
      </footer> 
    </div>
  </div>
</template>



<script>
  import loginForm from "./landing_page/login"
  import registerForm from "./landing_page/register"
  import navbar from "./main_content/navbar"
  import addArticle from "./main_content/addarticle"
  
  import editArticle from "./main_content/editarticle"
  import listArticle from "./main_content/listarticle"

  export default {
    components: {
      loginForm,
      registerForm,
      navbar,
      listArticle,
      addArticle,
      editArticle
    },
    mounted() {
      gapi.signin2.render('google-signin', {
        onsuccess: this.onSignIn
      })
    },
    data() {
      return {
        isLoggedIn: false,
        page: "",
        isActive: false,
        articles: [],
        selectedArticle: "",
        user: "",
      };
    },
    created: function(){
      let token = localStorage.getItem('access_token')
      if(token) {
        this.isLoggedIn = true
        this.getArticles()
      }
      else{
        this.isLoggedIn = false
      }
    },
    
    methods: {
      getArticles() {
        let token = localStorage.getItem('access_token')
        axios({
            method: "GET",
            url: "http://localhost:3000/article",
            headers: {
              access_token: token
            }
          })
            .then(({data}) => {
            
              this.articles = data
              this.page = 'article-list'

            })
            .catch(err => {
              console.log(err)
            })
      },

      loginUser(user) {
        axios({
          method: "POST",
          url: "http://localhost:3000/user/login",
          data: {
            email: user.email,
            password: user.password,
          }
        })
          .then(({data}) => {
            swal.fire({
              title: 'Successfully signed in.',
              text: 'Welcome!'
              })
            this.isLoggedIn = true
            localStorage.setItem('access_token', data.accessToken)
            
            this.user = `${data.firstName} ${data.lastName}`
            this.getArticles()
            
          })
          .catch(err => {
            swal.fire('username/password wrong')
          })
      },

      registerUser(input) {
        axios({ 
          method: 'POST',
          url: 'http://localhost:3000/user/register',
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: input.password
          }
        })
          .then(({data}) => {
            swal.fire('Successfully registered. Please sign in.')
          })  
          .catch(err =>{
            let msg = err.response.data.message.split(':').slice(2).join(' ')
            swal.fire({ text: msg })
          })
      },

      showPage(page){
        this.page = page
        this.isActive = true
      },

      logOutUser() {
        localStorage.removeItem('access_token')
        this.isLoggedIn = false
        var auth2 = gapi.auth2.getAuthInstance();
        
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      },

      displayArticle(display) {
        for(let article of this.articles) {
          if(article._id === display.id) {
            this.selectedArticle = article
          }
        }
        this.page = "article-display"
      },

      addArticle(input){
        let token = localStorage.getItem('access_token')
        let formData = input.formData
        axios({ 
          method: 'post',
          url: 'http://localhost:3000/article',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            access_token: token
          }
        })
          .then(({data}) => {
            this.getArticles()
          })
          .catch(err => {
            console.log(err.response.data.message)
          })
      },

      deleteArticle(input) {
        Swal.fire({
          title: 'Are you sure you want to delete this article?',
          showCancelButton: true,
          confirmButtonColor: '#308838',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.value) {
            let token = localStorage.getItem('access_token')
            axios({
              method: "DELETE",
              url: `http://localhost:3000/article/${input.id}`,
              headers: {
                access_token: token
              }
            })
              .then(() => {
                let filter = this.articles.filter(article => article._id !== input.id)
                this.articles = filter
              })
              .catch(err => {
                console.log(err)
              })
          }
        })  
      },

      displayEdit(input) {
        for(let article of this.articles) {
          if(article._id === input.id) {
            this.selectedArticle = article
            this.page = 'article-edit'
          }
        }

      },

      editArticle(input) {
  
        let token = localStorage.getItem('access_token')
        axios({
          method: "PATCH",
          url: `http://localhost:3000/article/${this.selectedArticle._id}`,
          data: input.formData,
          headers: {
            access_token:token
          }
        })
          .then(({data}) => {
            // console.log(data)
            this.getArticles()
            this.page = "article-list"
          })

          .catch(err => {
            console.log(err)
          })
      },

       onSignIn(googleUser) {
         
        const idToken = googleUser.getAuthResponse().id_token
   
        let firstName = googleUser.w3.ofa
        let lastName = googleUser.w3.wea
      
          axios({
            method: "POST",
            url: 'http://localhost:3000/user/googleSign',
            data: { 
              idToken,
              firstName: firstName,
              lastName: lastName 
              }
          })
            .then(({data}) => {
              swal.fire({
              title: 'Successfully signed in.',
              text: 'Welcome!'
              })
              this.isLoggedIn = true
              localStorage.setItem('access_token', data.accessToken)
              
              this.user = `${data.firstName} ${data.lastName}`
              this.getArticles()
            })
            .catch(err => {
              console.log(err)
              console.log(err.response.data.message)
            })
      }
    }
  };
</script>

<style scoped>
</style>