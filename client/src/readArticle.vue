<template>
  <div class="col-9 m-3">
    <img v-bind:src="image">
    <hr>
    <h3>{{ article.title }}</h3>
    <div v-html="article.content"></div>
    <hr>
    <span>Author:<strong> {{ article.userId.name }}</strong></span><br>
    <span>Published:<strong> {{ article.createdAt }}</strong></span>
  </div>
</template>

<script>
export default {
  props: ['article'],
  data() {
    return {
      image: 'http://mini-wp.isnanirsyad.online/images/cat.png'
    }
  }
}
</script>

<style scoped>
span {
  font-size: 12px;
  font-style: italic
}
</style>
