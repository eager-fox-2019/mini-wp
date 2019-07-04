<template>
  <div class="row row-list border-bottom border-secondary p-1">
    <div class="col">
      <a v-on:click.prevent="readArticle(article._id)" href="#">{{ article.title }}</a>
    </div>
    <div class="col">
      <span>{{ article.userId.name }}</span>
    </div>
    <div class="col">
      <span>{{ article.createdAt }}</span>
    </div>
    <div class="col">
    <slot v-if="article.userId.email === emailUser"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['article'],
  data () {
    return {
      emailUser: localStorage.getItem('email')
    }
  }
}

</script>

