<template>
  <v-app>
    <v-content>
        <navBar @openToolBar="openToolBar"></navBar>
      <v-container grid-list-xl>
          <h1>AAAAAAAAAAAAAAAAAA</h1>
          <articleList></articleList>
        <toolBar :opentoolbar="toolBarCalled"></toolBar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import registerButton from './registerButton.vue';
import loginButton from './loginButton.vue'
import navBar from "./navbar"
import toolBar from "./toolbar"
import articleList from "./article-list"

export default {
    components: {
        registerButton,
        loginButton,
        navBar,
        toolBar,
        articleList
    },
    data(){
        return{
            message: "Hello World",
            toolBarCalled: false
        }
    },
    methods:{
        openToolBar: function(){
            console.log("MASUK")
            if(this.toolBarCalled === false){
                this.toolBarCalled = true
            }else{
                this.toolBarCalled = false
            }
        },
        openToolBarPls: function(){
            console.log("LOL")
        }
    }
}
</script>

<style scoped>

</style>
