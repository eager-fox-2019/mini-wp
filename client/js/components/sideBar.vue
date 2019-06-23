<template>
    <div class="mySidebar col-md-2">
        <ul v-if="isLogin">
            <li><a href="#" @click="showAllPost">Home</a></li>
            <li><a href="#" @click="showCreatePost">Create an Post</a></li>
            <li><a href="#" @click="showYourPost">Your articles</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{},
    data(){
        return{

        }
    },
    methods:{
        showAllPost(){
            this.$emit(showAllPost)
        },
        showCreatePost(){
            this.$emit(showCreatePost)
        },
        showYourPost(){
            this.$emit(showYourPost)
        }
    }
}
</script>

<style scoped>

</style>


