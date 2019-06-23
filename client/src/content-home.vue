<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="article in parentArticles" :key="article._id">
        <v-card>
          <v-img :src="(article.featured_image) ? article.featured_image : 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'" 
            aspect-ratio="2.75"></v-img>
          <v-card-title primary-title>
            <h3 class="headline text-no-wrap text-truncate mb-0">{{ article.title }}</h3>
          </v-card-title>
          <v-card-text class="text-no-wrap text-truncate">
              {{ article.contentNonHtml }}
          </v-card-text>
          <v-card-text>
            <small> By: {{ article.user_id.full_name }} </small>
            <small> {{ moment(article.createdAt) }} </small>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="submitPage(['content-article-detail', article._id])">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  props: ['parentArticles'],
  methods: {
    submitPage(val) {
      this.$emit('change-page', val)
    },
    moment(val) {
      return moment(val).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
  }
}
</script>