<template >
  <v-layout>
    <v-flex xs12>
      <v-card flat v-for="(article, index) in articles" :key="index" v-show="showList">
        <v-layout row wrap>
          <v-flex xs12>
            <v-img
            v-bind:src="article.imgSrc"
            height="100px"
            >
            </v-img>
          </v-flex>
          <v-flex xs6>
            <div class="caption grey--text ml-2">Posted by {{article.author.username}}</div>
            <h3 class="ml-4 mt-2">{{article.title}}</h3>
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
        <v-btn flat @click="backToArticles"><v-icon>keyboard_backspace</v-icon>Back To Articles</v-btn>
        <v-layout row wrap>
          <v-flex xs12>
            <v-img
            :src="article.imgSrc"
            >
            </v-img>
          </v-flex>
          <v-flex xs6>
              <div class="caption grey--text ml-2">Posted by {{article.author.username}}</div>
              <h3 class="ml-4 mt-2">{{article.title}}</h3>
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
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios"
  export default {
    props: {
      showarticles: Number,
      newpost: Object
    },
    created(){
        axios.request({
            method: "get",
            url: `${this.baseUrl}/articles/all`,
        })
        .then(articles =>{
            this.articles = articles.data
        })
        .catch(err =>{
          console.log(err.response)
        })
    },
    data () {
      return {
        articles:{

        },
        showList: true,
        showContent: null,
        baseUrl: "http://localhost:3000"
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
      }
    },
    watch:{
      showarticles: function(){
        if(this.showarticles){
          this.showList = true
          this.showContent = null
        }
      },
      newpost: function(){
        this.articles.push(this.newpost)
      }
    }
  }
</script>