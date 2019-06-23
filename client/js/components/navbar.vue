<template>
    <header class="navbar">
        <ul>
            <li><img src=""></li>
            <li style="font-weight: bold; font-size: 20px">Hacktiv Blog</li>
        </ul>

        <ul>
            <li id="logout"><a href="#"><i v-if="isLogin" @click="signOut" class="fas fa-sign-out-alt"></i></a></li>
        </ul>
    </header>
</template>

<script>
export default {
    props:{},
    data(){
        return{

        }
    },
    methods:{
        signOut(){
            this.$emit('signOut')
        }
    }
}
</script>

<style scoped>
#logout:hover >a>i{
    color: #FECC16;
}

.navbar {
    padding: 0;
}
</style>


