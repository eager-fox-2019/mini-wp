<template>
    <div class="container-nav">
        <div class="container-nav-link">
            <i @click="changeSearchFromChild" class="fas fa-search" aria-hidden="true"></i>
        </div>
        <div v-show="onSearchProps" style="width: 100%">
            <div class="md-form">
                <input 
                    v-bind:value="searchTextProps"
                    v-on:input="searchTextProps = $event.target.value"
                    class="form-control" type="text" placeholder="Search" aria-label="Search">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["onSearchProps", "searchTextProps"],
    methods:{
        changeSearchFromChild(){
            this.$emit("change-search")
        },
    }
}
</script>
<style scoped>
</style>