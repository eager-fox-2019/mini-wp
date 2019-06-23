<template>
<div>
    <div class="container p-5 mb-3">
        <div class="input-group mb-3 mt-3">
            <input v-model="inputSearch" type="text" class="form-control rounded-0 search" placeholder="Search title" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
            </div>
        </div>
        <hr>
        <div>
            <div v-for="(article,index) in articles" :key="index" class="card mb-3 mt-4">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img v-bind:src="article.featuredImage" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{article.title}}</h5>
                            <p v-html="sliceContentArticle(article.content)" class="card-text"></p><a @click.prevent="$emit('showPage',['detailArticle',article]) " href=""> see more</a> 
                            <div class="card-footer text-muted">
                                <div class="row">
                                    <div class="col-9">
                                        <p class="card-text"><small class="text-muted">Last updated {{article.updatedAt}}</small></p>
                                    </div>
                                    <div @click.prevent="UpdateArticlePageTrigger(article)" class="col-1">
                                        <a href=""><i class="fas fa-edit"></i></a>
                                    </div>
                                    <div class="col-1">
                                        <a @click.prevent="deleteArticle(article._id)" href=""><i class="fas fa-trash-alt"></i></a>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from '../api/server'
export default {
    props : ['tag'],
    data () {
        return {
            articles : [],
            articlesBackup : [],
            message : 'connect',
            searchResult : [],
            inputSearch : '',
            isSearch : false,
        }
    },
    created () {
        this.fetchArticle()
    },
    methods : {
        fetchArticle () {
            let token = localStorage.getItem('token')
            return axios.get(`/articles`, { headers : { token } } )
            .then(({ data })=>{
                data.forEach((el,i) => {
                    data[i].content.slice(0,500)
                })
                this.articles = data
                this.articlesBackup = data
            })
            .catch(err =>{
                console.log('please login')
            })
        },
        UpdateArticlePageTrigger(article) {
            this.$emit('showPage',['updateArticle',article])
        },
        deleteArticle(idArticle) {
            let token = localStorage.getItem('token')            
            axios.delete(`/articles/${idArticle}`, { headers : { token }})
            .then(() =>{
                this.fetchArticle()
            })
            .catch(err =>{
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
        },
        backupArticle() {
            this.articles = this.articlesBackup
        }
    },
    watch : {
        inputSearch(newSearch,oldSearch) {
            let get = this.articles.filter(el => {
                let check = el.title.includes(this.inputSearch)
                if(check) return el
            })
            this.articles = get
            if(newSearch.length < oldSearch.length) this.fetchArticle()
        }
    },
    computed : {
        sliceContentArticle () {
            return content => content.slice(0,500) + ' ...'
        }
    }
}
</script>

<style>

</style>
