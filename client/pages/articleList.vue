<template>
    <div class="main-content margin-s background-white padding-l box-shadow-m grid-card-container">
        <div></div>
        <div class="grid-card-title">
            <h2 v-if='articles.length > 0' class="padding-m">Your Published Articles</h2>
            <h2 v-else class="padding-m">No Article</h2>
        </div>
        <div class='grid-card-input-search padding-m'>
            <div class="flex flex-row">
                <input 
                    v-if='articles.length > 0'
                    class="input-m" 
                    autocomplete="off" 
                    placeholder="search by title" 
                    v-on:change="$emit('search-article', $event.target.value); $event.target.value = ''" />
                <button class="button button-primary button-border"><i class="fas fa-search"></i></button>
            </div>
        </div>
        <article-card 
            v-for="(article, i) in articles" 
            v-bind:title="article.title" 
            v-bind:description="article.description"
            v-bind:index="i"
            v-bind:key="'article-id-'+i"
            v-on:clicked-form="(i) => $emit('clicked-form', i)"
            v-on:clicked-detail="(i) => $emit('clicked-detail', i)"
            ></article-card>
    </div>
</template>

<script>
import articleCard from '../components/articleCard.vue'
export default {
    props: ['articles'],
    components: {
        'article-card': articleCard
    }
}
</script>
