<template>
    <b-container>
        <b-row>
            <b-col cols='12'>
                Browse Articles
            </b-col>
            <article-card v-for="(article,index) in articles" :article='article' :key="index"/>
        </b-row>
    </b-container>
</template>
    
<script>
    import articleCard from '../components/articleCard.vue'
    import api from '../api/api.js'
    export default{
        name:'home',
        data(){
            return {
                articles:[]
            }
        },
       created(){
           api
            .get('/articles')
            .then(({data})=>{
                console.log(data)
                for(let i = 0; i < data.length; i++){
                    this.articles.push(data[i])
                console.log(data[i])
                }
            })
            .catch(err=>{
                console.log(err)
            })
       },
       components:{
           articleCard
       }
    }
</script>