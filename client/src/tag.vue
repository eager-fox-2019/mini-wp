<template>
    <v-content>
         <h1 style="text-align:center;">List of Tags</h1>
         <v-chip v-for="tag in tags" @click="generateArticle(tag)" :key="tag">{{tag}}</v-chip>
         <v-spacer></v-spacer>
         <v-layout row wrap>
            <v-flex v-for="article in articles" :key="`${article._id}`" xs6 py-3 px-3>
            <Mycard :my-article="article" :section="'reader'" v-on:set-detail="setDetail"></Mycard>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
import axios from 'axios'
import Mycard from './Card'

export default {
    components:{
        Mycard
    },
    data(){
        return{
            tags:[],
            articles:[]
        }
    },
    methods:{
        generateArticle(val){
            axios.get(`http://localhost:3000/articles?tags=${val}`,{
                headers:{'access-token':localStorage.getItem('token')}
            })
            .then(({data}) => {
                console.log(data)
                this.articles = data
            })
            .catch((err) => { 
                console.log(err) 
            })
        },
        generateTags(){
            axios.get(`http://localhost:3000/articles/tags`,{
                headers:{'access-token':localStorage.getItem('token')}
            })
            .then(({data}) => {
                console.log(data)
                this.tags = data
            })
            .catch((err) => { 
                console.log(err) 
            })
        },
        setDetail(val){
            this.$emit('tag-detail',val)
            console.log('tampilkan artikel',val)
        }
    },
    created(){
        this.generateTags()
    }
}
</script>
