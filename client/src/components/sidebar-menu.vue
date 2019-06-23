<template>
  <section id="menu-section">
    <div id="user-profile">
      <span id="user-icon"><i class="fas fa-user-circle"></i></span>
      <p id="user-name">{{lStorage.firstName + ' ' + lStorage.lastName}}</p>
    </div>
    <div class="menu-container">
      <a class="menu-list" @click.prevent="changePage('articleList')" href=""><span class="menu-icon"><i
            class="fas fa-list"></i></span> Blog Posts</a>
    </div>
    <div class="menu-container">
      <a class="menu-list" @click.prevent="changePage('addArticle')" href=""><span class="menu-icon"><i
            class="fas fa-folder-plus"></i></span> Add
        Article</a>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['lStorage', 'articleSearchTitle'],
    data() {
      return {
      }
    },
    methods: {
      changePage(page){
        this.$emit('changePage', page);
      }
    }
  }
</script>

<style>

</style>
