<template>
    <div class="sidenav">
        <a href="#" @click.prevent="toPublishedPageFromChild"><i class="fas fa-columns"></i>Articles</a>
        <a v-show="isLoginProps" href="#" @click.prevent="toPersonalPostPageFromChild"><i class="fas fa-signature"></i>Your Articles</a>
        <a v-show="isLoginProps" href="#" @click.prevent="toDraftPageFromChild"><i class="fas fa-pencil-alt"></i>Write Article</a>

        <!-- <a href="#"><i class="fas fa-chart-bar"></i>Stats</a>
        <a href="#"><i class="fas fa-columns"></i>Plan</a>
        <a href="#" data-toggle="collapse" data-target="#site-side"><i class="fas fa-pencil-alt"></i>Site</a>
        <div id="site-side" class="collapse">
            <ul>
                <li><a href="#" @click="toPublishedPage">Pages</a></li>
                <li><a href="#" id="posts" @click="toPersonalPostPage">Posts</a></li>
            </ul>
        </div> -->
    </div>
</template>

<script>
export default {
    props: ["isLoginProps"],
    methods:{
        toPublishedPageFromChild(){
            this.$emit("to-published-page")
        },
        toPersonalPostPageFromChild(){
            this.$emit("to-personal-page")
        },
        toDraftPageFromChild(){
            this.$emit("to-draft-page")
        }
    }
}
</script>
<style scoped>
</style>