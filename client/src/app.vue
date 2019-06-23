<template>
  <v-app>
    <v-content>
        <navBar @openToolBar="openToolBar" @loggedIn="preloadMyArticles" @loggedOut="emptyMyArticles"></navBar>
      <v-container grid-list-xl>
          
          <articleList :showarticles="triggerShowArticles" :newpost="newPost" v-show="showArticle"></articleList>
          <myArticles v-show="showMyArticles" :showmyarticles="triggerMyArticles" :newpost="newPost" :preloadarticles="preloadedMyArticles" :emptyarticles="emptyMyArticlesData"></myArticles>
        <addArticleForm :showform="triggerNewArticle" v-show="showAddForm" @postCreated="pushNewPost"></addArticleForm>
        <toolBar :opentoolbar="toolBarCalled" @showArticles="showArticles" @createNewArticle="triggerCreateNewArticle" @showMyArticles="showMyArticles1"></toolBar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios"
import registerButton from './registerButton.vue';
import loginButton from './loginButton.vue'
import navBar from "./navbar"
import toolBar from "./toolbar"
import articleList from "./article-list"
import addArticleForm from "./add-article-form"
import myArticles from "./my-articles"

export default {
    components: {
        registerButton,
        loginButton,
        navBar,
        toolBar,
        articleList,
        addArticleForm,
        myArticles
    },
    data(){
        return{
            message: "Hello World",
            toolBarCalled: false,
            triggerShowArticles: 0,
            triggerNewArticle: 0,
            triggerMyArticles: 0,
            showMyArticles: false,
            showArticle: true,
            showAddForm: false,
            newPost: null,
            preloadedMyArticles: [],
            emptyMyArticlesData: 0
        }
    },
    methods:{
        openToolBar: function(){
            if(this.toolBarCalled === false){
                this.toolBarCalled = true
            }else{
                this.toolBarCalled = false
            }
        },
        showArticles: function(){
            this.showArticle = true
            this.showAddForm = false
            this.showMyArticles = false
            this.triggerShowArticles ++
        },
        triggerCreateNewArticle: function(){
            this.showAddForm = true
            this.showArticle = false
            this.showMyArticles = false
            this.triggerNewArticle ++
            // console.log(this.triggerNewArticle)
            // var username = sessionStorage.getItem("username")
            // if(username){
            //     this.showForm = true
            // }else{
            //     alert("Login first")
            // }
        },
        pushNewPost: function(data){
            this.showAddForm = false
            this.showArticle = true
            this.newPost = data
        },
        showMyArticles1: function(){
            this.showAddForm = false
            this.showArticle = false
            this.showMyArticles = true
            this.triggerMyArticles ++
        },
        preloadMyArticles: function(data){
            this.preloadedMyArticles = data
        },
        emptyMyArticles: function(){
            this.emptyMyArticlesData ++
        }
    }
}
</script>

<style scoped>

</style>
