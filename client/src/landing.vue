<template>
  <div>
  <v-parallax
    dark
    src="https://cdn.dribbble.com/users/418188/screenshots/6005129/information_architecture_illustration_tubik_4x.png"
    height="700"
    islogin="setlogin">
    <v-layout align-center column justify-center>
      <h1
        class="display-2 font-weight-thin mb-3"
        style="color:black;background-color:white;"
      >Minimum Wordpress</h1>
      <h4
        class="subheading"
        style="color:black;border:solid white; background-color:white;"
      >Let Share Your Ideas and Imagination Through Your Post!</h4>
    </v-layout>
    <v-layout align-center column justify-center>
       <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" style="background-color:black;color:white;height:35px;width:130px;"><i class="fab fa-google mr-2"></i>Google Login</GoogleLogin>
      <v-layout row justify-center>
        <v-flex>
        <Register></Register>
        <Login v-on:set-islogin="setIsLoginParent"></Login>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-parallax>
  </div>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
import GoogleLogin from 'vue-google-login';

export default {
  components: {
    Login,
    Register,
    GoogleLogin
  },
  data(){
    return{
      tokenGoogle : '',
      params : {
        client_id:'388484419255-16ivket8k713j9ueq47smna6qtkhdu8f.apps.googleusercontent.com'
      }
    }
  },
  methods:{
    setIsLoginParent(val) {
      this.$emit('setIsLoginParent', val)
    },
    onSuccess(googleUser){
            console.log(googleUser);
            let id_token = googleUser.getAuthResponse().id_token
            console.log('ini id token di login',id_token);
            this.tokenGoogle = id_token
            this.$emit('loginToParent',this.tokenGoogle)
            this.tokenGoogle = ''
        },
    onFailure(err){
            console.log(err)
    }
  }
};
</script>