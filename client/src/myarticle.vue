<template>
    <v-content>
                <v-text-field
                        class="mx-3"
                        flat
                        label="Search"
                        prepend-inner-icon="search"
                        solo-inverted
                        v-model="searchField"
                        >
                </v-text-field>
                 <v-layout row wrap>
                           <v-flex v-for="article in filterArticles" :key="`${article._id}`" xs6 py-3 px-3>
                                <Mycard :my-article="article" :section="'owner'" v-on:generate-article="generate" v-on:set-update="updateArticle"></Mycard>
                          </v-flex>
                        </v-layout>
            </v-content>
</template>

<script>
import Mycard from './Card'
import axios from 'axios'

export default{
    components:{
        Mycard
    },
    methods:{
        generate(){
             axios.get(`http://localhost:3000/articles/user`,{
                headers:{'access-token':localStorage.getItem('token')}
            })
            .then(({data}) => {
                this.articles = data
                console.log(data)
            })
            .catch((err) => { 
                console.log(err) 
            })
        },
        updateArticle(val){
            this.$emit('set-update',val)
        }
    },
    data(){
        return{
            articles:[],
            searchField:''
        }
    },
    computed:{
         filterArticles() {
            return this.articles.filter((article) => {
                return article.title.toLowerCase().match(this.searchField)
            })
         }
    },
    created(){
        this.generate()
    }
}
</script>
