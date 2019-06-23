<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-img
          :src="(article.featured_image) ? article.featured_image : 
            'https://cdn.vuetifyjs.com/images/cards/desert.jpg'"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ article.title }}</h3>
            <small>By {{ article.user_id.full_name }}</small>
            <small>{{ article.createdAt }}</small>
          </div>
        </v-card-title>
        <v-card-text>
          <div v-html="article.content"></div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ['article']
}
</script>