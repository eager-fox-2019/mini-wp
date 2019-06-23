<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Username*" v-model="username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" v-model="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import axios from "axios"
  export default {
    data: () => ({
      dialog: false,
      username: "",
      password: ""
    }),
    methods:{
      login: function(){
        axios.request({
                method: "POST",
                url: "http://localhost:3000/users/signin",
                data:{
                    username: this.username,
                    password: this.password 
                }
            })
            .then(userInfo =>{
                sessionStorage.setItem("jwt", userInfo.data.access_token)
                sessionStorage.setItem("username", userInfo.data.username)
                this.dialog = false
                axios.request({
                method: "GET",
                url: "http://localhost:3000/articles/myarticles",
                headers: {
                    token: userInfo.data.access_token
                }
            })
            .then(articles =>{
                this.$emit("loggedIn", articles.data)
            })
            })
            .catch(err =>{
                console.log(err.response)
            })
      }
    }
  }

</script>

<style>
 v-btn{
     color: black;
 }
</style>


