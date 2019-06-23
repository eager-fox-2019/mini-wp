<template>
  <section id="content-section-article">
    <div id="content-section-header">
      <div class="content-section-header-link">
        <p>Published</p>
      </div>
    </div>
    <div id="content-section-body">
      <div class="article-container" v-for="article in articles" :key="article._id">
        <div class="article-image-container" v-bind:style="{ backgroundImage: 'url(' + article.image + ')' }">
        </div>
        <a @click.prevent="displayArticle(article._id)" href="">
          <h3 class="article-title">{{article.title}}</h3>
        </a>
        <p class="article-author-text">Article by: {{article.author.firstName+' '+article.author.lastName}}</p>
        <p class="article-footer-text">{{new Date(article.createdAt).toString().substr(0, 15)}} - <i class="fas fa-star"></i></p>
        <button class="btn btn-warning" @click.prevent="showEditPage(article._id)">Edit</button>
        <button class="btn btn-danger" @click.prevent="deleteArticle(article._id)" >Delete</button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['articles'],
    data() {
      return {

      }
    },
    methods: {
      changePage(page) {
        this.$emit('changePage', page);
      },
      deleteArticle(id) {
        this.$emit('deleteArticle', id)
      },
      showEditPage(id) {
        this.$emit('showEditPage', id);
      },
      displayArticle(id) {
        this.$emit('displayArticle', id);
      }
    }
  }
</script>

<style>

</style>
