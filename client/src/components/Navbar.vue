<template>
    <nav class="navbar navbar-expand-xl navbar-light bg-info">
        <a  @click.prevent="listArticlePageTrigger" id="title-logo" class="navbar-brand ml-5" href="#"><img src="https://pngimg.com/uploads/wordpress/wordpress_PNG28.png" alt="navbar-logo" srcset="" class="navbar-logo" > Wordprezz </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto" />
        </div>
        <button @click="createArticlePageTrigger" type="button" class="btn btn-light mr-5"> + Write</button>
        <h5> <a @click.prevent="logout" href=""> Log out </a> </h5>
    </nav>
</template>

<script>
export default {
    methods : {
        createArticlePageTrigger() {
            this.$emit('showPage',  'createArticle')
        },
        listArticlePageTrigger() {
            this.$emit('showPage','listArticle')
        },
        logout() {
            localStorage.clear()
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
            })
            this.$emit('initial')
        }
    }
}
</script>

<style>

</style>
