<template>
    <div class="card mt-3 p-5">
        <img :src="article.featuredImage" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.content }}</p>
            <p class="card-text"><small class="text-muted">Last Updated : {{ article.updatedAt }}</small></p>
            <a @click.prevent="$emit('showPage',['tagFilterArticle',tag])" v-for="(tag,index) in articleDetail.tags" :key="index" href="">{{tag}}</a>
        </div>
    </div>
</template>

<script>
export default {
    props : ['article'],
    data () {
        return {
            articleDetail : ''
        }
    },
    created () {
        this.articleDetail = this.article
    }
}
</script>

<style scoped>

a {
    background-color: #e5e5e5;
    color : #717171;
    border-radius: 5px;
    margin-right: 10px;
    padding: 10px 8px;
    text-decoration: none;
}
a:hover {
    background-color:lightseagreen
}

</style>
