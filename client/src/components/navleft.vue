<template>
    <div class="nav-elm">
        <a @click.prevent="toPublishedPageFromChild" class="navbar-brand" href="#" style="background-color:#22344B; padding:10px;">
            <img src="../../assets/logo-wp.png" width="30" height="30" class="d-inline-block align-top" alt="logo">
            Travel WP
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods:{
        toPublishedPageFromChild(){
            this.$emit("to-published-page")
        }
    }
}
</script>
<style scoped>
</style>