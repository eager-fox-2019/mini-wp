<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-toolbar color="cyan" dark>
        <v-text-field v-model="searchArticle" label="Search Post Title"></v-text-field>
      </v-toolbar>
      <v-tabs v-model="articlesPage.activeTab" color="cyan" dark slider-color="yellow">
        <v-tab key="all-article" ripple>All Articles</v-tab>
        <v-tab key="published" ripple>Published</v-tab>
        <v-tab key="drafts" ripple>Drafts</v-tab>
        <v-tab-item key="all-article">
          <ArticlesTab :articles="filteredArticlesAuthorAll" @click-edit="submitPage"
            v-on:update-articles="updateArticles">
            </ArticlesTab>
        </v-tab-item>
        <v-tab-item key="published">
          <ArticlesTab :articles="filteredArticlesAuthorPublished" @click-edit="submitPage"
            v-on:update-articles="updateArticles">
            </ArticlesTab>
        </v-tab-item>
        <v-tab-item key="drafts">
          <ArticlesTab :articles="filteredArticlesAuthorDraft" @click-edit="submitPage"
            v-on:update-articles="updateArticles">
            </ArticlesTab>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios';
import ArticlesTab from './articles-tab.vue'
export default {
  props: ['parentArticles'],
  components: {
    ArticlesTab
  },
  data() {
    return {
      searchArticle: '',
      articlesPage: {
        activeTab: 'all-article',
      }
    }
  },
  computed: {
    filteredArticlesAuthorAll() {
      return this.parentArticles.filter(article => {
        let search = article.title.toLowerCase().includes(this.searchArticle.toLowerCase())
        let articlesAuthor = article.user_id._id == this.$root.currentLoginUser.id
        return search && articlesAuthor
      })
    },
    filteredArticlesAuthorPublished() {
      return this.parentArticles.filter(article => {
        let search = article.title.toLowerCase().includes(this.searchArticle.toLowerCase())
        let articlesAuthor = article.user_id._id == this.$root.currentLoginUser.id
        let articlesPublished = article.published == true
        return search && articlesAuthor && articlesPublished
      })
    },
    filteredArticlesAuthorDraft() {
      return this.parentArticles.filter(article => {
        let search = article.title.toLowerCase().includes(this.searchArticle.toLowerCase())
        let articlesAuthor = article.user_id._id == this.$root.currentLoginUser.id
        let articlesDraft = article.published == false
        return search && articlesAuthor && articlesDraft
      })
    },
  },
  methods: {
    submitPage(val) {
      this.$emit('change-page', val)
    },
    updateArticles() {
      console.log('masuk dashboard')
      this.$emit('update-articles')
    }
  }
}
</script>