<template>
  <div>
    <section class="hero is-link is-fullheight-with-navbar">
      <!-- landing -->
      <div class="hero-body needBack" v-if="!isLogin">
        <div class="container">
          <div class="columns">
            <!-- login -->
            <div class="column-1" v-if= "page === 'login'">
              <p style="color : red" >{{ error }}</p>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="loginForm.email" class="input" type="email" placeholder="Email">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <!-- <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span> -->
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input v-model="loginForm.password" class="input" type="password" placeholder="Password">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button is-success" @click="$emit('submit', ['loggedin', loginForm]) && reset">Login</button>
                </p>
              </div>
            </div>
            <!-- register -->
            <div class="column-1" v-if= "page === 'register'">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="registerForm.username" class="input" type="text" placeholder="Username">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                  <!-- <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span> -->
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="registerForm.email" class="input" type="email" placeholder="Email">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <!-- <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span> -->
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input v-model="registerForm.password" class="input" type="password" placeholder="Password">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button @click="$emit('submit', ['register', registerForm]) && reset" class="button is-success">Register</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- home -->
      <div class="hero-body needBack"  v-if="isLogin && page === 'home'">
        <div class="container">
          <div class="columns is-multiline">
              <card></card>
              <!-- v-for="(i, article) in allArticles" :key="i" -->
          </div>          
        </div>
      </div>
      <!-- my articles -->
      <div class="hero-body needBack"  v-if="isLogin && page === 'myArticles'">
        <div class="container">
          <div class="columns is-multiline">
              <card :page="page" :action="actionArticle($event[0],$event[1], $event[2])"></card> 
              <!-- v-for="(i, article) in myArticles" :key="i" -->
          </div>          
        </div>
      </div>
      <!-- new article -->
      <div class="hero-body needBack"  v-if="isLogin && page === 'newArticle'">
        <div class="container">
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="newContent.title" class="input" type="text" placeholder="Article Title">
              <span class="icon is-small is-left">
                <i class="fas fa-paragraph"></i>
              </span>
            </p>
          </div>
          <div>
            <b-field class="file">
              <b-upload v-model="newContent.imageArticle">
                <a class="button is-primary">
                    <span><i class="fas fa-file-upload"></i> Upload Image</span>
                </a>
              </b-upload>
              <span class="file-name" v-if="newContent.imageArticle" style="color:black">
                  {{ newContent.imageArticle.name }}
              </span>
            </b-field>            
          </div>
          <br>
          <div class="columns">
            <wysiwyg v-model="newContent.text" style="color:black; background-color:rgba(255, 255, 255, 0.5)"/>
          </div>
          <br>
          <div class="columns">
            <p style="color:darkgreen">{{newContent.text}}</p>
            <br><br>
            <button class="button is-success" @click="$emit('submit', ['newArticle', newContent]) && reset">SUBMIT</button>
          </div>
        </div>
        
        <div class="field">
          <p class="control">
            
          </p>
        </div>
        
       
      </div>
      <!-- edit article -->
      <div class="hero-body needBack"  v-if="isLogin && onEdit">
        <div class="container">
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="edited.title" class="input" type="text" placeholder="Article Title" value="editContent.title">
              <span class="icon is-small is-left">
                <i class="fas fa-paragraph"></i>
              </span>
            </p>
          </div>
          <div>
            <b-field class="file">
              <b-upload v-model="edited.img">
                <a class="button is-primary">
                    <span><i class="fas fa-file-upload"></i> Upload Image</span>
                </a>
              </b-upload>
              <span class="file-name" style="color:black">
                  {{ edited.img.name }}
              </span>
            </b-field>            
          </div>
          <br>
          <div class="columns">
            <wysiwyg v-model="edited.text" style="color:black; background-color:rgba(255, 255, 255, 0.5)" value="editContent.text"/>
          </div>
          <br>
          <div class="columns">
            <p style="color:darkgreen">{{edited.text}}</p>
            <br><br>
            <button class="button is-success" @click="editArticle(editContent._id, edited) && reset">SUBMIT</button>
          </div>
        </div>
        
        <div class="field">
          <p class="control">
            
          </p>
        </div>
        
       
      </div>
    </section>
  </div>
</template>

<script>

import Vue from 'vue'
import card from './card';
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(wysiwyg, {
    // hideModules: { "bold": true },
    // iconOverrides: { "bold": "<i class=`your-custom-icon`></i>" },
    image: {
        uploadURL: "/api/myEndpoint",
        dropzoneOptions: {

        }
      },
    maxHeight: "500px"
});


export default {
  props: ["page", "isLogin", "error"],
  created : function(){
    this.getMyArticles()
    this.getAllArticles()
  },
  components : {
    card,
    
  },
  data(){
    return {
      allArticles : [],
      myArticles : [],
      newContent : {
        author :'',
        date :'',
        title :'',
        text :'',
        img :'' 
      },
      loginForm : {
        email : '',
        password : ''
      },
      registerForm : {
        username : '',
        email : '',
        password : ''
      },
      editContent : {},
      edited : {},
      onEdit : false
      
    }
  },
  methods : {
    actionArticle(action, idArticle, data){
      if(action === 'delete'){
        this.deleteArticle(idArticle)
      } else if (action === 'edit'){
        this.editContent = data
        this.edited.img.name = data.img.name ? data.img.name : data.img
        this.onEdit = true
        // this.editArticle(idArticle, data)
      }
    },
    deleteArticle(id){
      this.axios({
        url : `http://localhost:3000/article/${id}`,
        method : 'DELETE',
        headers : {
          access_token : localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.getMyArticles()
        })
        .catch(err => {
          console.log(err)
        })
    },
    editArticle(id){
      this.axios({
        url : `http://localhost:3000/article/${id}`,
        method : 'PUT',
        data : this.edited,
        headers : {
          access_token : localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.getMyArticles()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMyArticles(){
      this.axios({
        url : `http://localhost:3000/article/${localStorage.getItem('userId')}`,
        method : 'GET',
      })
        .then(({data}) => {
          this.myArticles = data
        })
        .catch()
    },
    getAllArticles(){
      this.axios({
        url : 'http://localhost:3000/article/',
        method : 'GET'
      })
        .then(({ data }) => {
          this.allArticles = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    reset(){
      this.newContent = {
        author :'',
        date :'',
        title :'',
        text :'',
        imageArticle :'' 
      }
      this.loginForm = {
        email : '',
        password : ''
      }
      this.registerForm = {
        username : '',
        email : '',
        password : ''
      }
    }
  }
};
</script>

<style scoped>
  .needBack{
    background-image: url(https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80);
    background-size: cover;
    
  }

  
  
</style>

