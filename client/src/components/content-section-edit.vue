<template>
  <article-form :articleObj="articleObj" @parseImage="parseImage" @formSubmit="editArticle"></article-form>
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
      editArticle() {
        this.$emit('editArticle')
      },
      parseImage($event) {
        this.$emit('parseImage', $event)
      }
    }
  }
</script>

<style>

</style>
