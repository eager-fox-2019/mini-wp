<template>
	<div class="content-wrapper">
		<headerwp
			:showSidebarProps="sidebarArea"
			:isLoggedin="isLoggedin"
			:userName="userName"
			:editArticleArea="editArticleArea"
			:postArea="postArticleArea"
			@sidebar-state="toggleSidebar"
			@post-area-state="togglepostArticleArea"
			@login-area-state="toggleLoginArea"
			@logout-state="logout"
			@edit-article-area-state="toggleEditArticleArea">		
		</headerwp>
		<div id="sidebar" v-bind:class="sidebarArea? 'collapsed' : ''">
			<ul>
			  <li><a class="nav-link " href="#"><i class="fas fa-home"></i> Home</a></li>
			  <li><a class="nav-link " href="#"><i class="fas fa-pen"></i> Post</a></li>
			  <li><a class="nav-link " href="#"><i class="fas fa-print"></i> Print</a></li>
			</ul>
		</div>

      <div id="content">
        <!-- alert alert-error -->
        <div id="errorArea" v-if="errorMessage != ''" class="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{{errorMessage}}</span>
          <button class="btn btn-secondary" @click.prevent="clearError">close</button>
        </div>
        <!-- alert alert-success -->
        <div id="successArea" v-if="successMessage != ''" class="alert alert-success d-flex justify-content-between align-items-center">
          <span>{{successMessage}}</span>
          <button class="btn btn-secondary" @click.prevent="clearMsg">close</button>
        </div>

        <!-- user login/register and edit -->
        <div id="loginArea" v-if="loginArea || editUserArea">
          <form method="post" class="d-flex flex-wrap">
            <span v-if="registerArea || editUserArea && loginArea == false">
              <label>Name:</label>
              <input v-model="userName" type="text" name="userName"></input></span>
            <span v-if="registerArea || loginArea && editUserArea == false">
              <label>E-mail: </label>
              <input v-model="userEmail" type="text" name="userEmail"></input></span>
            <span>
              <label>Password: </label>
              <input v-model="userPassword" type="password" name="userPassword"></input></span>
            
            <span>
              <span v-if="registerArea === false && editUserArea === false && loginArea == true">
                <button @click.prevent="loginUser" class="btn btn-primary btn-md">Login</button></span>
              <span v-if="registerArea === false && editUserArea === false">
                <a href="#" @click.prevent="toggleRegister">Register</a></span>

              <span v-if="registerArea && editUserArea==false">
                <button @click.prevent="registerUser" class="btn btn-primary btn-md">Register</button></span>
              <span v-if="registerArea && editUserArea==false">
                <a href="#" @click.prevent="toggleRegister">Cancel</a></span>

              <span v-if="editUserArea">
                <button @click.prevent="editUser" class="btn btn-primary btn-md">Edit</button></span>
              <span v-if="editUserArea">
                <button @click.prevent="delUser" class="btn btn-danger btn-md">Delete Account</button></span>
              <span v-if="editUserArea">
                <a href="#" @click.prevent="toggleEditUser">Cancel</a></span>


            </span>
          </form>

          <!-- fb login button -->
          <div v-if="registerArea === false && editUserArea === false && loginArea == true" class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"  @click.event="loginFB"></div>
          <!-- data-onlogin="checkLoginState()" -->
        </div>

        <!-- post new article-->
        <div id="postForm" v-show="postArticleArea === true && editArticleArea === false" >
          <h3>Post an Article</h3>
          <form id="postArticle" method="post">
            <span class="col">
              <label>Title: </label>
              <input v-model="newTitle" type="text" name="title"></input>
            </span>
            <editor api-key="9mkhnm26fjqe5fdpy6ewfsnhcy5vrts624vxr42ffw5eunpd" :init="{plugins: 'wordcount'}" v-model="newContent" id="postArticletextarea" name="body"></editor>
            <div class="d-flex justify-content-end">
              <button v-on:click.prevent="addArticle" class="btn btn-primary btn-md d-flex">Submit</button>
            </div>
          </form>
        </div>

        <!-- article header -->
        <div id="articleHeaderContainer"  v-if="editArticleArea === false" class="d-flex p-2 flex-row align-items-center col-12">
          <div class="p-2">
            <button class="btn btn-success btn-md">Published</button></div>
          <div class="p-2">
            <button class="btn btn-info btn-md ">Drafts</button></div>
          <div id="filterBar" class="ml-auto p-2">
            <input type="text" v-model="search" placeholder="Search title.."/>
            <span> <i class="fas fa-search"></i> </span>
          </div>
        </div>

        <!-- list articles -->
        <div id="articlesContainer" v-if="editArticleArea === false" >
          <div class="card" v-for="article in filteredArticles">
            <articlecard 
            :key="article._id"
            :carddetail="article" 
            :postArticleArea="postArticleArea"
            @edit-article="editArticle(article._id)" 
            @read-article="readArticle(article._id)" 
            @del-article="delArticle(article._id)"></articlecard>
          </div>
        </div>

        <!-- edit article form-->
        <div id="editArticleContainer" v-show="editArticleArea === true">
          <h3>Edit Article</h3>
          <form id="editArticleForm" method="post">
            <span class="col">
              <label>Title: </label>
              <input v-model="newTitle" type="text" name="title"></input>
            </span>
            <editor api-key="9mkhnm26fjqe5fdpy6ewfsnhcy5vrts624vxr42ffw5eunpd" 
            	:init="{plugins: 'wordcount'}" 
            	v-model="newContent" 
            	name="body"></editor>
            <span class="article-image-upload-area">
              
            </span>
            <div class="d-flex justify-content-end align-items-center">
              <a class="btn btn-secondary" href="#" @click.prevent="cancelEdit">cancel edit</a><button v-on:click.prevent="updateArticle" class="btn btn-primary btn-md d-flex">Submit</button>
            </div>
          </form>          
        </div>
      </div>

      <footer>
        <div id="footerContent">
        <p>Git for the class: <a href="https://github.com/eager-fox-2019">
        Eager Fox 2019 - Hacktiv8</a>.</p>
        <p>Posted by: Stefani Kwan | Last Updated: {{today.toDateString()}}</p>
        </div>
      </footer>
	</div> <!-- end of content wrapper -->
