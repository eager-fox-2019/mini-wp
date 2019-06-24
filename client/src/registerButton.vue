<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Register</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Register New User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Username*" v-model="username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="register">Register</v-btn>
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
      password: "",
      email: "",
      baseUrl: "http://localhost:3000"
    }),
    methods:{
      register: function(){
        axios.request({
                method: "POST",
                url: `${this.baseUrl}/users/register`,
                data:{
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
            .then(userInfo =>{
                this.username = ""
                this.email = ""
                this.password = ""
                console.log(`Hello ${userInfo.data.username}, you are now registered to our website`)
                this.dialog = false
            })
            .catch(err =>{
                console.log(err.response.data)
            })
      }
    }
  }

</script>

