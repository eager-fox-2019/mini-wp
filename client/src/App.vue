<template>
  <div>
    <navbar @click="selectPage($event)" :isLogin="isLogin" :page="selected"></navbar>
    
    <layout :articles="allArticles" :page="selected" :isLogin="isLogin" @submit="submission($event[0], $event[1])" :error="error"></layout>
  
    
  </div>
</template>

<script>
import navbar from "./components/navbar";
import layout from "./components/hero.vue";

export default {
  components: {
    navbar,
    layout
  },
  data() {
    return {
      error : '',
      selected : localStorage.getItem('access_token') ? 'home' : 'login',
      isLogin : localStorage.getItem('access_token') ? true : false,
      allArticles : []
      
      
    }
  },
  methods : {
    selectPage(page){
      this.selected = page
      if(page === 'logout'){
        this.isLogin = false
        localStorage.clear()
        this.selected = 'login'
      }
      
    },
    submission(input, obj){
      if(input === 'loggedin'){
        this.login(obj)
      } else if(input === 'register'){
        console.log(input, obj.username, obj.email, obj.password, 'skjbvkjsdbvksjdbvkdbv')
        this.register(obj)
        this.datanya = 'sac'
      } else if(input === 'newArticles'){
        this.newArticle(obj)
      }
    },
    newArticle(obj){
      this.axios({
        url : 'http://localhost:3000/article/add',
        method : 'POST',
        data : {
          userId : localStorage.getItem('userId'),
          title : obj.title,
          text : obj.text,
          date : new Date(),
          img : obj.img
        }
      })
    },
    login(obj){
      this.axios({
        url : 'http://localhost:3000/user/login',
        method : 'POST',
        data : {
          email : obj.email,
          password : obj.password
        }
      })
        .then(({data})=> {
          this.isLogin = true
          this.selected = 'home'
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('email', data.email)
          localStorage.setItem('username', data.username)
        })
        .catch(err => {
          console.log(JSON.stringify(err))
          // this.error = err
          console.log(typeof err);
          if(err.message.includes('404')) this.error = 'username / password wrong'
          else this.error = 'Oops.. sorry, server Error'
        })
    },
    register(obj){
      console.log(obj, 'ini objnya')
      this.axios({
        url : 'http://localhost:3000/user/register',
        method : 'POST',
        data : {
          username : obj.username,
          email : obj.email,
          password : obj.password
        }
      })
        .then(({data})=> {
          console.log(data)
          this.login(data)
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2))
          console.log(err)
          this.error = err
        })
    },
    getAllArticles(){
      this.axios({
        url : 'http://localhost:3000/article/',
        method : 'POST',
        headers : {
          access_token : localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.allArticles = data
        })
        .catch(err => {
          console.log(err)
        })
    }
    
  },
  created(){
    this.getAllArticles()
  }
};
</script>

<style>
</style>


