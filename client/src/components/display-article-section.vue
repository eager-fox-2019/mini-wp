<template>
  <section id="display-article-section">
    <div id="display-article-section-image-container" v-bind:style="{ backgroundImage: 'url(' + selectedArticle.image + ')' }"></div>
    <div id="display-article-section-title-container">
      <h2 id="display-article-section-title">{{selectedArticle.title}}</h2>
    </div>
    <div id="display-article-section-content">
      {{selectedArticle.content}}
    </div>
  </section>
</template>

<script>
  export default {
    props: ['selectedArticle'],
    data() {
      return {

      }
    }
  }
</script>

<style>

</style>
