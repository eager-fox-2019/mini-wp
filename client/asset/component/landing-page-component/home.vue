<template>
  <div class="container home" v-if="page == 'home'">
    <div class="row" style="height: 100%">
      <menubar :menu="menu" @rendAdd="rendAdd" @rendList="rendList"></menubar>

      <div class="col" id="content" style="height: 700px">
        <add-article :menu="menu" :article="article" @addArticle="addArticle" @changeImg="changeImg" @addTag="addTag" @removeTag="removeTag"></add-article>

        <edit-article :menu="menu" :article="article" @updateArticle="updateArticle" @changeImg="changeImg" @addTag="addTag" @removeTag="removeTag"></edit-article>

        <list-article :menu="menu" :articles="articles" @filterByTag="filterByTag" @filterByTitle="filterByTitle" @getDetail="getDetail" @getAll="getAll"></list-article>

        <detail-article :menu="menu" :article="article" :user="user" @rendEdit="rendEdit" @deleteConfirm="deleteConfirm"></detail-article>
      </div>
    </div>
  </div>
</template>

<script>
import menubar from '../home-page-component/menubar'
import addArticlePage from '../home-page-component/add-article-page'
import editArticlePage from '../home-page-component/edit-article-page'
import listArticlePage from '../home-page-component/list-article-page'
import detailArticlePage from '../home-page-component/detail-article-page'
export default {
  components: {
    'menubar': menubar,
    'add-article': addArticlePage,
    'edit-article': editArticlePage,
    'list-article': listArticlePage,
    'detail-article': detailArticlePage
  },
  props: {
    'page' : String,
    'menu' : String,
    'article' : Object,
    'articles' : Array,
    'user': Object
  },
  data() {
    return {
    };
  },
  methods: {
    addTag(tagInput) {
      this.$emit('addTag', tagInput)
    },
    removeTag(tag){
      this.$emit('removeTag', tag)
    },
    rendAdd () {
      this.$emit('rendAdd')
    },
    rendList () {
      this.$emit('rendList')
    },
    addArticle () {
      this.$emit('addArticle')
    },
    changeImg ($event) {
      this.$emit('changeImg', $event)
    },
    updateArticle () {
      this.$emit('updateArticle')
    },
    filterByTitle (value) {
      this.$emit('filterByTitle', value)
    },
    filterByTag(value) {
      this.$emit('filterByTag', value)
    },
    getAll () {
      this.$emit('getAll')
    },
    getDetail (id) {
      this.$emit('getDetail', id)
    },
    rendEdit () {
      this.$emit('rendEdit')
    },
    deleteConfirm () {
      this.$emit('deleteConfirm')
    }
  }
};
</script>

<style scoped>
  .container{
    max-width: 100%;
    margin: 15px 0;
    height: 700px;
  }
</style>
