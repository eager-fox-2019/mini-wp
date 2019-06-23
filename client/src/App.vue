<template>
  <div>
      <Login v-show="page === 'login'" @showPage="page = $event"> </Login>
      <Register v-show=" page === 'register'" @showPage="page = $event" > </Register>
      <Home v-show="page === 'home'" @initial="initial"> </Home>
  </div>
</template>

<script>

import axios from './api/server'
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"

export default {
    components : {
        Login,
        Register,
        Home
    },
    data() {
        return {
            page: 'login'
        };
    },
    created () {
        this.initial()
    },
    methods : {
        initial() {
            let token = localStorage.getItem('token')
            if( !token ) {
                this.page = 'login'
            }else {
                axios.get(`/authenticate`,{ headers: { token } })
                .then(() => {
                    this.isLogin = true
                    this.page = 'home'
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
};

</script>

<style scoped>
    @import "vue-wysiwyg/dist/vueWysiwyg.css";
</style>