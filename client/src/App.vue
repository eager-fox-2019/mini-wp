<template>
  <v-app>   
    <Landing v-if="!isLogin" v-on:setIsLoginParent="setLoginState" v-on:loginToParent="googleSign"></Landing>
    <Content v-if="isLogin" v-on:set-logout="setLogoutState"></Content>
  </v-app>
</template>

<script>
import Landing from './landing.vue'
import Content from './content.vue'
import Swal from 'sweetalert2';
import axios from 'axios'

export default {
  components:{
      Landing,
      Content
  },
  data() {
    return {
      isLogin:null,
      message: 'Hello This is content',
    };
  },
  methods:{
   setLoginState(val) {
      this.isLogin = val
    },
    setLogoutState(val){
      localStorage.clear()
      this.isLogin = val
    },
    googleSign(val){
      console.log('saya masuk onsignin',val)
      axios
      .post('http://localhost:3000/google',{
          token:val
      })
      .then(({data}) => {
        if(!localStorage.getItem('token')){
           Swal.fire({
                  type:'success',
                  title: "Welcome back to Minimum Wordpress..",
           })
        }
        localStorage.setItem('token',data.token)
        localStorage.setItem('first_name',data.first_name)
        localStorage.setItem('last_name',data.last_name)
        localStorage.setItem('image',data.image)
        this.isLogin = true
      })
      .catch((err)=> {
          console.log(err)
      })
    }
  },
  created(){
        if(localStorage.getItem('token')){
            this.isLogin = true
            console.log('refresh page..')
        }
        else{
            console.log('refresh page not login..')
            this.isLogin = false
        }
    }
};
</script>

<style scoped>
*{
  font-family: 'Fredoka One', cursive;
}
</style>