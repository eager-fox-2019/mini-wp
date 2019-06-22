<template>
  <div class="sidebar d-flex flex-column" 
    v-bind:class="showSidebarProps ? 'sidebar-opened' : 'sidebar-closed' ">

    <span @click.prevent="pressLink">
        <input v-model="searchTitle" type="text" 
        placeholder="Search by Title" name="searchTitle">
    </span>
    <span @click.prevent="pressLink">
        <a href="#"><i class="fas fa-columns"></i>Make a Meme</a></span>
    <span @click.prevent="pressLink">
        <a href="#" data-toggle="collapse" data-target="#site-side">
        <i class="fas fa-pencil-alt"></i>MY ACCOUNT</a></span>
  </div>
</template>

<script>
  export default {
    props: ["showSidebarProps"],
    data(){
      return {
        searchTitle: ""
      }
    },
    methods:{
      pressLink(){

      }
    }
  }

</script>

<style>

.sidebar{
    color: black;
    background-color: rgb(56, 33, 33);
    transition: width 0.5s;
    overflow: hidden;
    height: 100%;
}

.sidebar span {
    padding: 1em;
}

.sidebar span:hover {
    background-color:#455a64;
    color: black;
}

.sidebar a{
    color: white;
}

.sidebar a:hover{
    text-decoration: none;
}

.sidebar-opened{
    width: 100%;
}
.sidebar-closed{
    width: 0;
    overflow: hidden;
}
</style>