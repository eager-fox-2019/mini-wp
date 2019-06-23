<template>
    <div>
    <v-container fluid fill-height>
                <Navbar v-on:set-logout="setLogin" v-on:set-page="setPage"></Navbar>
                <Myarticle v-if="page == 'myarticle'" v-on:set-update="updateArticle"></Myarticle>
                <Allarticle v-if="page == 'allarticle'" v-on:set-detail="setDetail"></Allarticle>
                <Tag v-if="page == 'tags'" v-on:tag-detail="setDetail"></Tag>
                <Newarticle v-if="page == 'create'" :article-update="idArticle" v-on:set-article="setArticle"></Newarticle>
                <Detailpage v-if="page == 'detail'" :article="idArticle"></Detailpage>
            </v-container>
    </div>
</template>

<script>
import Navbar from './Navbar'
import Myarticle from './myarticle'
import Allarticle from './allarticle'
import Tag from './tag'
import Newarticle from './newarticle'
import Detailpage from './detailpage'

export default {
    components:{
        Navbar,
        Myarticle,
        Allarticle,
        Tag,
        Newarticle,
        Detailpage
    },
    data(){
        return{
            page:"myarticle",
            idArticle:null
        }
    },
    methods:{
        updateArticle(val){
            this.page = 'create'
            this.idArticle = val
        },
        setLogin(){
            this.$emit('set-logout',false)
        },
        setPage(val){
            this.page=val
        },
        setDetail(val){
            this.idArticle = val
            this.page = 'detail'
        },
        setArticle(){
            this.idArticle = null
        }
    }
}
</script>
