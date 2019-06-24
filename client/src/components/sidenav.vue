<template>
    <div class="sidenav">
        <a href="#" @click.prevent="toPublishedPageFromChild"><i class="fas fa-columns"></i>Articles</a>
        <a v-show="isLoginProps" href="#" @click.prevent="toPersonalPostPageFromChild"><i class="fas fa-signature"></i>Your Articles</a>
        <a v-show="isLoginProps" href="#" @click.prevent="toDraftPageFromChild"><i class="fas fa-pencil-alt"></i>Write Article</a>
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