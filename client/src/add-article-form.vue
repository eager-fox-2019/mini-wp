<template>
    <v-form class="elevation-5 pa-3" v-show="showForm">
        <v-layout row wrap>
           <v-flex xs12>
               <v-text-field
                label="Title"
                placeholder="Article Title"
                v-model="title"
                required
               >
               </v-text-field>
           </v-flex> 

           <v-flex xs12>
               <v-text-field
                label="Image"
                placeholder="Image Url"
                v-model="image"
                required
               >

               </v-text-field>
           </v-flex>

           <v-flex xs12>
               <v-textarea
                outline
                label="Content"
                placeholder="Article Content"
                v-model="content"
                required
               >

               </v-textarea>
           </v-flex>
        </v-layout>

        <v-btn style="margin-left: 90%;" @click="createNewArticle">Submit <v-icon>file_upload</v-icon></v-btn>
    </v-form>
</template>

<script>
import axios from "axios"

export default {
    props: ["showform"],
    data () {
        return{
            showForm: false,
            title: "",
            image: "",
            content: "",
            newPost: null
        }
    },
    methods:{
      createNewArticle: function(){
            var username = sessionStorage.getItem("username")
            if(username){
                axios.request({
                    method: "POST",
                    url: `http://localhost:3000/articles/${username}/add`,
                    headers:{
                        "token": sessionStorage.getItem("jwt")
                    },
                    data:{
                        title: this.title,
                        content: this.content,
                        imgSrc: this.image
                    }
                })
                .then(created =>{
                    this.newPost = created.data
                    this.$emit("postCreated", created.data)
                })
                .catch(err =>{
                    console.log(err.response)
                })
            }else{
                alert("Login first")
            }
        },
    },
    watch: {
        showform: function(){
            this.showForm = true
        }
    }

    
}
</script>
