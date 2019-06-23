<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="black" dark v-on="on">Register</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Please Fill in the Form</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Firstname*" v-model="firstname" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Lastname*" v-model="lastname" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email*" v-model="email" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12>
                <small>*Upload Your Profile Picture</small>
                <v-btn color="white" @click="$refs.inputUpload.click()">Upload File</v-btn>
                <input v-show="false" ref="inputUpload" type="file" @change="onFileSelected" >
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" flat @click="dialog = false">Close</v-btn>
        <v-btn color="black" flat @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      dialog: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      selectedFile: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    register() {
      const fd = new FormData();
      fd.append("first_name", this.firstname);
      fd.append("last_name", this.lastname);
      fd.append("email", this.email);
      fd.append("password", this.password);
      fd.append("image", this.selectedFile);
      axios
        .post("http://localhost:3000/register", fd)
        .then(({ data }) => {
          this.dialog = false;
           Swal.fire({
            type:'success',
            title: "Success",
            text:data.message
          })
          this.firstname = '';
          this.lastname = '';
          this.email = '';
          this.password = '';
        })
        .catch((err) => {
           let errMsg = err.response.data.message.split(':')
           if(errMsg == "Cannot read property 'gcsUrl' of undefined"){
             errMsg = ["","","Please Upload Your Profile Picture"]
           }
           Swal.fire({
            type:'error',
            title: "Failed to Login",
            text:errMsg[2]
          })
        });
    }
  }
};
</script>
