<template>
    <div class="container">
        <div>&nbsp;</div>
        <form @submit.prevent="searchArticle" class="mb-4">
            <input type="text" 
            class="form-control"
            v-model.trim="search">
        </form>

        <ul 
            v-for="article in articleSearchResult" 
            :key="article._id"
            class="list-new"
            @click="showDetailCard(article._id)"
        >
            <li 
                class="item"
            >
                <div class="content">
                    <div class="image">
                        <img :src="article.featured_image" alt="Image"
                        style="width:100%">
                    </div>
                    <div class="info">
                        <h5 class="fw-600">{{ article.title }}</h5>
                        <p>{{ article.userId.name }}</p>
                    </div>
                </div>
                

            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: this.searchValue
        }
    },
    props: {
        searchValue: String,
        articleSearchResult: Array
    },
    methods: {
        showDetailCard(id) {
            this.$emit('show-detail-card', id)
        },
        searchArticle() {
            console.log(this.search);
            this.$emit('search-article', this.search)
        }
    },
    mounted() {
        this.search = this.searchValue
    },
}
</script>

<style>

</style>
