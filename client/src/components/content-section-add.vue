<template>
  <article-form :articleObj="articleObj" @parseImage="parseImage" @formSubmit="addArticle"></article-form>
</template>

<script>
  import articleForm from './article-form';
  export default {
    components: {
      'article-form': articleForm
    },
    props: ['articleObj'],
    data() {
      return {

      }
    },
    methods: {
      addArticle() {
        this.$emit('addArticle')
      },
      parseImage($event) {
        this.$emit('parseImage', $event)
      }
    }
  }
</script>

<style>

</style>
