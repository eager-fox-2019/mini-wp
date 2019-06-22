<template @openToolBar="openToolBar">
  <v-toolbar dark color="primary" @openToolBar="openToolBar2">
    <v-toolbar-side-icon @click="openToolBar3"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>

    
    <v-layout>
        <v-flex xs5 offset-xs4>
            <v-btn icon class="text-sm-center">
            <v-icon>search</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs1 offset-xs2>
            <v-btn v-if="!isLogin" icon style="margin-right: 4%">
                <loginButton></loginButton>
            </v-btn>   
        </v-flex>

        <v-flex style="margin-right: 1%;">
            <v-btn v-if="!isLogin" icon style="margin-right: 1%">
                <registerButton></registerButton>
            </v-btn>
        </v-flex>


    </v-layout>

    <v-btn v-if="isLogin" color="primary" >Logout</v-btn>

    
  </v-toolbar>
</template>

<script>
import toolBar from "./toolbar"
import loginButton from "./loginButton"
import registerButton from "./registerButton"


  export default {
    components:{
        loginButton,
        registerButton,
        toolBar
    },
    data: () => ({
        isLogin: false
    }),
    methods:{
        openToolBar3: function(){
            this.$emit("openToolBar")
        },
        openToolBar2: function(){
            this.$emit("openToolBar")
        },
        openToolBar: function(){
            this.$emit("openToolBar")
        }
    }
  }

</script>

<style>

</style>
