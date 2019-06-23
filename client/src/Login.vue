<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="black" dark v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login Into Your Account</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" v-model="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat @click="dialog = false">Close</v-btn>
          <v-btn color="black" flat @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            dialog:false,
            email: "",
            password: "",
        }
    },
    methods: {
      login() {
         axios.post(`http://localhost:3000/login`,{
                email:this.email,
                password:this.password
         })
         .then(({data})=> {
            this.dialog = false;
            console.log(data)
            localStorage.setItem('token',data.token)
            localStorage.setItem('first_name',data.first_name)
            localStorage.setItem('last_name',data.last_name)
            localStorage.setItem('image',data.image)
            this.email = ''
            this.password = ''
            this.$emit('set-islogin', true)
            Swal.fire({
                title: 'Welcome Back Again..',
                type: 'success',
                })
            }
          )
         .catch((err) => {
                let errMsg = err.response.data.message.split(':')
                console.log(errMsg)
                Swal.fire({
                  type:'error',
                  title: "Failed to Login",
                  text:errMsg[0]
                })
          })
      }
    }
}
</script>
