<template>
    <v-layout>
    <v-flex xs12>
    <h1>My Articles</h1>
      <v-card flat v-for="(article, index) in articles" :key="index" v-show="showList">
        <v-layout row wrap>
          <v-flex xs12>
            <v-img
            v-bind:src="article.imgSrc"
            height="100px"
            >
            <v-btn
             fab
             small
             absolute
             right
             color="yellow"
             style="margin-top: 1%;"
             @click="editForm(article._id, article.title, article.imgSrc, article.content, index)"
            >
                <v-icon>edit</v-icon>
            </v-btn>

            <v-btn
             fab
             small
             absolute
             right
             color="red"
             style="margin-top: 1%; margin-right: 5%"
             @click="del(article._id, index)"
            >
                <v-icon>delete</v-icon>
            </v-btn>

            </v-img>

            
          </v-flex>
          <v-flex xs6>
            <div class="caption grey--text ml-2">Posted by {{article.author.username}}</div>
            <h2 class="ml-4 mt-2">{{article.title}}</h2>
          </v-flex>
          <v-flex xs2 offset-xs4>
            <div class="caption grey--text">Created at {{article.createdAt}}</div>
          </v-flex>
          <v-flex xs12>
            <p class="text-truncate pl-3 pr-3">{{article.content}}</p>
            <v-btn style="margin-left: 89%;" @click="readMore(index)">Read More</v-btn>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-card>

      

      <v-card flat v-for="(article, index) in articles" :key="article.title" v-show="showContent === index">
        <v-btn flat @click="backToArticles"><v-icon>keyboard_backspace</v-icon>Back To My Articles</v-btn>
        <v-layout row wrap>
          <v-flex xs12>
            <v-img
            :src="article.imgSrc"
            >
            </v-img>
          </v-flex>
          <v-flex xs6>
              <div class="caption grey--text ml-2">Posted by {{article.author.username}}</div>
              <h2 class="ml-4 mt-2">{{article.title}}</h2>
            </v-flex>
            <v-flex xs2 offset-xs4>
              <div class="caption grey--text">Created at {{article.createdAt}}</div>
            </v-flex>
            <v-flex xs12>
            <p class="pl-3 pr-3">{{article.content}}</p>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-card>

      <v-form class="elevation-5 pa-3" v-show="showEditForm">
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
               <input type="file" ref="file" v-on:change="convertImage">
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

        <v-btn style="margin-left: 90%;" @click="edit">Edit <v-icon>edit</v-icon></v-btn>
    </v-form>
    </v-flex>


    

  </v-layout>
</template>

<script>
import axios from "axios"

export default {
    props: {
        showmyarticles: Number,
        newpost: Object,
        preloadarticles: Array,
        emptyarticles: Number
    },
    created(){
        var token = sessionStorage.getItem("jwt")
        if(token){
            axios.request({
                method: "GET",
                url: `${this.baseUrl}/articles/myarticles`,
                headers: {
                    token: token
                }
            })
            .then(articles =>{
                this.articles = articles.data
            })
            .catch(err =>{
                console.log(err.response)
            })
        }
    },
    data () {
      return {
        articles:{

        },
        showList: true,
        showContent: null,
        content: "",
        image: "",
        title: "",
        showEditForm: false,
        selectedId: null,
        selectedIndex: null,
        baseUrl: "http://localhost:3000",
        newImage: null,
        imageLinkFromGCS: null
    }
    },
    methods:{
      readMore: function (index){
        this.showList = false
        this.showContent = index
      },
      backToArticles: function(){
        this.showList = true
        this.showContent = null
      },
      del: function(id, index){
          console.log(id, index)
            var username = sessionStorage.getItem("username")
            axios.request({
                method: "DELETE",
                headers:{
                    token: sessionStorage.getItem("jwt")
                },
                url: `${this.baseUrl}/articles/${username}/delete?article=${id}`
            })
            .then(deleted =>{
                this.articles.splice(index, 1)
                console.log(deleted.data)
            })
            .catch(err =>{
                console.log(err.response.data)
            })
        },
      editForm: function(id, title, imgSrc, content, index){
          this.showList = false
          this.showContent = null
          this.title = title
          this.image = imgSrc
          this.content = content
          this.showEditForm = true
          this.selectedId = id
          this.selectedIndex = index
      },
      edit: function(){
          var username = sessionStorage.getItem("username")
          axios.request({
              method: "PUT",
              headers:{
                  token: sessionStorage.getItem("jwt")
              },
              url: `${this.baseUrl}/articles/${username}/edit?id=${this.selectedId}`,
              data:{
                  title: this.title,
                  imgSrc: this.imageLinkFromGCS,
                  content: this.content
              }
          })
          .then(updated =>{
              this.articles.splice(this.selectedIndex, 1, updated.data)
              this.showEditForm = false
              this.showList = true
              this.showContent = null
          })
          .catch(err =>{
              console.log(err.response)
          })
      },
      convertImage: function(){
          this.newImage = this.$refs.file.files[0]
          const formData = new FormData()
                formData.append('image',this.newImage)
            axios.post(`${this.baseUrl}/googleCloudStorage`, formData)
            .then(({ data }) =>{
            this.imageLinkFromGCS = data
            // this.loading = false
            })
            .catch(err =>{
            console.log(err)
            })
      }
    },
    watch:{
        showmyarticles: function(){
            this.showList = true
            this.showContent = null
        },
        newpost: function(){
            this.articles.push(this.newpost)
        },
        preloadarticles: function(){
            this.articles = this.preloadarticles
        },
        emptyarticles: function(){
            this.articles = []
        }
    }
}
</script>
