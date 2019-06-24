<template>
  <div>
    <div id="articleContainer" class="container" style="margin-top:20px; min-height: 400px">
      <div class="d-flex" style="flex-wrap: wrap; align-items: center">

          <div v-for="article in articles" :key="article._id" v-on:backToHome="goBack" class="col-6">
            <div class="grid">
              <ArticleCard v-bind:card="article" v-on:goToDetail="articleDetail"/>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue'

export default {
  components: {
    ArticleCard
  },
  props: ['articles'],
  data() {
    return {
    }
  },
  methods: {
    articleDetail(option, article) {
      console.log(option, article)
      this.$emit('toDetail', option, article)
    },

    goBack(option) {
      this.$emit('back', option)
    }
  },
}
</script>

<style>

</style>
