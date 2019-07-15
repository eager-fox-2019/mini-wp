<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="position: fixed; z-index:2;right:0;left:0;">
                    <a class="navbar-brand" href="#"><b>HackPost</b></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
            
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
            
                        </ul>
                        <form v-on:submit.prevent="" class="form-inline my-2 my-lg-0">
                            <input  class="form-control mr-sm-2" type="text" id="searchInput" placeholder="Search" v-model="searchResult">
                        </form>
                    </div>
                </nav>
    </div>
</template>


<script>
    export default {
        methods : {
            search(){
                //pengenngubah message yang ada di app
                // this.$emit("newcard", "asdasd");
                this.$emit("search","berhasil diubah");
            }
        }
    }
</script>
<style scoped>
</style>
