<template>
  <div v-if="menu == 'add'">
    <div class="center d-flex justify-content-center">
      <h2>Article Form</h2>
    </div>

    <div class="center" style="width: 75%">
      <hr>
    </div>

    <article-form :article='article' @changeImg='changeImg' @addTag='addTag' @removeTag='removeTag' @formSubmit='addArticle'></article-form>
  </div>
</template>

<script>
import articleForm from '../button-&-form-component/article-form'
export default {
  components: {
    'article-form': articleForm
  },
  props: {
    'menu': String,
    'article': Object
  },
  data() {
    return {
      tagInput: ""
    };
  },
  methods: {
    addTag(tagInput) {
      this.$emit('addTag', tagInput)
    },
    removeTag(tag){
      this.$emit('removeTag', tag)
    },
    addArticle() {
      this.$emit('addArticle')
    },
    changeImg($event) {
      this.$emit('changeImg', $event)
    }
  }
};
</script>

<style scoped>
  .form-article {
    padding: 0 3px;
    width: 70%;
    height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .center {
    margin: 0px auto;
  }
  hr {
    border-width: 3px;
    border-color: rgb(73, 73, 73); 
  }
</style>
