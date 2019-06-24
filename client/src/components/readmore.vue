<template>
    <div class="container-post">
        <div class="articles">
            <div class="card align-items-*-center">
                <img class="card-img-top-display" v-bind:src="selectedArticleProps.imgUrl" alt="Feat Image">
                <div class="card-body">
                    <h5 class="card-title">{{ selectedArticleProps.title }}</h5>
                    <div class="card-text" v-html="selectedArticleProps.content"></div>
                    <button @click.prevent="toPublishedPageFromChild" class="btn btn-primary">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["selectedArticleProps"],
    methods:{
        toPublishedPageFromChild(){
            this.$emit("to-published-page")
        }
    }
}
</script>