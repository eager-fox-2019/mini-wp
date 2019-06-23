<template>
    <div class="app">
        <navbar @signOut="signOut"></navbar>
        <sideBar @showAllPost="showAllPost" @showCreatePost="showCreatePost" @showYourPost="showYourPost"></sideBar>
        <loginForm @submitLogin="submitLogin" @showRegister="showRegister"></loginForm>
        <register @submitRegister="submitRegister" @showLogin="showLogin"></register>
        <createPost @createPost="createPost" @removeTag="removeTag" @addTag="addTag"></createPost>
        <editPost @editPost="editPost" @addTagEdit="addTagEdit" @removeTagEdit="removeTagEdit"></editPost>
    </div>
</template>

<script>
import navbar from './navbar'
import sideBar from './sideBar'
import loginFrom from './loginForm'
import register from './register'
import createPost from './createPost'
import editPost from './editPost'


const BASE_PATH = `http://localhost:3000`
export default {
    components:{
        'navbar': navbar,
        'sideBar': sideBar,
        'loginForm': loginFrom,
        'register': register,
        'createPost': createPost,
        'editPost': editPost
    },
    data(){
        return{
          loginInput:{
              email: "",
              password: ""
          },
          registerInput:{
              name: "",
              email: "",
              password: ""
          },
          newPost:{
            title: "",
            content: "",
            image: null,
            tags: []
          },
          editedPost:{
            title: "",
            content: "",
            image: null,
            tags: []
          },
          show: "loginForm" 
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
        })
        this.checkLogin()
    },
    methods:{
        submitLogin(){
            axios({
                url: `${BASE_PATH}/user/login`,
                method: "POST",
                data: {
                    email: this.loginInput.email,
                    password: this.loginInput.password
                }
            })
            .then(({ data }) => {
                localStorage.token = data.token
                this.isLogin = true
                this.loginUser = {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
                this.show = "allPost"
                this.getPosts()
                this.getAllPosts()
            })
            .catch(err => {
                console.log(err);
            })
        },
        submitRegister(){
            axios({
                url: `${BASE_PATH}/user/register`,
                method: "POST",
                data: {
                    name: this.registerInput.name,
                    email: this.registerInput.email,
                    password: this.registerInput.password
                }
            })
            .then(({ data }) => {
                this.registerInput = {
                    name: "",
                    email: "",
                    password: ""
                }
                this.loginInput = {
                    email: "",
                    password: ""
                }
                this.show = "loginForm"
            })
            .catch(err => {
                console.log(err)
            })
        },
        showLogin(){
            this.show= "registerForm"
        },
        showRegister(){
            this.show= "loginForm"
        },
        checkLogin() {
            if (localStorage.getItem('token')) {
                this.user.name = localStorage.getItem("name")
                this.isLogin = true
                this.show= ""
            }
        },
        onSignIn(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                url: `${BASE_PATH}/user/googleSignIn`,
                method: "POST",
                headers: {
                    access_token: id_token
                }
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.token)
                this.isLogin = true
                this.loginUser = {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
                this.getPosts()
                this.getAllPosts()
                this.show = "allPost"
            })
            .catch(err => {
                console.log(err);
            })
        },
        signOut () {
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
            });
            localStorage.removeItem('token');
            this.isLogin = false;
            this.loginUser = {
                _id: "",
                name: "",
                email: "",
            }
            this.show = "loginForm";
        },
        getAllPosts() {
            axios({
                url: `${BASE_PATH}/post/`,
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.allPosts = data.filter(el => {
                        el.createdAt = new Date(el.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        if (el.title.includes(this.searchAllPost)) {
                            return el
                        }
                    })
                    this.filteredAllPosts = this.allPosts
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getYourPosts() {
            axios({
                url: `${BASE_PATH}/post/findMine`,
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.Posts = data.filter(el => {
                        el.createdAt = new Date(el.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        if (el.title.includes(this.search)) return el
                    })
                    this.filtered = this.Posts
                })
                .catch(err => {
                    console.log(err);
                })
        },
        showAllPost() {
            this.show = "allPost";
        },
        showCreatePost() {
            this.show = "createPost";
        },
        showYourPost() {
            this.show = "yourPost";
        },
    }
}
</script>

