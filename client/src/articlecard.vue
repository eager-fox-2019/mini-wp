<template>
  <div class="card">
    <div class="articleimage">
      <img :src="article.imageUrl">
    </div>
    <div class="cardcontent">
      <div style="font-size: 1.5rem;">{{article.title}}</div>
      <div style="font-size: 0.9rem;">
        <div style="display:flex; justify-content: space-between">
          <span>By: {{article.author.email}}</span>
          <span>Published on:
            <span class="datestring">{{dateString}}</span>
          </span>
        </div>
        <span style="color: #ddd;">Tags: {{article.tags.join(', ')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['article'],
  computed: {
    dateString() {
      return new Date(this.article.created_at).toDateString();
    }
  },
}
</script>