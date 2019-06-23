<template>
    <div class="main-content margin-s background-white padding-l box-shadow-m grid-card-container">
        <div></div>
        <div class="grid-card-title">
        <h2 v-if='filteredArticle.length > 0' class="padding-m">Your Published Articles</h2>
        <h2 v-else class="padding-m">No Article</h2>
        </div>
        <div class='grid-card-input-search padding-m'>
        <input 
            v-if='articles.length > 0'
            class="input-m" 
            autocomplete="off" 
            placeholder="search by title" 
            v-on:change="this.$emit('update:searchArticle', $event)" />
        </div>
        <article-card 
            v-for="(article, i) in filteredArticle" 
            v-bind:title="article.title" 
            v-bind:description="article.description"
            v-bind:index="i"
            v-bind:key="'article-id-'+i"
        ></article-card>
    </div>
</template>

<script>
import articleCard from '../components/articleCard.vue'
export default {
    props: ['filteredArticle', 'cu'],
    components: {
        'article-card': articleCard
    }
}
</script>
