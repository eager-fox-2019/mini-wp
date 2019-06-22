<template>
    <div class="header-wrapper d-flex align-items-center">
        <button id="toggleSidebarButton" class="btn btn-secondary" @click.prevent="toggleSidebar1">☰</button>
        <label>Meme Maker</label>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    methods:{
        toggleSidebar1(){
            this.$emit("sidebar-state") //nama event di parent
        }
    }
}
</script>

<style scoped>
.header-wrapper{
    width: 100%;
    height: 100%;
    padding: 1em;
    background-color: #595959;
}

button {
    height: 100%;
    border-radius: 5%;
    border: solid darkgray;
}

label{
    color: white;
    font-weight: bold;
    font-size: 2em;
    margin: 0 1em;
}

</style>