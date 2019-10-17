<template>
    <div class="article--detail">
        <section 
            id="article-detail"
            class="container"
        >
            <div>
                <div 
                    class="back-btn" 
                    @click="clickBack()"
                >
                    <span><i class="fas fa-chevron-left mr-1"></i> back</span>
                </div>
                <div class="fs-42 mb-2 color-grey4">
                    {{this.article.title}}
                </div>
                <div class="user-info mb-3">
                    <div class="circle-name">
                        <span>{{this.article.userId ? this.article.userId.name[0].toUpperCase() : ""}}</span>
                    </div>
                    <div>
                        <div>
                            {{this.article.userId ? this.article.userId.name : ''}}
                        </div>
                        <div>
                            {{this.article.updatedAt}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="image__container">
                <img 
                    :src="this.article.featured_image" 
                    style="width:700px;"
                >
            </div>
            <div class="content__container" v-html="this.article.content"></div>

            <div v-if="article.tags">
                <div 
                    v-for="(tag, index) in article.tags"
                    :key="index"
                    @click="searchByTag(tag)"
                    class="tag"         
                >{{tag}}</div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        'article': Object
    },
    data() {
        return {
            
        }
    },
    methods: {
        clickBack() {
            this.$emit('back-to-article')
        },
        searchByTag(tagName) {
            this.$emit('search-by-tag', tagName)
        }
    },
}
</script>

<style>

</style>
