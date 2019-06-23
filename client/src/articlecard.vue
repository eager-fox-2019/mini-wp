<template>
  <div class="card">
    <div class="articleimage">
      <img :src="article.imageUrl">
    </div>
    <div class="cardcontent">
      <div style="font-size: 1.5rem;">{{article.title}}</div>
      <div>
        By: {{article.author.email}}<br>
        <span style="color: #ddd;">Tags: {{article.tags.join(', ')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['article']
}
</script>

