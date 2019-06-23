<template>
    <div>
        <div class="list-group mt-3">
            <a @click="listArticlePageTrigger" href="#" class="list-group-item list-group-item-action list-side-bar">
                <i class="fas fa-newspaper"> Article</i>
            </a>
            <a @click.prevent="$emit('showPage','conversation')" href="#" class="list-group-item list-group-item-action list-side-bar">
                <i class="fas fa-comments"> Conversations</i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    methods : {
        listArticlePageTrigger() {
            this.$emit('showPage','listArticle')
        }
    }
}
</script>

<style>

</style>
