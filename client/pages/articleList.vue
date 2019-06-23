<template>
    <div class="main-content margin-s background-white padding-l box-shadow-m grid-card-container">
        <div></div>
        <div class="grid-card-title">
            <h2 v-if='articles.length > 0 && currentfilter === ""' class="padding-m">Your Published Articles</h2>
            <h2 v-else-if='articles.length > 0 && currentfilter !== ""' class="padding-m">Your Published Articles (Filter: {{currentfilter}})</h2>
            <h2 v-else class="padding-m">No Article (Filter: {{ (currentfilter)? currentfilter: '' }})</h2>
        </div>
        <div class='grid-card-input-search padding-m'>
            <div class="flex flex-row">
                <input 
                    v-if='articles.length > 0 || currentfilter !== ""'
                    class="input-m" 
                    autocomplete="off" 
                    placeholder="search by title" 
                    v-model="search" />
                <button 
                    class="button button-primary button-border"
                    v-on:click="searchArticle"><i class="fas fa-search"></i></button>
            </div>
        </div>
        <article-card 
            v-for="(article, i) in articles" 
            v-bind:title="article.title" 
            v-bind:description="article.description"
            v-bind:image="article.image"
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
    props: ['articles', 'currentfilter'],
    data() {
        return {
            search: '',
        }
    },
    methods: {
        searchArticle() {
            this.$emit('search-article', this.search)
            this.search = ''
        }
    },
    components: {
        'article-card': articleCard
    }
}
</script>
