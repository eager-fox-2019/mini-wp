<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click="openToolBar"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    
    <v-layout>
        <v-flex xs5 offset-xs4>
            <!-- <v-btn icon class="text-sm-center">
            <v-icon>search</v-icon>
            </v-btn> -->
        </v-flex>

        <v-flex v-show="!isLogin" xs1 offset-xs2>
            <v-btn icon style="margin-right: 4%">
                <loginButton @loggedIn="emitLoggedIn"></loginButton>
            </v-btn>   
        </v-flex>

        <v-flex v-show="!isLogin" style="margin-right: 1%;">
            <v-btn icon style="margin-right: 1%">
                <registerButton></registerButton>
            </v-btn>
        </v-flex>

    <v-flex v-show="isLogin" xs1 offset-xs2>
    <v-btn color="primary" @click="logout">Logout</v-btn>

    </v-flex>


    </v-layout>


    
  </v-toolbar>
</template>

<script>
import toolBar from "./toolbar"
import loginButton from "./loginButton"
import registerButton from "./registerButton"


  export default {
    created(){
        if(sessionStorage.getItem("jwt")){
            this.isLogin = true
        }
    },
    components:{
        loginButton,
        registerButton,
        toolBar
    },
    data: () => ({
        isLogin: false
    }),
    methods:{
        openToolBar: function(){
            this.$emit("openToolBar")
        },
        emitLoggedIn: function(data){
            this.isLogin = true
            this.$emit("loggedIn", data)
        },
        logout: function(){
            sessionStorage.setItem("jwt", "")
            sessionStorage.setItem("username", "")
            this.isLogin = false
            this.$emit("loggedOut")
        }
    }
  }

</script>

<style>

</style>