</template>

<script>

import headerwp from './assets/components/header-wp.vue';
import articlecard from './assets/components/article-card.vue';
// es modules for tinymce text editor
import Editor from '@tinymce/tinymce-vue';

let baseUrl = "http://localhost:3000/api"

export default {
  data() {
    return {
      message: 'Hello world',
      sidebarArea: true,
      loginArea: false,
      userName: "",
      editArticleArea: false,
      postArticleArea: false,
			today: new Date(),
			isLoggedin: false,
			registerArea: false,
			editUserArea: false,
			errorMessage: "",
			successMessage: "",
			userEmail: "b@b.com",
			userPassword: "123456",
			articles: [],
			newTitle: "",
			newContent: "",
			search: "",
			currentArticle: {}
    };
  },
  created(){
    this.populateArticles()
  },
  components: {
    headerwp,
    articlecard,
    'editor': Editor // <- Important to load wysiwyg api tiny.mce
  },
  computed: {
    filteredArticles(){
      let filtered = [];

      this.articles.forEach(article => {
        let strArticle = article.title.toLowerCase();
        if (strArticle.includes(this.search.toLowerCase())) {
          filtered.push(article)
        }
      })
      return filtered
    }
  },
  methods:{
    populateArticles(){
      if (localStorage.getItem("access_token")){
        this.isLoggedin = true;
        this.loginArea = false;
        axios({
          method: "GET",
          url: baseUrl+"/articles",
          headers:{
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({data}) => {

          data.sort( function(a,b){
            return new Date(b.created_at) - new Date(a.created_at)
          })

          this.articles = data;
        })
        .catch(err => {
          console.log("created error:",err)
        })
      }
    },
    toggleSidebar(){
        this.sidebarArea = this.sidebarArea ? false : true;
    },
    togglepostArticleArea(){
    	this.postArticleArea =  this.postArticleArea ? false : true;
    },
    toggleLoginArea(){
    	this.loginArea = this.loginArea ? false : true;
    },
    toggleEditArticleArea(){
    	this.editArticleArea = this.editArticleArea ? false : true;
    },
    loginUser(){
      axios({
        method: "POST",
        url: baseUrl+"/users/login",
        data: {
          email: this.userEmail,
          password: this.userPassword//50 20 30 10
        }
      })
      .then(({data}) => {
        localStorage.setItem("access_token", data)

        this.clearMsg()
        this.toggleLoginArea()
        this.showMsg("Successfully logged in")
        this.isLoggedin = true;
        this.populateArticles()

      })
      .catch(err => {
        console.log("created error:",err)
        this.showError(err)
      })
    },
    registerUser(){
      axios({
        method: "POST",
        url: baseUrl+"/users/register",
        data: {
          name: this.userName,
          email: this.userEmail,
          password: this.userPassword
        }
      })
      .then(({data}) => {
        this.clearMsg()
        this.registerArea = false
        this.showMsg("Successfully registered")
      })
      .catch(err => {
        console.log("registerUser error:", err)
        this.showError(err)
      })
    },
    showError(err){
      this.errorMessage = err.response.data
      window.scrollTo(0,0)
    },
    clearError(){
      this.errorMessage = ""
    },
    showMsg(msg){
      this.successMessage = msg
    },
    clearMsg(){
      this.successMessage = ""
      this.clearError()
    },
    clearLogin(){
      this.userEmail = ""
      this.userPassword = ""
      this.userName = ""
      this.editUserArea = false;
    },
    logout(){
      localStorage.clear()
      this.isLoggedin = false;
      this.clearLogin()
      this.clearMsg()
      this.articles = []
    },
    readArticle(articleId){
      axios({
        method: "GET",
        url: `${baseUrl}/articles/read/${articleId}`,
        headers:{
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        console.log("read an article,",data)

        let [api_key, readStr] = data

        VoiceRSS.speech({
            key: api_key,
            src: readStr,
            hl: 'en-us',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });

      })
      .catch(err => {
        console.log("created error:",err)
        this.showError(err)
      })
    },
    updateArticle(){
      let currentArticle = this.currentArticle
      console.log(currentArticle)
      let newInput = {
        title: this.newTitle,
        content: this.newContent,
        created_at: (new Date()).toDateString()
      }

      axios({
        method: "PATCH",
        url: baseUrl+"/articles/"+currentArticle._id,
        data: newInput,
        headers:{
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        console.log("updated an article")
        this.cancelEdit()

        let updatedList = []
        this.articles.forEach(article => {
          if (article._id === data._id){
            article = data;
          }
          updatedList.push(article)
        })

        updatedList.sort(function(a,b){
          return new Date(b.created_at) - new Date(a.created_at)
        })

        this.articles = updatedList
      })
      .catch(err => {
        console.log("updateArticle error:",err)
        this.showError(err)
      })
    },
    editArticle(articleId){
      console.log(articleId)
      this.editArticleArea = true;

      axios({
        method: "GET",
        url: baseUrl+"/articles/"+articleId,
        headers:{
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        console.log("get one article,",data)
        console.log("selected an article")
        this.currentArticle = data
        this.newTitle = data.title
        this.newContent = data.content
      })
      .catch(err => {
        console.log("editArticle error:",err)
        this.showError(err)
      })
    },
    cancelEdit(){
      this.currentArticle = {}
      this.editArticleArea = false;
      this.newTitle = "";
      this.newContent = "";
    },
    delArticle(articleId){
      axios({
        method: "DELETE",
        url: baseUrl+"/articles/"+articleId,
        headers:{
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        console.log("deleted an article")
        this.articles = this.articles.filter(article => article._id !== articleId)
      })
      .catch(err => {
        console.log("delArticle error:",err)
        this.showError(err)
      })
    },
    addArticle(){
      this.togglePost()
      let newArticle = {
        title:this.newTitle, 
        content:this.newContent
      }
      
      axios({
        method: "POST",
        url: baseUrl+"/articles",
        data: newArticle,
        headers:{
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        console.log("created an artcle")
        this.articles.unshift(data)
        this.newTitle = "";
        this.newContent = "";
      })
      .catch(err => {
        console.log("created error:",err)
        this.showError(err)
      })
    },
  }
};
</script>

<style scoped>
</style>